import { routes } from "./routes.js";

  // ── Load overlay image ─────────────────────────────────────
  // Put your transparent PNG at /images/overlay.png (or adjust path)
  const overlayImg = new Image();
  overlayImg.src = "/images/overlay.png";
  overlayImg.id = "star-overlay";

// a very basic templating function

// Replaces occurrences of {{key}} in `templateStr` with data[key].
function renderTemplate(templateStr, data = {}) {
  return templateStr.replace(/{{\s*(\w+)\s*}}/g, (match, p1) => {
    return data[p1] ?? "";
  });
}

// ─── NAVIGATE TO A NEW URL ───
function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

// ─── ROUTER FUNCTION ───
async function router() {
  const potentialPath = window.location.pathname;
  const route = routes[potentialPath] || null;

  if (!route) {
    // Load 404 template if route not found
    const html404 = await fetch("templates/404.html").then((res) => res.text());
    document.querySelector("#app").innerHTML = html404;
    return;
  }

  // 1) Fetch the HTML fragment for this route
  let templateHtml = "";
  try {
    templateHtml = await fetch(route.template).then((res) => res.text());
  } catch (err) {
    console.error(`Error fetching ${route.template}:`, err);
    document.querySelector("#app").innerHTML =
      "<h1>Error loading view</h1><p>Could not retrieve template.</p>";
    return;
  }

  // 2) Render with the data object
  const rendered = renderTemplate(templateHtml, route.data);
  document.querySelector("#app").innerHTML = rendered;

  // 3) If this route has a viewScript, dynamically import it and call init()
  if (route.viewScript) {
    try {
      const module = await import(`/${route.viewScript}`);
      if (module.init) {
        module.init();
      } else {
        console.warn(
          `Route ${potentialPath} specified viewScript="${route.viewScript}" but it has no init() export.`
        );
      }
    } catch (err) {
      console.error(`Failed to load viewScript ${route.viewScript}:`, err);
    }
  }
}

// ─── INITIAL SETUP ───
window.addEventListener("DOMContentLoaded", () => {
  // 1) Intercept all <a data-link> clicks
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  // 2) Handle browser “back/forward” buttons
  window.addEventListener("popstate", router);

  // 3) Initial routing
  router();
});
