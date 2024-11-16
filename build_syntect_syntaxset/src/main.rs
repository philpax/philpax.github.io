use syntect::parsing::{SyntaxDefinition, SyntaxSet};

fn main() {
    let mut builder = SyntaxSet::load_defaults_newlines().into_builder();
    builder.add(
        SyntaxDefinition::load_from_str(include_str!("Pug.sublime-syntax"), true, None).unwrap(),
    );
    let set = builder.build();
    syntect::dumps::dump_to_file(&set, "src/syntax/syntax_set.packdump").unwrap();
}
