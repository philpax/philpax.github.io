//! [standard.site](https://standard.site/) protocol constants.
//!
//! Site identity lives in [`crate::Config`]; there is no on-disk standard.site
//! config. The publication is a singleton at a fixed rkey, so its AT-URI is
//! derived from the (hardcoded) DID alone — nothing needs to be persisted.

/// Collection NSID for the publication record.
pub const PUBLICATION_NSID: &str = "site.standard.publication";
/// Collection NSID for document records.
pub const DOCUMENT_NSID: &str = "site.standard.document";
/// Fixed rkey for the publication singleton.
pub const PUBLICATION_RKEY: &str = "self";

/// Deterministic AT-URI of the publication record for the given DID.
pub fn publication_uri(did: &str) -> String {
    format!("at://{did}/{PUBLICATION_NSID}/{PUBLICATION_RKEY}")
}
