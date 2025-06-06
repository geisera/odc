// js/app.js

import { routes } from "./routes.js";

// ─── Tiny templating function ({{key}} → data[key]) ───
function renderTemplate(templateStr, data = {}) {
  return templateStr.replace(/{{\s*(\w+)\s*}}/g, (match, p1) => {
    return data[p1] ?? "";
  });
}

// ─── Helper: change URL (pushState) + call router() ───
function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

// ─── The router itself ───
async function router() {
  const potentialPath = window.location.pathname;
  const route = routes[potentialPath] || null;

  if (!route) {
    // If no matching route → fetch + render 404
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

  // 2) Render with data (replaces all {{…}} tokens)
  const rendered = renderTemplate(templateHtml, route.data);
  document.querySelector("#app").innerHTML = rendered;

  // 3) If this route has a viewScript, dynamically import it and call init()
  if (route.viewScript) {
    try {
      const module = await import(`./${route.viewScript}`);
      if (module.init) {
        module.init();
      }
    } catch (err) {
      console.error(`Failed to load viewScript ${route.viewScript}:`, err);
    }
  }
}

// ─── Initial setup on first load ───
window.addEventListener("DOMContentLoaded", () => {
  // 1) Delegate clicks on <a data-link> to client‐side router
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  // 2) Handle back/forward in browser
  window.addEventListener("popstate", router);

  // 3) First‐time render
  router();
});
