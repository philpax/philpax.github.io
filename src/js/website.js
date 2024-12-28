function createThemeSwitcher() {
  var headerLinks = document.getElementById("header-links");
  if (!headerLinks) {
    console.log("Header links not found");
    return;
  }
  var li = document.createElement("li");
  var img = document.createElement("img");
  updateSwitcherIcon(img, isLightMode());
  img.style.cursor = "pointer";

  img.addEventListener("click", function () {
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

  li.appendChild(img);
  headerLinks.append(li);

  function updateSwitcherIcon(img, isLightMode) {
    // Get the SVG content and update its fill color
    fetch(isLightMode ? "/phosphor/sun.svg" : "/phosphor/moon.svg")
      .then((response) => response.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const svgElement = svgDoc.querySelector("svg");
        const computedStyle = getComputedStyle(document.documentElement);
        svgElement.style.fill =
          computedStyle.getPropertyValue("--background-color");

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgDoc);
        const svgUrl = "data:image/svg+xml;base64," + btoa(svgString);
        img.src = svgUrl;
        img.alt = isLightMode ? "Light Mode" : "Dark Mode";
      });
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
