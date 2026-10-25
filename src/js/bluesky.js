// Native HLS where available; otherwise load the local hls.js bundle on play.
function initBlueskyVideos() {
  let playerScript;
  function loadPlayer() {
    if (window.Hls) return Promise.resolve(window.Hls);
    if (!playerScript) {
      playerScript = new Promise(function (resolve, reject) {
        const script = document.createElement("script");
        script.src = "/vendor/hls-1.7.3.light.min.js";
        script.onload = function () {
          if (window.Hls) resolve(window.Hls);
          else reject(new Error("HLS player did not load"));
        };
        script.onerror = function () { reject(new Error("HLS player unavailable")); };
        document.head.appendChild(script);
      }).catch(function (error) {
        playerScript = null;
        throw error;
      });
    }
    return playerScript;
  }

  document.querySelectorAll("video[data-hls]").forEach(function (video) {
    const source = video.dataset.hls;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "social-card-video-play";
    function labelButton(label, loading) {
      button.setAttribute("aria-label", label);
      button.title = label;
      button.dataset.loading = loading ? "true" : "false";
    }
    labelButton("Play video", false);
    video.insertAdjacentElement("afterend", button);
    video.controls = false;
    let starting = false;
    let player;
    let request = 0;
    function reset() {
      request++;
      if (player) player.destroy();
      player = null;
      starting = false;
      video.controls = false;
      button.hidden = false;
      button.disabled = false;
      labelButton("Retry video", false);
    }
    async function start() {
      if (starting) {
        reset();
        return;
      }
      if (player) return;
      starting = true;
      const current = ++request;
      labelButton("Cancel video loading", true);
      try {
        const Hls = await loadPlayer();
        if (current !== request) return;
        if (!Hls.isSupported()) throw new Error("HLS playback unsupported");
        player = new Hls();
        player.on(Hls.Events.ERROR, function (_event, data) {
          if (current === request && data.fatal) reset();
        });
        player.on(Hls.Events.MANIFEST_PARSED, function () {
          if (current !== request) return;
          starting = false;
          video.controls = true;
          const hadFocus = document.activeElement === button;
          button.hidden = true;
          if (hadFocus) video.focus();
          video.play().catch(function () {});
        });
        player.loadSource(source);
        player.attachMedia(video);
      } catch (_error) {
        if (current === request) reset();
        // The linked post timestamp remains available when playback is unsupported.
      }
    }
    button.addEventListener("click", start);
  });
}

document.addEventListener("DOMContentLoaded", initBlueskyVideos);
