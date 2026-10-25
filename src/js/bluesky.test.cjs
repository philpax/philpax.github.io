const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const source = fs.readFileSync(path.join(__dirname, "bluesky.js"), "utf8");
const flush = () => new Promise(resolve => setImmediate(resolve));

function fixture({ native = false, unsupported = false, scriptFailure = false, count = 1 } = {}) {
  const scripts = [], instances = [];
  const window = {};
  class Hls {
    static Events = { ERROR: "error", MANIFEST_PARSED: "manifest" };
    static isSupported() { return !unsupported; }
    constructor() { this.events = {}; instances.push(this); }
    on(event, cb) { this.events[event] = cb; }
    loadSource(source) { this.source = source; }
    attachMedia(video) { this.video = video; }
    destroy() { this.destroyed = true; }
  }
  const videos = Array.from({ length: count }, () => ({
    dataset: { hls: "https://video.bsky.app/playlist.m3u8" }, controls: true, plays: 0,
    canPlayType() { return native ? "probably" : ""; },
    insertAdjacentElement(_, button) { this.button = button; },
    focus() { this.focused = true; document.activeElement = this; },
    play() { this.plays++; return Promise.resolve(); },
  }));
  const document = {
    activeElement: null,
    addEventListener(event, cb) { assert.equal(event, "DOMContentLoaded"); this.ready = cb; },
    querySelectorAll() { return videos; },
    createElement(tag) {
      return {
        tag, events: {}, dataset: {}, attributes: {},
        setAttribute(name, value) { this.attributes[name] = value; },
        focus() { document.activeElement = this; },
        addEventListener(event, cb) { this.events[event] = cb; },
      };
    },
    head: { appendChild(script) { scripts.push(script); queueMicrotask(() => {
      if (scriptFailure) script.onerror();
      else { window.Hls = Hls; script.onload(); }
    }); } },
  };
  vm.runInNewContext(source, { window, document });
  document.ready();
  return { videos, scripts, instances, document };
}

(async () => {
  const native = fixture({ native: true });
  assert.equal(native.videos[0].src, native.videos[0].dataset.hls);
  assert.equal(native.videos[0].button, undefined);
  assert.equal(native.scripts.length, 0);
  assert.equal(native.videos[0].plays, 0);

  const normal = fixture({ count: 2 });
  assert.equal(normal.scripts.length, 0);
  assert.equal(normal.videos[0].controls, false);
  const [first, second] = normal.videos;
  assert.equal(first.button.type, "button");
  assert.equal(first.button.className, "social-card-video-play");
  assert.equal(first.button.attributes["aria-label"], "Play video");
  assert.equal(first.button.title, "Play video");
  assert.equal(first.button.dataset.loading, "false");
  assert.equal(first.button.textContent, undefined);
  assert.deepEqual(Object.keys(first.button.events), ["click"]);
  first.button.focus();
  first.button.events.click();
  assert.equal(first.button.attributes["aria-label"], "Cancel video loading");
  assert.equal(first.button.dataset.loading, "true");
  await flush();
  assert.equal(normal.scripts.length, 1);
  assert.equal(normal.instances.length, 1);
  assert.equal(first.plays, 0);
  assert.equal(normal.instances[0].source, first.dataset.hls);
  assert.equal(normal.instances[0].video, first);
  normal.instances[0].events.manifest();
  assert.equal(first.plays, 1);
  assert.equal(first.controls, true);
  assert.equal(first.button.hidden, true);
  assert.equal(first.focused, true);
  assert.equal(normal.document.activeElement, first);
  second.button.focus();
  second.button.events.click();
  await flush();
  assert.equal(normal.scripts.length, 1);
  assert.equal(normal.instances.length, 2);
  const nextLink = { tag: "a" };
  normal.document.activeElement = nextLink;
  normal.instances[1].events.manifest();
  assert.equal(second.plays, 1);
  assert.equal(second.controls, true);
  assert.equal(second.button.hidden, true);
  assert.equal(second.focused, undefined);
  assert.equal(normal.document.activeElement, nextLink);
  normal.instances[0].events.error(null, { fatal: true });
  assert.equal(normal.instances[0].destroyed, true);
  assert.equal(first.button.hidden, false);
  assert.equal(first.button.attributes["aria-label"], "Retry video");
  assert.equal(first.button.dataset.loading, "false");
  first.button.events.click();
  await flush();
  assert.equal(normal.instances.length, 3);

  const cancelledScript = fixture();
  const pending = cancelledScript.videos[0];
  pending.button.events.click();
  pending.button.events.click();
  await flush();
  assert.equal(cancelledScript.instances.length, 0);
  assert.equal(pending.plays, 0);
  pending.button.events.click();
  await flush();
  assert.equal(cancelledScript.instances.length, 1);

  const cancelledManifest = fixture();
  const waiting = cancelledManifest.videos[0];
  waiting.button.events.click();
  await flush();
  waiting.button.events.click();
  cancelledManifest.instances[0].events.manifest();
  assert.equal(waiting.plays, 0);
  assert.equal(cancelledManifest.instances[0].destroyed, true);
  assert.equal(waiting.button.hidden, false);

  const failed = fixture({ scriptFailure: true });
  failed.videos[0].button.events.click();
  await flush();
  assert.equal(failed.videos[0].button.disabled, false);
  assert.equal(failed.videos[0].plays, 0);
  failed.videos[0].button.events.click();
  await flush();
  assert.equal(failed.scripts.length, 2);

  const unsupported = fixture({ unsupported: true });
  unsupported.videos[0].button.events.click();
  await flush();
  assert.equal(unsupported.instances.length, 0);
  assert.equal(unsupported.videos[0].plays, 0);
  assert.equal(unsupported.videos[0].button.disabled, false);
  console.log("Bluesky player tests passed: native HLS, lazy loading, click activation, playback, cancellation and failure retries");
})().catch(error => { console.error(error); process.exitCode = 1; });
