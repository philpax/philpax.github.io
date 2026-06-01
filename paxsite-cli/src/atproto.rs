//! AT Protocol publishing for standard.site records, built on `jacquard`.
//!
//! Uses a **localhost public OAuth client** (no private key, no hosted client
//! metadata) scoped to just the standard.site collections, so a compromised
//! machine can only touch `site.standard.*` records — nothing else on the
//! account. The rotating session is cached locally by jacquard's `FileAuthStore`
//! (plus a small sidecar recording the DID + session id so we can restore the
//! session on the next run without re-prompting), which keeps the repo itself
//! stateless: pull anywhere, run publish, log in once via the browser.

use std::{
    path::{Path, PathBuf},
    str::FromStr,
};

use anyhow::{Context, Result};

use jacquard::{
    api::com_atproto::repo::{get_record::GetRecord, put_record::PutRecord},
    client::{Agent, FileAuthStore},
    common::types::{
        did::Did,
        ident::AtIdentifier,
        nsid::Nsid,
        recordkey::{RecordKey, Rkey},
        tid::Tid,
        value::{Data, from_data, to_data},
    },
    oauth::{
        atproto::AtprotoClientMetadata,
        client::{OAuthClient, OAuthSession},
        loopback::LoopbackConfig,
        scopes::Scopes,
        session::ClientData,
        types::AuthorizeOptions,
    },
    prelude::{JacquardResolver, XrpcClient},
};
// The jacquard types the rest of the CLI needs to build records, surfaced through
// this module so record construction goes through a single import path.
pub use jacquard::{
    api::site_standard::{document::Document, publication::Publication},
    common::{
        bos::DefaultStr as Str,
        types::{datetime::Datetime, string::UriValue},
    },
};
use paxsite_content::standard_site::{DOCUMENT_NSID, PUBLICATION_NSID, PUBLICATION_RKEY};

// The OAuth client/session/agent types, specialised to our on-disk auth store,
// named explicitly so [`Publisher`] needn't be generic.
type Client = OAuthClient<JacquardResolver, FileAuthStore>;
type Session = OAuthSession<JacquardResolver, FileAuthStore>;
type SessionAgent = Agent<Session>;

/// An authenticated publishing session — an OAuth agent plus the logged-in DID.
pub struct Publisher {
    agent: SessionAgent,
    did: Did<Str>,
}

/// Logs in (restoring a cached session if one is still valid, otherwise running
/// the loopback browser flow) and returns a ready-to-use [`Publisher`].
///
/// `handle` may be a handle, DID, or PDS URL — it is only consulted when a fresh
/// login is required. `store_path` is the session cache file.
pub async fn login(store_path: &Path, handle: &str) -> Result<Publisher> {
    // `atproto` (required) plus write access limited to the two standard.site
    // collections — the entire blast radius of the grant.
    let oauth = OAuthClient::new(
        FileAuthStore::new(store_path),
        ClientData {
            keyset: None,
            config: AtprotoClientMetadata::new_localhost(
                None,
                Some(
                    Scopes::<Str>::new(Str::from(format!(
                        "atproto repo:{PUBLICATION_NSID} repo:{DOCUMENT_NSID}"
                    )))
                    .context("invalid scope string")?,
                ),
            ),
        },
    );
    let session = restore_or_login(&oauth, store_path, handle).await?;
    let (did, _) = session.session_info().await;
    Ok(Publisher {
        agent: Agent::from(session),
        did,
    })
}

/// Restores the cached session if the sidecar beside `store_path` still points at
/// a valid one; otherwise runs the interactive loopback login and caches the
/// result for next time. `handle` is only consulted for a fresh login.
async fn restore_or_login(oauth: &Client, store_path: &Path, handle: &str) -> Result<Session> {
    /// The DID + session id cached beside the auth store so a session can be
    /// restored without re-prompting.
    #[derive(serde::Serialize, serde::Deserialize)]
    struct Sidecar {
        did: String,
        session_id: String,
    }

    // The sidecar records the DID + session id next to the auth store, letting us
    // restore on the next run without re-prompting.
    let mut sidecar_path = store_path.as_os_str().to_os_string();
    sidecar_path.push(".ref");
    let sidecar_path = PathBuf::from(sidecar_path);

    async fn load_session(oauth: &Client, sidecar_path: &Path) -> Result<Session> {
        let sidecar: Sidecar = serde_json::from_str(&std::fs::read_to_string(sidecar_path)?)?;
        Ok(oauth
            .restore(&Did::new(sidecar.did.as_str())?, &sidecar.session_id)
            .await?)
    }

    // Any failure here — missing or corrupt sidecar, expired session — simply
    // falls through to a fresh login.
    if let Ok(session) = load_session(oauth, &sidecar_path).await {
        return Ok(session);
    }

    let session = oauth
        .login_with_local_server(
            handle,
            AuthorizeOptions::default(),
            LoopbackConfig::default(),
        )
        .await
        .context("OAuth login failed")?;
    let (did, session_id) = session.session_info().await;
    std::fs::write(
        &sidecar_path,
        serde_json::to_string(&Sidecar {
            did: did.as_str().to_string(),
            session_id: session_id.to_string(),
        })?,
    )?;
    Ok(session)
}

// ── Implementation ────────────────────────────────────────────────────────────

impl Publisher {
    /// Fetches the current publication record, or `None` if it doesn't exist yet
    /// (or can't be read). Used to show a before/after when updating it.
    pub async fn get_publication(&self) -> Result<Option<Publication<Str>>> {
        let req = GetRecord::new()
            .collection(Nsid::<Str>::new(Str::from(PUBLICATION_NSID))?)
            .repo(self.repo())
            .rkey(RecordKey::<Rkey>::from_str(PUBLICATION_RKEY)?)
            .build();
        // A missing record (or any read error) is reported as "no snapshot".
        Ok(if let Ok(resp) = self.agent.send(req).await {
            Some(from_data(&resp.into_output()?.value)?)
        } else {
            None
        })
    }

    /// Creates or updates the publication singleton record, returning its AT-URI.
    pub async fn upsert_publication(&self, record: &Publication<Str>) -> Result<String> {
        // The publication is a singleton at a fixed rkey.
        self.put_record(PUBLICATION_NSID, PUBLICATION_RKEY, to_data(record)?)
            .await
    }

    /// Creates a document record (when `existing_uri` is `None`) or updates the
    /// one at `existing_uri`, returning its AT-URI.
    pub async fn upsert_document(
        &self,
        existing_uri: Option<&str>,
        record: &Document<Str>,
    ) -> Result<String> {
        // putRecord upserts, so one path covers both: reuse the existing record's
        // key (the final segment of its AT-URI) on update, mint a fresh TID on
        // first publish.
        let rkey = match existing_uri {
            Some(uri) => uri
                .rsplit('/')
                .next()
                .filter(|s| !s.is_empty())
                .with_context(|| format!("malformed AT-URI: {uri}"))?
                .to_string(),
            None => Tid::now_0().as_str().to_string(),
        };
        self.put_record(DOCUMENT_NSID, &rkey, to_data(record)?)
            .await
    }

    /// Create-or-update the record at `nsid/rkey` via `putRecord` (which upserts),
    /// returning its AT-URI.
    async fn put_record(&self, nsid: &str, rkey: &str, data: Data<Str>) -> Result<String> {
        let req = PutRecord::new()
            .collection(Nsid::<Str>::new(Str::from(nsid))?)
            .repo(self.repo())
            .rkey(RecordKey::<Rkey>::from_str(rkey).context("invalid rkey")?)
            .record(data)
            .build();
        let out = self.agent.send(req).await?.into_output()?;
        Ok(out.uri.as_str().to_string())
    }

    /// The logged-in account as an XRPC `repo` identifier.
    fn repo(&self) -> AtIdentifier<Str> {
        AtIdentifier::from(self.did.clone())
    }
}
