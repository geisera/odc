/**
 * buildNav(title, items):
 *   • title: string shown at left
 *   • items: array of { id: "/some-path", label: "Display Text" }
 *
 * Fills <div id="nav"></div> with a <nav> element containing links.
 *
 * setupViewHandler() is a stub here: you can wire up any additional
 * client‐side logic to highlight the active view, etc.
 */

export function buildNav(siteTitle, items) {
  const container = document.getElementById("nav");
  if (!container) return;

  // Create a <nav> … </nav>
  const navEl = document.createElement("nav");
  navEl.style.padding = "1rem";
  navEl.style.backgroundColor = "#222";
  navEl.style.color = "#fff";
  navEl.style.display = "flex";
  navEl.style.alignItems = "center";
  navEl.style.justifyContent = "space-between";

  // Left‐side: site title
  const titleEl = document.createElement("div");
  titleEl.textContent = siteTitle;
  titleEl.style.fontWeight = "bold";
  titleEl.style.fontSize = "1.2rem";
  navEl.appendChild(titleEl);

  // Right‐side: links
  const linksContainer = document.createElement("div");
  items.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.id;
    link.textContent = item.label;
    link.style.color = "#fff";
    link.style.marginLeft = "1rem";
    link.style.textDecoration = "none";
    link.style.fontSize = "1rem";
    link.addEventListener("mouseenter", () => {
      link.style.opacity = "0.7";
    });
    link.addEventListener("mouseleave", () => {
      link.style.opacity = "1";
    });
    linksContainer.appendChild(link);
  });
  navEl.appendChild(linksContainer);

  container.appendChild(navEl);
}

export function setupViewHandler() {
  // (Optional) Add logic to highlight the “active” link,
  // or toggle a mobile‐menu, etc. For now, it’s just a stub.
  console.log("nav.js: setupViewHandler()");
}
