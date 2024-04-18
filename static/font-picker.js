const candidates = [
  // sans-serif
  "Coda",
  "Gafata",
  "Georama",
  "Glory",
  "K2D",
  "Noto Sans Display",
  "Overlock",
  "Rhodium Libre",
  "Saira Semi Condensed",
  "Sintony",
  "Strait",
  "Thasadith",
  "Titillium Web",
  "Tomorrow",
  // serif
  "Alike Angular",
  "Della Respira",
  "Dosis",
  "Gilda Display",
  "Inria Serif",
  "Mate",
  "Old Standard TT",
  "Piazzolla",
  "Playfair Display",
  "Port Lligat Sans",
  "Port Lligat Slab",
  "Rufina",
  "Sedan",
];

let head = document.head;

let link = document.createElement("link");
link.rel = "preconnect";
link.href = "https://fonts.googleapis.com";
head.appendChild(link);

link = document.createElement("link");
link.rel = "preconnect";
link.href = "https://fonts.gstatic.com";
link.crossorigin = "";
head.appendChild(link);

let families = candidates
  .map((font) => font.replace(/ /g, "+"))
  .join("&family=");
link = document.createElement("link");
link.href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
link.rel = "stylesheet";
head.appendChild(link);

document.body.onload = () => {
  let body = document.body;
  let fontPicker = document.createElement("select");
  candidates.forEach((font) => {
    let option = document.createElement("option");
    option.value = font;
    option.innerText = font;
    fontPicker.appendChild(option);
  });
  fontPicker.addEventListener("change", function () {
    body.style.fontFamily = fontPicker.value;
  });
  body.style.fontFamily = fontPicker.value;
  body.prepend(fontPicker);
};
