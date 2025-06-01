use paxhtml::builder as b;

pub fn footnote(identifier: &str, children: paxhtml::Element) -> paxhtml::Element {
    let id = format!("footnote-{identifier}");

    paxhtml::html! {
        <>
            <input r#type="checkbox" id={id.clone()} class="footnote-checkbox" autocomplete="off" />
            <label r#for={id.clone()}>
                <sup class="footnote-number">{identifier}</sup>
            </label>
            <span>{children}</span>
        </>
    }
}
