// js/galaxy.js

export function init() {
  const canvas = document.getElementById("star-map");
  const ctx    = canvas.getContext("2d");

  // ── 1) Resize the drawing buffer to match CSS-rendered size ──
  const container = canvas.parentElement;
  canvas.width  = container.clientWidth;
  canvas.height = container.clientHeight;

  const width = canvas.width;
  const height = canvas.height;
  const cx     = width  / 2;
  const cy     = height / 2;

  // ── 2) Deterministic PRNG ───────────────────────────────────
  function mulberry32(seed) {
    return function() {
      let t = (seed += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ── 3) Zoom / pan state & helpers ───────────────────────────
  const zoomLevel = Object.freeze({
    LEVEL_1:    1,
    LEVEL_2:    5,
    LEVEL_3:   10,
    LEVEL_4:  100,
    LEVEL_5: 1000,
    LEVEL_6:10000,
  });
  let xOffset = 0,
      yOffset = 0,
      zoom    = zoomLevel.LEVEL_1,
      STEP    = 100,
      size    = 1;

  function updateStep() {
    if      (zoom === zoomLevel.LEVEL_6) STEP = 1;
    else if (zoom === zoomLevel.LEVEL_5) STEP = 10;
    else if (zoom === zoomLevel.LEVEL_4) STEP = 25;
    else if (zoom === zoomLevel.LEVEL_3) STEP = 50;
    else if (zoom === zoomLevel.LEVEL_2) STEP = 75;
    else                                  STEP = 100;
  }

  function adjustOffsetsForZoom(newZoom) {
    const ratio = newZoom / zoom;
    xOffset *= ratio;
    yOffset *= ratio;
  }

  function zoomIn() {
    let newZoom = zoom, newSize = size;
    switch (zoom) {
      case zoomLevel.LEVEL_1: newZoom = zoomLevel.LEVEL_2; newSize = 2;  break;
      case zoomLevel.LEVEL_2: newZoom = zoomLevel.LEVEL_3; newSize = 3;  break;
      case zoomLevel.LEVEL_3: newZoom = zoomLevel.LEVEL_4; newSize = 6;  break;
      case zoomLevel.LEVEL_4: newZoom = zoomLevel.LEVEL_5; newSize = 10; break;
      case zoomLevel.LEVEL_5: newZoom = zoomLevel.LEVEL_6; newSize = 40; break;
    }
    if (newZoom !== zoom) {
      adjustOffsetsForZoom(newZoom);
      zoom = newZoom;
      size = newSize;
      updateStep();
      drawGalaxy();
    }
  }

  function zoomOut() {
    let newZoom = zoom, newSize = size;
    switch (zoom) {
      case zoomLevel.LEVEL_6: newZoom = zoomLevel.LEVEL_5; newSize = 10; break;
      case zoomLevel.LEVEL_5: newZoom = zoomLevel.LEVEL_4; newSize = 6;  break;
      case zoomLevel.LEVEL_4: newZoom = zoomLevel.LEVEL_3; newSize = 3;  break;
      case zoomLevel.LEVEL_3: newZoom = zoomLevel.LEVEL_2; newSize = 2;  break;
      case zoomLevel.LEVEL_2: newZoom = zoomLevel.LEVEL_1; newSize = 1;  break;
    }
    if (newZoom !== zoom) {
      adjustOffsetsForZoom(newZoom);
      zoom = newZoom;
      size = newSize;
      updateStep();
      drawGalaxy();
    }
  }

  // ── 4) Draw the galaxy ──────────────────────────────────────
  function drawGalaxy() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    const rand   = mulberry32(99);
    const arms   = 2;
    const stars  = 40000;
    const spread = 3.9;
    const twist  = 0.55;
    const maxR   = Math.min(width, height) * zoom;

    for (let i = 0; i < stars; i++) {
      const arm   = i % arms;
      const t     = rand();
      const r     = t * maxR;
      const baseA = (arm / arms) * 2 * Math.PI;
      const angle = baseA + t * twist * 2 * Math.PI + (rand() - 0.5) * spread;
      const x     = cx + r * Math.cos(angle) + xOffset;
      const y     = cy + r * Math.sin(angle) + yOffset;
      const b     = (rand() * 255) | 0;
      const rad   = size / 2;

      ctx.fillStyle = `rgb(${b},${b},255)`;
      ctx.beginPath();
      ctx.arc(x + rad, y + rad, rad, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  // ── 5) Input handlers ──────────────────────────────────────
  // Arrow keys + WASD + +/- zoom
  window.addEventListener("keydown", e => {
    switch (e.key) {
      case "ArrowUp":    case "w": yOffset += STEP; e.preventDefault(); drawGalaxy(); break;
      case "ArrowDown":  case "x": yOffset -= STEP; e.preventDefault(); drawGalaxy(); break;
      case "ArrowLeft":  case "a": xOffset += STEP; e.preventDefault(); drawGalaxy(); break;
      case "ArrowRight": case "d": xOffset -= STEP; e.preventDefault(); drawGalaxy(); break;
      case "+": case "=":             e.preventDefault(); zoomIn();  break;
      case "-": case "_":             e.preventDefault(); zoomOut(); break;
    }
  });

  // Click-to-center
  canvas.addEventListener("click", e => {
    const clickX = e.offsetX;
    const clickY = e.offsetY;
    xOffset += (cx - clickX);
    yOffset += (cy - clickY);
    drawGalaxy();
  });

  // Touch: single-tap to center, double-tap to zoom
  let lastTap = 0, singleTapTimer;
  canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    const now   = Date.now();
    const rect  = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const x      = (touch.clientX - rect.left) * scaleX;
    const y      = (touch.clientY - rect.top)  * scaleY;

    if (now - lastTap < 300) {
      clearTimeout(singleTapTimer);
      zoomIn();
    } else {
      singleTapTimer = setTimeout(() => {
        xOffset += (cx - x);
        yOffset += (cy - y);
        drawGalaxy();
      }, 300);
    }
    lastTap = now;
  });

  // ── 6) Kick it off ─────────────────────────────────────────
  updateStep();
  drawGalaxy();
}
