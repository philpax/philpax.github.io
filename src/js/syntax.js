document.addEventListener("DOMContentLoaded", function () {
  const selector = document.getElementById("syntax-theme-selector");
  if (!selector) {
    return;
  }

  selector.style.visibility = "visible";
  selector.addEventListener("change", function () {
    const syntaxTheme = document.getElementById("syntax-theme");
    syntaxTheme.href = `/syntax/${selector.value}.css`;
  });
});
