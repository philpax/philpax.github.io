// Header background: animated contour lines in the section's accent colour.
// Purely decorative; skipped without WebGL or under prefers-reduced-motion.

const SHADER_VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

// Line width is constant in screen space (via fwidth, which needs
// OES_standard_derivatives in WebGL 1).
// Pixels near the pointer sample from a point pulled toward it; strength eases with u_ms.
// The field drifts by u_o, which follows the clock rather than the page, so it carries on
// across pages. The noise tiles every DRIFT_PERIOD (its lattice wraps, and each octave
// exactly doubles), so the drift can be wrapped to keep it precise without a seam.
const SHADER_FRAG = `#extension GL_OES_standard_derivatives : enable
precision mediump float;
uniform vec2 u_res;
uniform vec2 u_o;
uniform vec3 u_col;
uniform vec2 u_m;
uniform float u_ms;

float hash(vec2 p) {
  p = mod(p, 256.0);
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 4; i++) {
    s += a * noise(p);
    // The shift keeps the octaves' lattices apart without breaking the tiling.
    p = p * 2.0 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return s;
}

float figure(vec2 p, vec2 o) {
  float f = fbm(p * 0.7 + o);
  float g = f * 9.0;
  float d = abs(fract(g) - 0.5);
  float w = fwidth(g);
  // Keep lines mostly opaque so the field's shading doesn't swallow them.
  return (1.0 - smoothstep(0.0, w * 1.9, d)) * (0.55 + 0.45 * smoothstep(0.1, 0.6, f));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float a = u_res.x / max(u_res.y, 1.0);
  vec2 p = vec2(uv.x * a, uv.y);
  vec2 d = p - vec2(u_m.x * a, u_m.y);
  float r = length(d);
  p -= d / max(r, 0.001) * (u_ms * 0.6 * exp(-r * r * 0.6));
  float v = figure(p, u_o);
  gl_FragColor = vec4(u_col, clamp(v, 0.0, 1.0));
}
`;

// The noise lattice's period, as in the shader's hash.
const DRIFT_PERIOD = 256;

function compileShader(gl, type, src) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

// Read the colour via a 1px 2D canvas so the browser resolves oklch for us.
function rgbOf(colour) {
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.fillStyle = "#000";
  ctx.fillStyle = colour;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

function initHeaderShader() {
  const canvas = document.querySelector(".header-shader");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
    depth: false,
  });
  if (!gl) return;
  if (!gl.getExtension("OES_standard_derivatives")) return;

  const vs = compileShader(gl, gl.VERTEX_SHADER, SHADER_VERT);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, SHADER_FRAG);
  const prog = vs && fs ? gl.createProgram() : null;
  if (!prog) return;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  // One triangle covering the viewport; no index buffer needed.
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  const uRes = gl.getUniformLocation(prog, "u_res");
  const uDrift = gl.getUniformLocation(prog, "u_o");
  const uCol = gl.getUniformLocation(prog, "u_col");
  const uM = gl.getUniformLocation(prog, "u_m");
  const uMs = gl.getUniformLocation(prog, "u_ms");

  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    gl.uniform2f(uRes, canvas.width, canvas.height);
  }
  new ResizeObserver(size).observe(canvas);

  // Pointer in canvas coordinates, y up. Listens on the header since the
  // canvas takes no pointer events. Position and strength ease toward targets.
  const host = canvas.parentElement || canvas;
  const m = { x: 0.5, y: 0.5, s: 0, tx: 0.5, ty: 0.5, ts: 0 };
  host.addEventListener("pointermove", function (e) {
    const r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) return;
    m.tx = (e.clientX - r.left) / r.width;
    m.ty = 1 - (e.clientY - r.top) / r.height;
    m.ts = 1;
  });
  function onLeave() {
    m.ts = 0;
  }
  host.addEventListener("pointerleave", onLeave);
  host.addEventListener("pointercancel", onLeave);

  // Colour comes from the canvas's `color` (the ambient accent), so it follows theme changes.
  let colour = "";
  function readColour() {
    const next = getComputedStyle(canvas).color;
    if (next === colour) return;
    const rgb = rgbOf(next);
    if (!rgb) return;
    colour = next;
    gl.uniform3f(uCol, rgb[0], rgb[1], rgb[2]);
  }

  let n = 0;
  function draw() {
    requestAnimationFrame(draw);
    if (document.hidden) return;
    if (n++ % 12 === 0) readColour();
    size();
    m.x += (m.tx - m.x) * 0.15;
    m.y += (m.ty - m.y) * 0.15;
    m.s += (m.ts - m.s) * 0.08;
    gl.uniform2f(uM, m.x, m.y);
    gl.uniform1f(uMs, m.s);
    const t = Date.now() / 1000;
    gl.uniform2f(uDrift, (t * 0.1) % DRIFT_PERIOD, (t * 0.035) % DRIFT_PERIOD);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  draw();
}

document.addEventListener("DOMContentLoaded", initHeaderShader);
