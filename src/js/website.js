// Theme switch, added to the nav by script. Choosing a theme other than the
// system's pins it as a class on <html> (restored by the head script) and
// stores it; choosing the system's clears it. System changes don't override a pin.
// See https://verou.me/blog/2026/dark-mode-toggles/.
function createThemeSwitcher() {
  const list = document.querySelector(".site > header nav ul");
  if (!list) return;

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function effectiveTheme() {
    const root = document.documentElement.classList;
    if (root.contains("dark")) return "dark";
    if (root.contains("light")) return "light";
    return darkQuery.matches ? "dark" : "light";
  }

  function otherTheme(theme) {
    return theme === "dark" ? "light" : "dark";
  }

  function mark(icon) {
    const span = document.createElement("span");
    span.dataset.icon = icon;
    span.setAttribute("aria-hidden", "true");
    return span;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-toggle";

  function render() {
    const current = effectiveTheme();
    const next = otherTheme(current);
    const label = "Switch to the " + next + " theme";
    button.setAttribute("aria-label", label);
    button.title = label;
    button.replaceChildren(mark(current), mark("arrow"), mark(next));
  }

  button.addEventListener("click", function () {
    const next = otherTheme(effectiveTheme());
    const system = darkQuery.matches ? "dark" : "light";
    const root = document.documentElement.classList;
    root.remove("dark", "light");
    if (next === system) {
      localStorage.removeItem("theme");
    } else {
      root.add(next);
      localStorage.setItem("theme", next);
    }
    render();
  });

  // While the reader hasn't chosen, follow the system.
  darkQuery.addEventListener("change", render);

  render();
  const li = document.createElement("li");
  li.appendChild(button);
  list.appendChild(li);
}

// Footnotes. Without script the marker opens its note via :target; this
// upgrades it to an in-place disclosure. When notes sit in the margin there is
// nothing to open, so the marker is removed from the tab order and a11y tree.
function initFootnotes() {
  document.addEventListener("click", function (event) {
    const mark = event.target.closest(".prose .fn-mark");
    if (!mark) return;
    event.preventDefault();
    if (mark.closest("[data-sidenotes-active]")) return;
    // The note is the marker's next sibling, so CSS opens it from aria-expanded.
    const open = mark.getAttribute("aria-expanded") === "true";
    mark.setAttribute("aria-expanded", open ? "false" : "true");
  });

  // Each prose takes its own markers, not those of a prose nested in it (an
  // embed's caption), whose column differs.
  document.querySelectorAll(".prose").forEach(function (host) {
    const marks = Array.from(host.querySelectorAll(".fn-mark")).filter(function (mark) {
      return mark.closest(".prose") === host;
    });
    if (!marks.length) return;
    const note = marks[0].nextElementSibling;
    function sync() {
      const asSidenote = getComputedStyle(note).float === "right";
      host.toggleAttribute("data-sidenotes-active", asSidenote);
      marks.forEach(function (mark) {
        if (asSidenote) {
          mark.setAttribute("tabindex", "-1");
          mark.setAttribute("aria-hidden", "true");
          mark.removeAttribute("aria-expanded");
        } else {
          mark.removeAttribute("tabindex");
          mark.removeAttribute("aria-hidden");
          if (!mark.hasAttribute("aria-expanded")) {
            mark.setAttribute("aria-expanded", "false");
          }
        }
      });
    }
    sync();
    // Margin fit depends on the prose's width: its column, measure and gutter.
    new ResizeObserver(sync).observe(host);
  });
}

// Contents highlight: the last heading whose top has passed a line just below
// the sticky header.
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll(".toc a[href^='#']"));
  if (!links.length) return;
  const headings = Array.from(
    new Set(links.map((link) => decodeURIComponent(link.hash.slice(1))))
  )
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const header = document.querySelector(".site > header");

  let frame = 0;
  function update() {
    frame = 0;
    const line =
      Math.max(0, header ? header.getBoundingClientRect().bottom : 0) + 48;
    let current = null;
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= line) current = heading.id;
    }
    for (const link of links) {
      if (current && decodeURIComponent(link.hash.slice(1)) === current) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  update();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
}

// Copy button on every code block. The block scrolls sideways, so it is
// wrapped and the button sits on the wrapper.
function initCodeCopyButtons() {
  // Sized in markup too, so the icon is sane without the stylesheet.
  function icon(path) {
    return (
      '<svg aria-hidden="true" width="1em" height="1em" viewBox="0 0 256 256"><path d="' +
      path +
      '"/></svg>'
    );
  }
  const COPY_ICON = icon(
    "M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8ZM160 208H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z"
  );
  const COPIED_ICON = icon(
    "m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z"
  );

  document.querySelectorAll(".prose pre").forEach(function (block) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy";
    button.innerHTML = COPY_ICON;
    button.setAttribute("aria-label", "Copy code");
    button.addEventListener("click", function () {
      const code = block.querySelector("code");
      if (!code) return;
      navigator.clipboard.writeText(code.textContent.trim()).then(
        function () {
          button.innerHTML = COPIED_ICON;
          button.setAttribute("aria-label", "Code copied");
          setTimeout(function () {
            button.innerHTML = COPY_ICON;
            button.setAttribute("aria-label", "Copy code");
          }, 2000);
        },
        function () {
          button.textContent = "copy failed";
        }
      );
    });
    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    block.replaceWith(wrapper);
    wrapper.append(block, button);
  });
}

// The notes rail: the filter, the notes' ages, and the current row in view.
function initNotesRail() {
  const rail = document.querySelector(".notes-rail");
  if (!rail) return;
  initRailFilter(rail);
  initNoteAges(rail);

  // On a deep link the current row may be far down the rail; scroll the rail
  // (not the page) to it.
  const row = rail.querySelector(".rail-row[aria-current]");
  if (row && rail.scrollHeight > rail.clientHeight) {
    const railBox = rail.getBoundingClientRect();
    const rowBox = row.getBoundingClientRect();
    if (rowBox.bottom > railBox.bottom) {
      rail.scrollTop += rowBox.bottom - railBox.bottom;
    } else if (rowBox.top < railBox.top) {
      rail.scrollTop -= railBox.top - rowBox.top;
    }
  }
}

// Keeps matching rows, their descendants and their ancestor folders, opening
// kept folders. Clearing restores the previous checkbox state.
function initRailFilter(rail) {
  const input = rail.querySelector(".rail-search");
  const tree = rail.querySelector(".rail-tree > .notes-level");
  if (!input || !tree) return;
  input.closest("label").hidden = false;

  const boxes = Array.from(rail.querySelectorAll(".rail-branch"));
  const empty = rail.querySelector(".rail-empty");
  let saved = null;

  function filter(level, needle, keepAll) {
    let any = false;
    for (const item of level.children) {
      const label = item.querySelector(":scope > .rail-row-wrap .rail-row-label");
      const match =
        keepAll ||
        (label && label.textContent.toLowerCase().includes(needle));
      const children = item.querySelector(":scope > .notes-level");
      const childMatch = children ? filter(children, needle, match) : false;
      const visible = match || childMatch;
      item.hidden = !visible;
      const box = item.querySelector(":scope > .rail-branch");
      if (box && visible) box.checked = true;
      any = any || visible;
    }
    return any;
  }

  function showAll(level) {
    for (const item of level.querySelectorAll("li")) item.hidden = false;
  }

  input.addEventListener("input", function () {
    const needle = input.value.trim().toLowerCase();
    if (!needle) {
      showAll(tree);
      if (empty) empty.hidden = true;
      if (saved) {
        boxes.forEach((box, i) => (box.checked = saved[i]));
        saved = null;
      }
      return;
    }
    if (!saved) saved = boxes.map((box) => box.checked);
    const any = filter(tree, needle, false);
    if (empty) empty.hidden = any;
  });
}

// A note's age as "5d", "6 wk", "4 mo" or "2 yr".
function initNoteAges(rail) {
  const DAY = 86400000;
  const now = Date.now();
  function age(days) {
    if (days === 0) return "today";
    if (days < 14) return days + "d";
    if (days < 60) return Math.round(days / 7) + " wk";
    if (days < 365) return Math.round(days / 30.4) + " mo";
    return Math.round(days / 365.25) + " yr";
  }
  rail.querySelectorAll("time.rail-age[datetime]").forEach(function (time) {
    const at = Date.parse(time.getAttribute("datetime"));
    if (Number.isNaN(at)) return;
    time.textContent = age(Math.max(0, Math.round((now - at) / DAY)));
  });
}

// Music library. YouTube search links are generated here rather than in the
// page, where they would double its size. The liked filter needs script, so it
// starts hidden; ?likes=1 turns it on.
function initMusicLibrary() {
  const library = document.querySelector(".music-library");
  if (!library) return;

  function search(link, query) {
    link.href =
      "https://www.youtube.com/results?search_query=" +
      encodeURIComponent(query);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  const albums = Array.from(library.querySelectorAll(".music-surface > section"));
  for (const album of albums) {
    const artist = album.querySelector(".album-heading .artist").textContent.trim();
    const albumLink = album.querySelector("a.album-link");
    search(albumLink, artist + " - " + albumLink.textContent.trim() + " album");
    for (const track of album.querySelectorAll("a.track")) {
      const trackArtist = track.querySelector(".artist");
      const name = track.querySelector(".name").textContent.trim();
      search(
        track,
        (trackArtist ? trackArtist.textContent.trim() : artist) + " - " + name
      );
    }
  }

  const checkbox = library.querySelector("#likes-filter-checkbox");
  if (!checkbox) return;
  checkbox.closest(".music-filter").hidden = false;
  const params = new URLSearchParams(window.location.search);
  checkbox.checked = params.get("likes") === "1";

  // Liked albums show in full; others show only their liked tracks.
  function apply() {
    const likes = checkbox.checked;
    for (const album of albums) {
      const liked = album.hasAttribute("data-starred");
      let any = false;
      for (const track of album.querySelectorAll("a.track")) {
        const visible = !likes || liked || track.hasAttribute("data-starred");
        track.style.display = visible ? "" : "none";
        any = any || visible;
      }
      album.style.display = !likes || liked || any ? "" : "none";
    }
  }

  checkbox.addEventListener("change", function () {
    apply();
    if (checkbox.checked) params.set("likes", "1");
    else params.delete("likes");
    const query = params.toString();
    history.replaceState(
      {},
      "",
      window.location.pathname + (query ? "?" + query : "") + window.location.hash
    );
  });
  if (checkbox.checked) apply();
}

document.addEventListener("DOMContentLoaded", function () {
  createThemeSwitcher();
  initFootnotes();
  initScrollSpy();
  initCodeCopyButtons();
  initNotesRail();
  initMusicLibrary();
});
