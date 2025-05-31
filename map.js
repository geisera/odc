/* ---------- deterministic PRNG ---------- */
function mulberry32(seed){
  return function(){
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* ---------- canvas & state ---------- */
const canvas = document.getElementById('galaxy');
const ctx     = canvas.getContext('2d');
const w       = canvas.width;
const h       = canvas.height;
const cx      = w / 2;
const cy      = h / 2;

/* zoom / pan that survive redraws */
let zoom    = 10;      // starts the same as before
let xOffset = 0;
let yOffset = 0;

/* galaxy constants (don’t change on redraw) */
const ARMS   = 2;
const STARS  = 10_000;
const TWIST  = 1.5;
const SPREAD = 2.8;

/* ---------- render ---------- */
function drawGalaxy() {
  ctx.fillStyle = getComputedStyle(document.documentElement)
                  .getPropertyValue('--bg');
  ctx.fillRect(0, 0, w, h);

  const rng   = mulberry32(0);                 // same galaxy every time
  const maxR  = Math.min(w, h) * zoom;

  for (let i = 0; i < STARS; i++) {
    const arm    = i % ARMS;
    const t      = rng();                      // 0‑1 “depth”
    const r      = t * maxR;
    const baseA  = (arm / ARMS) * Math.PI * 2;
    const angle  = baseA + t * TWIST * Math.PI * 2 + (rng() - 0.5) * SPREAD;

    const x = (cx + xOffset) + r * Math.cos(angle);
    const y = (cy + yOffset) + r * Math.sin(angle);

    const b = rng() * 255 | 0;
    ctx.fillStyle = `rgb(${b},${b},255)`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }
}

drawGalaxy();

/* ---------- tap / click handler ---------- */
canvas.addEventListener('pointerdown', e => {
  const rect = canvas.getBoundingClientRect();
  const sx   = e.clientX - rect.left;   // screen‑space tap
  const sy   = e.clientY - rect.top;

  /* world‑space coord under the finger before zoom */
  const wx = (sx - (cx + xOffset)) / zoom;
  const wy = (sy - (cy + yOffset)) / zoom;

  /* zoom in and translate so the tapped spot stays put */
  zoom *= 1.25;                          // tweak factor to taste
  xOffset = sx - cx - wx * zoom;
  yOffset = sy - cy - wy * zoom;

  drawGalaxy();
});