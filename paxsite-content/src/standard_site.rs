//! [standard.site](https://standard.site/) protocol constants.
//!
//! Site identity lives in [`crate::Config`]; there is no on-disk standard.site
//! config. The publication is a singleton at a fixed rkey, so its AT-URI is
//! derived from the (hardcoded) DID alone — nothing needs to be persisted.

/// Collection NSID for the publication record.
pub const PUBLICATION_NSID: &str = "site.standard.publication";
/// Collection NSID for document records.
pub const DOCUMENT_NSID: &str = "site.standard.document";
/// Fixed rkey for the publication singleton, in TID form.
///
/// The published `site.standard.publication` lexicon declares `"key": "tid"`, and
/// a PDS validates record keys against that schema on write: any other key is
/// rejected with `Invalid record key for site.standard.publication: Invalid TID
/// string format`. The key is a TID derived from the time the record was first
/// created, and it lives here rather than being minted at publish time so the
/// publication's AT-URI stays derivable from the DID alone. `paxsite-cli`'s tests
/// check that it parses as a [`Tid`](https://atproto.com/specs/tid) — note that a
/// TID is base32-sortable (no `0`, `1`, `8` or `9`), so a plausible-looking string
/// is not enough.
pub const PUBLICATION_RKEY: &str = "3myqz2xqtxv22";

/// Deterministic AT-URI of the publication record for the given DID.
pub fn publication_uri(did: &str) -> String {
    format!("at://{did}/{PUBLICATION_NSID}/{PUBLICATION_RKEY}")
}
