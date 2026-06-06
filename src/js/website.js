const ICON_URLS = {
  light: "/phosphor/sun.svg",
  dark: "/phosphor/moon.svg",
  arrow: "/phosphor/arrow-right.svg",
};

// Cache for fetched SVGs
const iconCache = {};

async function fetchSvg(url) {
  if (iconCache[url]) {
    return iconCache[url];
  }

  const response = await fetch(url);
  const svgText = await response.text();
  iconCache[url] = svgText;
  return svgText;
}

function createIconContainer() {
  const container = document.createElement("div");
  container.className = "flex items-center gap-1";
  container.innerHTML =
    '<div class="w-4 h-4"></div><div class="w-4 h-4"></div><div class="w-4 h-4"></div>';
  return container;
}

// Show "current → next" so the direction of the toggle is explicit.
async function updateIconContainer(container, currentTheme, nextTheme) {
  const [currentSvg, arrowSvg, nextSvg] = await Promise.all([
    fetchSvg(ICON_URLS[currentTheme]),
    fetchSvg(ICON_URLS.arrow),
    fetchSvg(ICON_URLS[nextTheme]),
  ]);

  const slots = container.querySelectorAll("div");
  function put(slot, svg) {
    slot.innerHTML = svg;
    const icon = slot.querySelector("svg");
    if (icon) {
      icon.setAttribute("width", "16");
      icon.setAttribute("height", "16");
    }
  }
  put(slots[0], currentSvg);
  put(slots[1], arrowSvg);
  put(slots[2], nextSvg);
}

function createThemeSwitcher() {
  let headerLinks = document.getElementById("header-links");
  if (!headerLinks) {
    console.log("Header links not found");
    return;
  }

  let a = document.createElement("a");
  let container = createIconContainer();

  let darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // The effective theme: an explicit choice if the user has made one, otherwise
  // whatever the browser prefers (which the CSS applies by default).
  function getEffectiveTheme() {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return darkQuery.matches ? "dark" : "light";
  }

  function otherTheme(theme) {
    return theme === "dark" ? "light" : "dark";
  }

  function updateSwitcherIcon() {
    const current = getEffectiveTheme();
    const next = otherTheme(current);
    updateIconContainer(container, current, next);
    a.title = "Switch to " + next + " mode";
  }

  function setTheme(theme) {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
    updateSwitcherIcon();
  }

  updateSwitcherIcon();

  a.href = "#";
  a.className = "nav-link flex items-center justify-center text-center";

  a.addEventListener("click", function (e) {
    e.preventDefault();
    setTheme(otherTheme(getEffectiveTheme()));
  });

  a.appendChild(container);

  // The nav is a <ul>; wrap the switcher in an <li> to keep markup valid.
  let li = document.createElement("li");
  li.appendChild(a);
  headerLinks.append(li);

  // While the user hasn't chosen explicitly, follow the system: the CSS swaps
  // the colours, we just keep the icon in sync.
  darkQuery.addEventListener("change", function () {
    if (!localStorage.getItem("theme")) updateSwitcherIcon();
  });
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
