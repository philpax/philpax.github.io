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

document.addEventListener("DOMContentLoaded", function () {
  createThemeSwitcher();
});
