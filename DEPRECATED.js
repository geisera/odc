/* -------------- deterministic PRNG -------------- */
function mulberry32(seed){
  return function(){
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(0);       // ← change seed

/* -------------- galaxy painter -------------- */
const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const cx = width/2;
const cy = height/2;

function drawGalaxy(){
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg');
  ctx.fillRect(0,0,width,height);

  const arms = 2; 
  stars = 6000; 
  spread = 2.8;
  twist = 1.5;
  zoom = 4; //0.48
  xoffset = 0;
  yoffset = 0;
  const maxR = Math.min(width, height) * zoom;
  const starData = []; 

  for(let i=0; i<stars; i++){
    const arm   = i % arms;
    const t     = rand();                 // 0‒1 radial position
    const r     = t * maxR;
    const baseA = (arm/arms)*2*Math.PI;
    const angle = baseA + t*twist*2*Math.PI + (rand()-0.5)*spread;

    const x = (cx + xoffset) + r*Math.cos(angle);
    const y = (cy + yoffset) + r*Math.sin(angle);
    starData.push({ x, y, depth: t });

    const b = rand()*255|0;               // deterministic brightness
    ctx.fillStyle = `rgb(${b},${b},255)`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }
  console.table(starData);
}

function drawReticle(ctx, options = {}) {
  const { canvas } = ctx;
  const w = canvas.width, h = canvas.height;
  const cx = w / 2, cy = h / 2;

  const color = options.color       || "yellow";
  const lineWidth = options.lineWidth   || 1.5;
  const tick = options.tick        || 8;

  ctx.save();
  ctx.lineWidth   = lineWidth;
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.6;          // a little translucency

  // cross‑hair lines
  ctx.beginPath();
  ctx.moveTo(cx - outerRadius, cy);
  ctx.lineTo(cx + outerRadius, cy);
  ctx.moveTo(cx, cy - outerRadius);
  ctx.lineTo(cx, cy + outerRadius);
  ctx.stroke();

  // little ticks at 45° angles
  const diag = outerRadius * Math.SQRT1_2;
  [
    [cx + diag, cy + diag],
    [cx - diag, cy + diag],
    [cx - diag, cy - diag],
    [cx + diag, cy - diag]
  ].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.sign(cx - x) * tick, y); // horizontal tick
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + Math.sign(cy - y) * tick); // vertical tick
    ctx.stroke();
  });

  ctx.restore();
}

drawGalaxy();
//drawReticle(ctx);