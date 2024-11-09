const candidates = [
  /*FONTS*/
];

document.addEventListener("DOMContentLoaded", () => {
  let styles = document.createElement("style");
  styles.textContent = candidates
    .map(
      (font) => `
@font-face {
  font-family: '${font}';
  src: url('/fonts/${font.replace(/ /g, "")}.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
`
    )
    .join("\n");
  document.head.appendChild(styles);

  let body = document.body;
  let fontPicker = document.createElement("select");
  candidates.forEach((font) => {
    let option = document.createElement("option");
    option.value = font;
    option.innerText = font;
    option.style.fontFamily = font;
    fontPicker.appendChild(option);
  });
  fontPicker.addEventListener("change", function () {
    body.style.fontFamily = fontPicker.value;
  });
  body.style.fontFamily = fontPicker.value;
  body.prepend(fontPicker);

  let isStrobing = false;

  const strobeButton = document.createElement("button");
  strobeButton.innerText = "Toggle Strobing";
  strobeButton.addEventListener("click", function () {
    isStrobing = !isStrobing;
    if (isStrobing) {
      startStrobing();
    } else {
      stopStrobing();
    }
  });
  body.prepend(strobeButton);
});

function startStrobing() {
  strobeInterval = setInterval(() => {
    let isLight = document.documentElement.classList.contains("light-theme");
    if (isLight) {
      document.documentElement.classList.remove("light-theme");
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
      document.documentElement.classList.add("light-theme");
    }
  }, 1000);
}

function stopStrobing() {
  clearInterval(strobeInterval);
}
