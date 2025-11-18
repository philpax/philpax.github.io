#[derive(Default)]
#[allow(dead_code)]
pub struct FootnoteProps {
    pub identifier: String,
    pub children: Vec<paxhtml::Element>,
    #[allow(dead_code)]
    pub class: Option<String>,
}

#[allow(non_snake_case, dead_code)]
pub fn Footnote(props: FootnoteProps) -> paxhtml::Element {
    let id = format!("footnote-{}", props.identifier);
    let children = paxhtml::Element::from(props.children);

    paxhtml::html! {
        <span class="footnote m-0">
            <input r#type="checkbox" id={id.clone()} class="peer hidden" autocomplete="off" />
            <label r#for={id.clone()} class="inline-block cursor-pointer select-none">
                <sup class="\
                    footnote-number px-2 ml-1 bg-[var(--color)] text-[var(--background-color)] text-xs \
                    hover:bg-[var(--color-secondary)] relative \
                    before:content-['fn'] before:italic before:text-[0.6em] before:mr-[0.3em] before:text-[var(--background-color-secondary)]\
                ">
                    {&props.identifier}
                </sup>
            </label>
            <span class="hidden peer-checked:block bg-[var(--color)] text-[var(--background-color)] p-2 my-1">{children}</span>
        </span>
    }
}
