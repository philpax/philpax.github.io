use std::{
    collections::{HashMap, HashSet},
    path::Path,
};

use anyhow::Context;
use serde::Deserialize;

use crate::{Document, DocumentMetadata, Tag};

/// Tag descriptions and old names from `content/tags.toml`.
#[derive(Debug, Default, Deserialize)]
pub struct TagConfig {
    #[serde(default)]
    pub aliases: HashMap<Tag, Tag>,
    #[serde(flatten)]
    pub descriptions: HashMap<Tag, String>,
}

impl TagConfig {
    pub fn read(path: &Path) -> anyhow::Result<Self> {
        let source = std::fs::read_to_string(path)
            .with_context(|| format!("failed to read {}", path.display()))?;
        Self::parse(&source).with_context(|| format!("invalid {}", path.display()))
    }

    /// Resolves alias chains to described tags and rejects ambiguous routes.
    pub fn parse(source: &str) -> anyhow::Result<Self> {
        let mut config: Self = toml::from_str(source)?;
        for tag in config.descriptions.keys().chain(config.aliases.keys()) {
            validate_tag_name(tag)?;
        }
        let mut aliases = HashMap::new();
        for alias in config.aliases.keys() {
            anyhow::ensure!(
                !config.descriptions.contains_key(alias),
                "tag alias {alias:?} also has a description"
            );
            let mut target = alias;
            let mut visited = HashSet::new();
            while let Some(next) = config.aliases.get(target) {
                anyhow::ensure!(visited.insert(target), "tag alias cycle at {target:?}");
                target = next;
            }
            anyhow::ensure!(
                config.descriptions.contains_key(target),
                "tag alias {alias:?} targets undescribed tag {target:?}"
            );
            aliases.insert(alias.clone(), target.clone());
        }
        config.aliases = aliases;
        Ok(config)
    }

    /// Uses canonical names in document metadata and removes duplicate tags.
    pub fn canonicalize_document(&self, document: &mut Document) {
        self.canonicalize_metadata(&mut document.metadata);
    }

    pub fn canonicalize_metadata(&self, metadata: &mut DocumentMetadata) {
        if let Some(taxonomies) = &mut metadata.taxonomies {
            let mut seen = HashSet::new();
            taxonomies.tags = taxonomies
                .tags
                .iter()
                .map(|tag| self.aliases.get(tag).unwrap_or(tag).clone())
                .filter(|tag| seen.insert(tag.clone()))
                .collect();
        }
    }
}

fn validate_tag_name(tag: &str) -> anyhow::Result<()> {
    anyhow::ensure!(
        !tag.is_empty()
            && tag
                .bytes()
                .all(|byte| byte.is_ascii_lowercase() || byte.is_ascii_digit() || byte == b'-')
            && tag != "index",
        "tag {tag:?} must use lowercase ASCII letters, digits or hyphens, and cannot be index"
    );
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{DocumentTaxonomies, DocumentType};

    #[test]
    fn flat_descriptions_remain_supported() {
        let config = TagConfig::parse("ai = \"Models\"\nxr = \"Headsets\"\n").unwrap();
        assert_eq!(config.descriptions["ai"], "Models");
        assert_eq!(config.descriptions["xr"], "Headsets");
        assert!(config.aliases.is_empty());
    }

    #[test]
    fn alias_chains_resolve_directly_to_canonical_tags() {
        let config = TagConfig::parse(
            "jc3vr = \"VR mod\"\n[aliases]\njc3vrs = \"jc3vr\"\nolder = \"jc3vrs\"\n",
        )
        .unwrap();
        assert_eq!(config.aliases["jc3vrs"], "jc3vr");
        assert_eq!(config.aliases["older"], "jc3vr");
        assert!(!config.descriptions.contains_key("jc3vrs"));
    }

    #[test]
    fn invalid_aliases_and_routes_are_rejected() {
        for source in [
            "new = \"Description\"\nold = \"Conflict\"\n[aliases]\nold = \"new\"\n",
            "[aliases]\nold = \"missing\"\n",
            "[aliases]\na = \"b\"\nb = \"a\"\n",
            "[aliases]\na = \"a\"\n",
            "new = \"Description\"\n[aliases]\n\"../old\" = \"new\"\n",
            "new = \"Description\"\n[aliases]\nOLD = \"new\"\n",
            "new = \"Description\"\n[aliases]\nindex = \"new\"\n",
            "\"\" = \"Description\"\n",
            "\"bad/name\" = \"Description\"\n",
        ] {
            assert!(TagConfig::parse(source).is_err(), "{source}");
        }
    }

    #[test]
    fn aliases_merge_and_deduplicate_document_tags_in_all_sections() {
        let config = TagConfig::parse(
            "jc3vr = \"VR mod\"\nother = \"Other\"\n[aliases]\njc3vrs = \"jc3vr\"\n",
        )
        .unwrap();
        for kind in [DocumentType::Blog, DocumentType::Update, DocumentType::Note] {
            let mut document = Document::empty();
            document.document_type = kind;
            document.metadata.taxonomies = Some(DocumentTaxonomies {
                tags: vec![
                    "jc3vrs".into(),
                    "other".into(),
                    "jc3vr".into(),
                    "jc3vrs".into(),
                ],
            });
            config.canonicalize_document(&mut document);
            assert_eq!(document.tags().unwrap(), &["jc3vr", "other"]);
        }
        let mut document = Document::empty();
        config.canonicalize_document(&mut document);
        assert!(document.tags().is_none());
    }

    #[test]
    fn raw_metadata_edits_preserve_alias_selections_and_publication_fingerprints() {
        let config =
            TagConfig::parse("jc3vr = \"VR mod\"\n[aliases]\njc3vrs = \"jc3vr\"\n").unwrap();
        let mut document = Document::empty();
        document.metadata.taxonomies = Some(DocumentTaxonomies {
            tags: vec!["jc3vrs".into(), "jc3vr".into()],
        });
        config.canonicalize_metadata(&mut document.metadata);
        assert_eq!(document.tags().unwrap(), &["jc3vr"]);
        let fingerprint = document.standard_site_fingerprint();
        config.canonicalize_document(&mut document);
        assert_eq!(document.standard_site_fingerprint(), fingerprint);
    }
}
