document.addEventListener("DOMContentLoaded", function () {
  const selector = document.getElementById("syntax-theme-selector");
  if (!selector) {
    return;
  }

  // Load theme from cookie if exists
  const savedTheme = document.cookie
    .split("; ")
    .find((row) => row.startsWith("syntax-theme="));
  if (savedTheme) {
    const theme = savedTheme.split("=")[1];
    selector.value = theme;
    const syntaxTheme = document.getElementById("syntax-theme");
    syntaxTheme.href = `/syntax/${theme}.css`;
  }

  selector.style.visibility = "visible";
  selector.addEventListener("change", function () {
    const syntaxTheme = document.getElementById("syntax-theme");
    syntaxTheme.href = `/syntax/${selector.value}.css`;

    // Save theme selection in cookie that expires in 1 year
    const oneYear = new Date();
    oneYear.setFullYear(oneYear.getFullYear() + 1);
    document.cookie = `syntax-theme=${
      selector.value
    };expires=${oneYear.toUTCString()};path=/`;
  });
});
