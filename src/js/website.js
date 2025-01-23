function getThemeCookie() {
  var themeCookie = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("theme="));
  if (themeCookie) {
    return themeCookie.split("=")[1].trim();
  }
  return null;
}

// Set initial theme from cookie immediately
(function () {
  var savedTheme = getThemeCookie();
  if (savedTheme) {
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark-theme");
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
      document.documentElement.classList.add("dark-theme");
    }
  }
})();

function createThemeSwitcher() {
  var headerLinks = document.getElementById("header-links");
  if (!headerLinks) {
    console.log("Header links not found");
    return;
  }
  var li = document.createElement("li");
  var a = document.createElement("a");
  var img = document.createElement("img");
  updateSwitcherIcon(img, isLightMode());
  a.href = "#";

  a.addEventListener("click", function (e) {
    e.preventDefault();
    var isLight = isLightMode();
    if (isLight) {
      document.documentElement.classList.remove("light-theme");
      document.documentElement.classList.add("dark-theme");
      document.cookie = "theme=dark;path=/;max-age=31536000";
    } else {
      document.documentElement.classList.remove("dark-theme");
      document.documentElement.classList.add("light-theme");
      document.cookie = "theme=light;path=/;max-age=31536000";
    }
    updateSwitcherIcon(img, !isLight);
  });

  a.appendChild(img);
  li.appendChild(a);
  headerLinks.append(li);

  // Add media query listener
  var colorSchemeQuery = window.matchMedia("(prefers-color-scheme: light)");
  colorSchemeQuery.addEventListener("change", function (e) {
    // Only update if no theme cookie is set
    if (!getThemeCookie()) {
      updateSwitcherIcon(img, e.matches);
    }
  });

  function isLightMode() {
    var themeCookie = getThemeCookie();
    if (themeCookie) {
      return themeCookie === "light";
    }
    return (
      window.matchMedia("(prefers-color-scheme: light)").matches ||
      document.documentElement.classList.contains("light-theme")
    );
  }

  function updateSwitcherIcon(img, isLightMode) {
    img.src = isLightMode ? "LIGHT_MODE_ICON" : "DARK_MODE_ICON";
    img.alt = isLightMode ? "Light Mode" : "Dark Mode";
  }
}

function initScrollSpy() {
  const tocSticky = document.getElementById("toc-sticky");
  if (!tocSticky) return;

  // Include both headings and bare anchors
  const elements = document.querySelectorAll(
    ".post-body :is(h3[id], h4[id], h5[id], h6[id]), .post-body a[id]"
  );
  const tocLinks = tocSticky.querySelectorAll("a");

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
    tocLinks.forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to corresponding link
    if (currentElement) {
      const correspondingLink = tocSticky.querySelector(
        `a[href="#${currentElement.id}"]`
      );
      if (correspondingLink) {
        correspondingLink.classList.add("active");
      }
    } else {
      tocLinks[0].classList.add("active");
    }
  }

  // Update on scroll
  window.addEventListener("scroll", updateActiveLink);

  // Initial update
  updateActiveLink();
}

document.addEventListener("DOMContentLoaded", function () {
  createThemeSwitcher();
  initScrollSpy();
});
