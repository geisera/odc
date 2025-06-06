/**
 * buildFooter():
 *   • Finds #footer and injects a simple copyright line.
 */

export function buildFooter() {
  const container = document.getElementById("footer");
  if (!container) return;

  const footerEl = document.createElement("div");
  footerEl.style.padding = "1rem";
  footerEl.style.textAlign = "center";
  footerEl.style.color = "#888";
  footerEl.style.fontSize = "0.9rem";

  const year = new Date().getFullYear();
  footerEl.innerHTML = `&copy; ${year} Orbital Defense Corps. All rights reserved.`;  
  container.appendChild(footerEl);

  console.log("footer.js: footer built");
}
