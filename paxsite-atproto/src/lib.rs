//! AT Protocol publishing for standard.site records, built on `jacquard`.
//!
//! Uses a **localhost public OAuth client** (no private key, no hosted client
//! metadata) scoped to just the standard.site collections, so a compromised
//! machine can only touch `site.standard.*` records — nothing else on the
//! account. The rotating session is cached locally by jacquard's `FileAuthStore`
//! (plus a small sidecar recording the DID + session id so we can restore the
//! session on the next run without re-prompting), which keeps the repo itself
//! stateless: pull anywhere, run publish, log in once via the browser.

mod records;

pub use records::{DocumentRecord, PublicationRecord};

use std::{
    path::{Path, PathBuf},
    str::FromStr,
};

use anyhow::{Context, Result};

use jacquard::{
    api::com_atproto::repo::{
        create_record::CreateRecord, get_record::GetRecord, put_record::PutRecord,
    },
    client::{Agent, FileAuthStore},
    common::{
        bos::DefaultStr as Str,
        types::{
            did::Did,
            ident::AtIdentifier,
            nsid::Nsid,
            recordkey::{RecordKey, Rkey},
            value::{Data, to_data},
        },
    },
    oauth::{
        atproto::AtprotoClientMetadata, client::OAuthClient, loopback::LoopbackConfig,
        scopes::Scopes, session::ClientData, types::AuthorizeOptions,
    },
    prelude::XrpcClient,
};
use paxsite_content::standard_site::{DOCUMENT_NSID, PUBLICATION_NSID, PUBLICATION_RKEY};

/// An authenticated publishing session. Object-safe (no generic methods) so the
/// concrete jacquard agent type stays contained in this crate.
pub trait Publisher {
    /// The DID of the logged-in account.
    fn did(&self) -> &str;
    /// Fetches the current publication record, or `None` if it doesn't exist yet
    /// (or can't be read). Used to show a before/after when updating it.
    fn get_publication(&self) -> Result<Option<PublicationRecord>>;
    /// Creates or updates the publication singleton record, returning its AT-URI.
    fn upsert_publication(&self, rec: &PublicationRecord) -> Result<String>;
    /// Creates a document record (when `existing_uri` is `None`) or updates the
    /// one at `existing_uri`, returning its AT-URI.
    fn upsert_document(&self, existing_uri: Option<&str>, rec: &DocumentRecord) -> Result<String>;
}

/// Logs in (restoring a cached session if one is still valid, otherwise running
/// the loopback browser flow) and returns a ready-to-use [`Publisher`].
///
/// `handle` may be a handle, DID, or PDS URL — it is only consulted when a fresh
/// login is required. `store_path` is the session cache file.
pub fn login(store_path: &Path, handle: &str) -> Result<Box<dyn Publisher>> {
    let rt = tokio::runtime::Runtime::new().context("failed to start async runtime")?;

    let (agent, did) = rt.block_on(async {
        let store = FileAuthStore::new(store_path);
        // `atproto` (required) plus write access limited to the two standard.site
        // collections — the entire blast radius of the grant.
        let scope = format!("atproto repo:{PUBLICATION_NSID} repo:{DOCUMENT_NSID}");
        let scopes =
            Scopes::<Str>::new(Str::from(scope.as_str())).context("invalid scope string")?;
        let config = AtprotoClientMetadata::new_localhost(None, Some(scopes));
        let oauth = OAuthClient::new(
            store,
            ClientData {
                keyset: None,
                config,
            },
        );

        // Restore a cached session if the sidecar points at one that's still
        // valid; otherwise run the interactive loopback login and cache it.
        let session = 'session: {
            if let Ok(text) = std::fs::read_to_string(sidecar_path(store_path))
                && let Ok(sidecar) = serde_json::from_str::<Sidecar>(&text)
                && let Ok(did) = Did::<Str>::new(Str::from(sidecar.did.as_str()))
                && let Ok(session) = oauth.restore(&did, &sidecar.session_id).await
            {
                break 'session session;
            }
            let session = oauth
                .login_with_local_server(
                    handle,
                    AuthorizeOptions::default(),
                    LoopbackConfig::default(),
                )
                .await
                .map_err(anyerr)
                .context("OAuth login failed")?;
            let (did, session_id) = session.session_info().await;
            write_sidecar(store_path, did.as_str(), &session_id)?;
            session
        };

        let (did, _) = session.session_info().await;
        anyhow::Ok((Agent::from(session), did.as_str().to_string()))
    })?;

    Ok(Box::new(AgentPublisher { rt, agent, did }))
}

// ── Implementation ────────────────────────────────────────────────────────────

struct AgentPublisher<A> {
    rt: tokio::runtime::Runtime,
    agent: A,
    did: String,
}

impl<A: XrpcClient + Sync> Publisher for AgentPublisher<A> {
    fn did(&self) -> &str {
        &self.did
    }

    fn get_publication(&self) -> Result<Option<PublicationRecord>> {
        let repo =
            AtIdentifier::from(Did::<Str>::new(Str::from(self.did.as_str())).map_err(anyerr)?);
        let collection = Nsid::<Str>::new(Str::from(PUBLICATION_NSID)).map_err(anyerr)?;
        let rkey = RecordKey::<Rkey>::from_str(PUBLICATION_RKEY).map_err(anyerr)?;

        self.rt.block_on(async {
            let req = GetRecord::new()
                .collection(collection)
                .repo(repo)
                .rkey(rkey)
                .build();
            // A missing record (or any read error) is reported as "no snapshot".
            let Ok(resp) = self.agent.send(req).await else {
                return anyhow::Ok(None);
            };
            let value = resp.into_output().map_err(anyerr)?.value;
            anyhow::Ok(Some(PublicationRecord {
                url: field(&value, "url").unwrap_or_default().to_string(),
                name: field(&value, "name").unwrap_or_default().to_string(),
                description: field(&value, "description").map(str::to_string),
            }))
        })
    }

    fn upsert_publication(&self, rec: &PublicationRecord) -> Result<String> {
        let data = to_data(&rec.wire()).map_err(anyerr)?;
        // The publication is a singleton at a fixed rkey, so always a putRecord.
        self.upsert(PUBLICATION_NSID, Some(PUBLICATION_RKEY), data)
    }

    fn upsert_document(&self, existing_uri: Option<&str>, rec: &DocumentRecord) -> Result<String> {
        let data = to_data(&rec.wire()).map_err(anyerr)?;
        let rkey = existing_uri.map(rkey_of).transpose()?;
        self.upsert(DOCUMENT_NSID, rkey, data)
    }
}

impl<A: XrpcClient + Sync> AgentPublisher<A> {
    /// Upserts a record: `Some(rkey)` does a `putRecord` (create-or-update at that
    /// key), `None` does a `createRecord` with a server-assigned key.
    fn upsert(
        &self,
        nsid: &str,
        rkey: Option<&str>,
        data: jacquard::common::types::value::Data<Str>,
    ) -> Result<String> {
        let repo =
            AtIdentifier::from(Did::<Str>::new(Str::from(self.did.as_str())).map_err(anyerr)?);
        let collection = Nsid::<Str>::new(Str::from(nsid)).map_err(anyerr)?;

        self.rt.block_on(async {
            let uri = match rkey {
                Some(rkey) => {
                    let rkey = RecordKey::<Rkey>::from_str(rkey)
                        .map_err(anyerr)
                        .context("invalid rkey")?;
                    let req = PutRecord::new()
                        .collection(collection)
                        .repo(repo)
                        .rkey(rkey)
                        .record(data)
                        .build();
                    let out = self
                        .agent
                        .send(req)
                        .await
                        .map_err(anyerr)?
                        .into_output()
                        .map_err(anyerr)?;
                    out.uri.as_str().to_string()
                }
                None => {
                    let req = CreateRecord::new()
                        .collection(collection)
                        .repo(repo)
                        .record(data)
                        .build();
                    let out = self
                        .agent
                        .send(req)
                        .await
                        .map_err(anyerr)?
                        .into_output()
                        .map_err(anyerr)?;
                    out.uri.as_str().to_string()
                }
            };
            anyhow::Ok(uri)
        })
    }
}

// ── Session restore sidecar ─────────────────────────────────────────────────

#[derive(serde::Serialize, serde::Deserialize)]
struct Sidecar {
    did: String,
    session_id: String,
}

fn sidecar_path(store_path: &Path) -> PathBuf {
    let mut p = store_path.as_os_str().to_os_string();
    p.push(".ref");
    PathBuf::from(p)
}

fn write_sidecar(store_path: &Path, did: &str, session_id: &str) -> Result<()> {
    let sidecar = Sidecar {
        did: did.to_string(),
        session_id: session_id.to_string(),
    };
    std::fs::write(sidecar_path(store_path), serde_json::to_string(&sidecar)?)?;
    Ok(())
}

/// Reads a string field from a record's object data, if present.
fn field<'a>(value: &'a Data<Str>, key: &str) -> Option<&'a str> {
    value
        .as_object()
        .and_then(|o| o.get(key))
        .and_then(|d| d.as_str())
}

/// Extracts the rkey (final path segment) from an `at://did/collection/rkey` URI.
fn rkey_of(at_uri: &str) -> Result<&str> {
    at_uri
        .rsplit('/')
        .next()
        .filter(|s| !s.is_empty())
        .with_context(|| format!("malformed AT-URI: {at_uri}"))
}

/// Convert any displayable error into an `anyhow::Error`. jacquard's error types
/// don't uniformly implement `std::error::Error + Send + Sync + 'static`, so we
/// stringify at the boundary.
fn anyerr<E: std::fmt::Display>(e: E) -> anyhow::Error {
    anyhow::anyhow!("{e}")
}
