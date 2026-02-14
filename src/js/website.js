const ICON_URLS = {
  light: "/phosphor/sun.svg",
  dark: "/phosphor/moon.svg",
  system: "/phosphor/monitor.svg",
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
  container.innerHTML = '<div class="w-4 h-4"></div><div class="w-4 h-4"></div><div class="w-4 h-4"></div>';
  return container;
}

async function updateIconContainer(container, currentTheme, nextTheme) {
  const [currentSvg, arrowSvg, nextSvg] = await Promise.all([
    fetchSvg(ICON_URLS[currentTheme]),
    fetchSvg(ICON_URLS.arrow),
    fetchSvg(ICON_URLS[nextTheme]),
  ]);

  const slots = container.querySelectorAll("div");
  slots[0].innerHTML = currentSvg;
  slots[0].querySelector("svg").setAttribute("width", "16");
  slots[0].querySelector("svg").setAttribute("height", "16");
  slots[0].title = currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1) + " Mode";

  slots[1].innerHTML = arrowSvg;
  slots[1].querySelector("svg").setAttribute("width", "16");
  slots[1].querySelector("svg").setAttribute("height", "16");

  slots[2].innerHTML = nextSvg;
  slots[2].querySelector("svg").setAttribute("width", "16");
  slots[2].querySelector("svg").setAttribute("height", "16");
  slots[2].title = nextTheme.charAt(0).toUpperCase() + nextTheme.slice(1) + " Mode";
}

function createThemeSwitcher() {
  let headerLinks = document.getElementById("header-links");
  if (!headerLinks) {
    console.log("Header links not found");
    return;
  }

  let a = document.createElement("a");
  let container = createIconContainer();

  // Determine current state and update icon
  function getCurrentTheme() {
    return localStorage.getItem("theme"); // 'light', 'dark', or null (system)
  }

  function getNextTheme(current) {
    if (current === "light") return "dark";
    if (current === "dark") return "system";
    return "light";
  }

  function updateSwitcherIcon() {
    const current = getCurrentTheme() || "system";
    const next = getNextTheme(current);
    updateIconContainer(container, current, next);
  }

  function setTheme(theme) {
    document.documentElement.classList.remove("dark", "light");
    if (theme === "dark" || theme === "light") {
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    } else {
      localStorage.removeItem("theme");
    }
    updateSwitcherIcon();
  }

  function cycleTheme() {
    const current = getCurrentTheme();

    if (current === "light") {
      // Light → Dark
      setTheme("dark");
    } else if (current === "dark") {
      // Dark → System
      setTheme("system");
    } else {
      // System → Light
      setTheme("light");
    }
  }

  // Initialize icon based on current state
  updateSwitcherIcon();

  a.href = "#";
  a.className =
    "bg-[var(--color-secondary)] text-[var(--background-color)] hover:bg-[var(--color)] py-2 px-4 transition-colors duration-200 flex items-center justify-center md:mb-0";

  a.addEventListener("click", function (e) {
    e.preventDefault();
    cycleTheme();
  });

  a.appendChild(container);
  headerLinks.append(a);

  // Listen for system theme changes
  let colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  colorSchemeQuery.addEventListener("change", function (e) {
    if (!getCurrentTheme()) {
      // In system mode, no need to update DOM class since CSS handles it
    }
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
      "absolute top-1 right-1 p-1 rounded text-(--color-secondary) hover:text-(--color) cursor-pointer transition-colors duration-200";
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
