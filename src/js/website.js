function createThemeSwitcher() {
  var headerLinks = document.getElementById("header-links");
  if (!headerLinks) {
    console.log("Header links not found");
    return;
  }

  var li = document.createElement("li");
  {
    var a = document.createElement("a");
    updateSwitcherInnerText(a, isLightMode());
    a.href = "#";

    a.addEventListener("click", function () {
      var isLight = isLightMode();
      if (isLight) {
        document.documentElement.classList.remove("light-theme");
        document.documentElement.classList.add("dark-theme");
      } else {
        document.documentElement.classList.remove("dark-theme");
        document.documentElement.classList.add("light-theme");
      }
      updateSwitcherInnerText(a, !isLight);
    });

    li.appendChild(a);
  }

  headerLinks.append(li);

  function updateSwitcherInnerText(a, isLightMode) {
    a.innerText = isLightMode ? "Light Mode" : "Dark Mode";
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
