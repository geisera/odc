/**
 * initGalaxy():
 *   • If there’s a <canvas id="galaxy-canvas"> on the page, draw a simple star
 *     so you can confirm “it ran.”
 *
 * (You can expand this into a full procedural galaxy painter later.)
 */

export function initGalaxy() {
  // Look for a canvas with id="galaxy-canvas"
  const canvas = document.getElementById("galaxy-canvas");
  if (!canvas) {
    console.log("galaxy.js: no #galaxy-canvas found—skipping");
    return;
  }

  const ctx = canvas.getContext("2d");
  // Draw one white star in the center
  const w = canvas.width;
  const h = canvas.height;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, 5, 0, Math.PI * 2);
  ctx.fill();

  console.log("galaxy.js: drew a star on #galaxy-canvas");
}
