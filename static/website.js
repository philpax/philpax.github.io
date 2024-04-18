function createThemeSwitcher() {
  var themeSwitcher = document.getElementById("theme-switch");
  if (!themeSwitcher) {
    console.log("Theme switcher not found");
    return;
  }

  var label = document.createElement("label");
  {
    var input = document.createElement("input");
    input.type = "checkbox";

    input.addEventListener("change", function () {
      if (this.checked) {
        document.documentElement.classList.remove("dark-theme");
        document.documentElement.classList.add("light-theme");
      } else {
        document.documentElement.classList.remove("light-theme");
        document.documentElement.classList.add("dark-theme");
      }
    });

    label.appendChild(input);
  }

  themeSwitcher.appendChild(label);
}

document.addEventListener("DOMContentLoaded", function () {
  createThemeSwitcher();
});
