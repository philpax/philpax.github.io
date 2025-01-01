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
    } else {
      document.documentElement.classList.remove("dark-theme");
      document.documentElement.classList.add("light-theme");
    }
    updateSwitcherIcon(img, !isLight);
  });

  a.appendChild(img);
  li.appendChild(a);
  headerLinks.append(li);

  function updateSwitcherIcon(img, isLightMode) {
    img.src = isLightMode ? "LIGHT_MODE_ICON" : "DARK_MODE_ICON";
    img.alt = isLightMode ? "Light Mode" : "Dark Mode";
  }

  function isLightMode() {
    return (
      window.matchMedia("(prefers-color-scheme: light)").matches ||
      document.documentElement.classList.contains("light-theme")
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  createThemeSwitcher();
});
