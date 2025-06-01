/* ---------- deterministic PRNG ---------- */
function mulberry32(seed){
  return function(){
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* ---------- galaxy painter ---------- */
const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const cx = width  / 2;
const cy = height / 2;

/* --- pan state & settings --- */
const zoomLevel = Object.freeze({
    LEVEL_1: 0.5,
    LEVEL_2: 1.0,
    LEVEL_3: 10,
    LEVEL_4: 100,
    LEVEL_5: 1000
});

let xOffset = 0;
let yOffset = 0;
let zoom = zoomLevel.LEVEL_1;
let STEP  = 0.1;
let size = 1.0;

// Increase zoom (if not already at max)
function zoomIn() {
  switch (zoom) {
    case zoomLevel.LEVEL_1:
      zoom = zoomLevel.LEVEL_2;
      size = 1;
      break;
    case zoomLevel.LEVEL_2:
      zoom = zoomLevel.LEVEL_3;
      size = 3;
      break;
    case zoomLevel.LEVEL_3:
      zoom = zoomLevel.LEVEL_4;
      size = 5;
      break;
    case zoomLevel.LEVEL_4:
      zoom = zoomLevel.LEVEL_5;
      size = 10;
      break;
    // LEVEL_5 is max; no change
  }
  drawGalaxy(zoom);
}

// Decrease zoom (if not already at min)
function zoomOut() {
  switch (zoom) {
    case zoomLevel.LEVEL_5:
      zoom = zoomLevel.LEVEL_4;
      size = 5;
      break;
    case zoomLevel.LEVEL_4:
      zoom = zoomLevel.LEVEL_3;
      size = 3;
      break;
    case zoomLevel.LEVEL_3:
      zoom = zoomLevel.LEVEL_2;
      size = 1.5;
      break;
    case zoomLevel.LEVEL_2:
      zoom = zoomLevel.LEVEL_1;
      size = 1;
      break;
    // LEVEL_1 is min; no change
  }
  drawGalaxy(zoom);
}

function drawGalaxy(zoom){
  const rand = mulberry32(99);

  if ( zoom == zoomLevel.LEVEL_5 ){ 
    STEP = 10;
  } else if( zoom == zoomLevel.LEVEL_4 ){
    STEP = 25;
  } else if( zoom == zoomLevel.LEVEL_3 ){
    STEP = 50;
  } else if( zoom == zoomLevel.LEVEL_2 ){
    STEP = 75;
  } else if( zoom == zoomLevel.LEVEL_1 ){
    STEP = 100;
  };

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  const arms = 2;
  const stars = 5000;
  const spread = 2.8;
  const twist = 1.5;
  const maxR = Math.min(width, height) * zoom;

  for (let i = 0; i < stars; i++){
    const arm = i % arms;
    const t = rand();
    const r = t * maxR;
    const baseA = (arm / arms) * 2 * Math.PI;
    const angle = baseA + t * twist * 2 * Math.PI + (rand() - .5) * spread;

    /* apply pan offsets */
    const x = cx + r * Math.cos(angle) + xOffset;
    const y = cy + r * Math.sin(angle) + yOffset;

    const b = rand() * 255 | 0;
    ctx.fillStyle = `rgb(${b},${b},255)`;
    const rad = size / 2;
    ctx.beginPath();
    ctx.arc(x + rad, y + rad, rad, 0, 2 * Math.PI);
    ctx.fill();
  }

  console.log(`Zoom: ${zoom}`);
  console.log(`Width: ${width * zoom}`);
}

/* --- arrow-key handling --- */
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp') {
    yOffset += STEP;
    e.preventDefault();
    drawGalaxy(zoom);
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') {
    yOffset -= STEP;
    e.preventDefault();
    drawGalaxy(zoom);
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
    xOffset += STEP;
    e.preventDefault();
    drawGalaxy(zoom);
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') {
    xOffset -= STEP;
    e.preventDefault();
    drawGalaxy(zoom);
  }
});

// Bind “+” and “–” to zoomIn/zoomOut:
window.addEventListener('keydown', e => {
  if (e.key === '+') {
    e.preventDefault();
    zoomIn();
  }
});
window.addEventListener('keydown', e => {
  if (e.key === '-') {
    e.preventDefault();
    zoomOut();
  }
});

/* --- click-to-center handling --- */
canvas.addEventListener('click', e => {
  // Get click coordinates relative to canvas
  const clickX = e.offsetX;
  const clickY = e.offsetY;

  // Calculate how much to shift so clicked point moves to center
  xOffset += (cx - clickX);
  yOffset += (cy - clickY);

  drawGalaxy(zoom);
});

drawGalaxy(zoom);
