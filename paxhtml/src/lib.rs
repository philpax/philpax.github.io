pub mod builder;
pub mod util;

mod attribute;
pub use attribute::{attr, Attribute};

mod document;
pub use document::Document;

mod element;
pub use element::{Element, IntoElement};

mod routing;
pub use routing::RoutePath;

#[cfg(feature = "macros")]
pub use paxhtml_macro::html;
