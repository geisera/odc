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
let xOffset = 0;
let yOffset = 0;
let zoom = 0.5;
let STEP  = 0.1;
let starData = [];

function drawGalaxy(zoom){
  const rand = mulberry32(99);

  if ( zoom < 0 ){ 
    zoom = 0.5 
  } else if( zoom > 500 ){
    zoom = 500
  };

   if ( zoom < 1 ){ 
    STEP = 1 
  } else if( zoom < 5 ){
    STEP = 1
  } else if( zoom < 10 ){
    STEP = 10
  } else if( zoom < 50 ){
    STEP = 100
  };

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  const arms = 2;
  const stars = 10000;
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
    ctx.fillRect(x, y, 1.5, 1.5);
    //starData.push({X: x, Y: y});
  }
  console.log(`Zoom: ${zoom}`);
  
}
//console.log(starData);

/* --- arrow‑key handling --- */
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp') {
    ctx.fillStyle = 'black';
    yOffset += STEP;
    e.preventDefault();
    drawGalaxy(zoom);
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') {
    ctx.fillStyle = 'black';
    yOffset -= STEP;
    e.preventDefault();
    drawGalaxy(zoom);
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
    ctx.fillStyle = 'black';
    xOffset += STEP;
    e.preventDefault();
    drawGalaxy(zoom);
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') {
    ctx.fillStyle = 'black';
    xOffset -= STEP;
    e.preventDefault();
    drawGalaxy(zoom);
  }
});

window.addEventListener('keydown', e => {
  if (e.key === '+') {
    ctx.fillStyle = 'black';
    zoom += STEP;
    e.preventDefault();
    drawGalaxy(zoom);
  }
});

window.addEventListener('keydown', e => {
  if (e.key === '-' && zoom > 10 ) {
    ctx.fillStyle = 'black';
    zoom -= STEP;
    e.preventDefault();
    drawGalaxy(zoom);
  }
});

// window.addEventListener('keydown', e => {
//   ctx.fillStyle = 'black';
//   switch (e.key) {
//     case 'ArrowUp': yOffset += STEP; break;
//     case 'ArrowDown': yOffset -= STEP; break;
//     case 'ArrowLeft': xOffset += STEP; break;
//     case 'ArrowRight': xOffset -= STEP; break;
//     case '+': zoom += 1; break;
//     case '-': zoom -= 1; break;
//     default: return;          // ignore all other keys
//   }
//   console.log(`Key: ${e.key}, Zoom: ${zoom}, xOff: ${xOffset}, yOff: ${yOffset}`);
//   e.preventDefault();         // stop page scroll
//   drawGalaxy();
// });

drawGalaxy(zoom);
