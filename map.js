/* ---------- deterministic PRNG ---------- */
function mulberry32(seed){
  return function(){
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(0);

/* ---------- galaxy painter ---------- */
const canvas = document.getElementById('galaxy');
const ctx     = canvas.getContext('2d');
const width   = canvas.width;              
const height  = canvas.height;             
const cx      = width / 2;
const cy      = height / 2;

function drawGalaxy(){
  ctx.fillStyle = getComputedStyle(document.documentElement)
                 .getPropertyValue('--bg');
  ctx.fillRect(0,0,width,height);

  const arms  = 2;
  const stars = 10000;
  const spread= 2.8;
  const twist = 1.5;
  const zoom  = 10;
  const maxR  = Math.min(width,height)*zoom;

  for(let i=0;i<stars;i++){
    const arm   = i%arms;
    const t     = rand();
    const r     = t*maxR;
    const baseA = (arm/arms)*2*Math.PI;
    const angle = baseA + t*twist*2*Math.PI + (rand()-0.5)*spread;

    const x = cx + r*Math.cos(angle);
    const y = cy + r*Math.sin(angle);

    const b = rand()*255|0;
    ctx.fillStyle=`rgb(${b},${b},255)`;
    ctx.fillRect(x,y,1.5,1.5);
  }
}

drawGalaxy();