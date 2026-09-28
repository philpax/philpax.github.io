// The theme switch: the nav's last item, showing the theme in force, an arrow,
// and the theme it switches to. It only works with script, so script makes it.
// A chosen theme is pinned as a class on <html> (which the head script restores
// on the next page) and remembered; until then the system's scheme applies.
function createThemeSwitcher() {
  const list = document.querySelector(".site > header nav ul");
  if (!list) return;

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function effectiveTheme() {
    const root = document.documentElement.classList;
    if (root.contains("dark")) return "dark";
    if (root.contains("light")) return "light";
    return darkQuery.matches ? "dark" : "light";
  }

  function otherTheme(theme) {
    return theme === "dark" ? "light" : "dark";
  }

  function mark(icon) {
    const span = document.createElement("span");
    span.dataset.icon = icon;
    span.setAttribute("aria-hidden", "true");
    return span;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-toggle";

  function render() {
    const current = effectiveTheme();
    const next = otherTheme(current);
    const label = "Switch to the " + next + " theme";
    button.setAttribute("aria-label", label);
    button.title = label;
    button.replaceChildren(mark(current), mark("arrow"), mark(next));
  }

  button.addEventListener("click", function () {
    const next = otherTheme(effectiveTheme());
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(next);
    localStorage.setItem("theme", next);
    render();
  });

  // While the reader hasn't chosen, follow the system.
  darkQuery.addEventListener("change", render);

  render();
  const li = document.createElement("li");
  li.appendChild(button);
  list.appendChild(li);
}

function initScrollSpy() {
  const tocSticky = document.getElementById("toc-sticky");
  const tocInline = document.getElementById("toc-inline");
  if (!tocSticky && !tocInline) return;

  // Include both headings and bare anchors
  const elements = document.querySelectorAll(
    ".post-body :is(h3[id], h4[id], h5[id], h6[id]), .post-body a[id]"
  );
  const tocStickyLinks = tocSticky ? tocSticky.querySelectorAll("a") : [];
  const tocInlineLinks = tocInline ? tocInline.querySelectorAll("a") : [];

  function updateActiveLink() {
    // Get current scroll position, accounting for some offset
    const scrollPos = window.scrollY + 100;

    // Find the element that's currently in view
    let currentElement = null;
    elements.forEach((element) => {
      if (element.offsetTop <= scrollPos) {
        currentElement = element;
      }
    });

    // Remove active class from all links
    tocStickyLinks.forEach((link) => {
      link.classList.remove("active");
    });
    tocInlineLinks.forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to corresponding links
    if (currentElement) {
      if (tocSticky) {
        const stickyLink = tocSticky.querySelector(
          `a[href="#${currentElement.id}"]`
        );
        if (stickyLink) {
          stickyLink.classList.add("active");
        }
      }
      if (tocInline) {
        const inlineLink = tocInline.querySelector(
          `a[href="#${currentElement.id}"]`
        );
        if (inlineLink) {
          inlineLink.classList.add("active");
        }
      }
    } else {
      if (tocStickyLinks.length) tocStickyLinks[0].classList.add("active");
      if (tocInlineLinks.length) tocInlineLinks[0].classList.add("active");
    }
  }

  // Update on scroll
  window.addEventListener("scroll", updateActiveLink);

  // Initial update
  updateActiveLink();
}

function initCodeCopyButtons() {
  const COPY_ICON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"/></svg>';
  const CHECK_ICON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/></svg>';

  document.querySelectorAll(".code-block").forEach(function (block) {
    var btn = document.createElement("button");
    btn.className =
      "absolute top-1 right-1 p-1 rounded text-dim hover:text-fg cursor-pointer transition-colors duration-200";
    btn.title = "Copy code";
    btn.innerHTML = COPY_ICON;

    btn.addEventListener("click", function () {
      var code = block.querySelector("code");
      if (!code) return;

      // Get text content, skipping the language label (first <pre> child)
      var text = "";
      code.childNodes.forEach(function (node) {
        if (node.nodeName === "PRE") return;
        text += node.textContent;
      });

      navigator.clipboard.writeText(text.trim()).then(function () {
        btn.innerHTML = CHECK_ICON;
        setTimeout(function () {
          btn.innerHTML = COPY_ICON;
        }, 2000);
      });
    });

    block.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  createThemeSwitcher();
  initScrollSpy();
  initCodeCopyButtons();
});
