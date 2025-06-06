/**
 * URL router: on initial page load (and on popstate), it:
 *   1) fetches the appropriate template HTML
 *   2) does innerHTML = fetchedHTML
 *   3) dynamically imports the associated module and calls its init()
 */

console.log("router.js: starting up");

document.addEventListener("click", (event) => {
  // Only intercept clicks on <a> inside a <nav>
  const { target } = event;
  if (!target.matches("nav a")) return;
  event.preventDefault();
  route(event);
});

const routes = {
  "/": {
    template: "/templates/index.html",
    module: "/src/index.js",
  },
  // you can add more routes here, e.g.:
  // "/map": { template: "/templates/map.html", module: "/src/map.js" }
  404: {
    template: "/templates/404.html",
    module: null,
  },
};

const route = (event) => {
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  locationHandler();
};

const locationHandler = async () => {
  let loc = window.location.pathname;
  if (!loc || loc === "") loc = "/";

  const routeConfig = routes[loc] || routes[404];
  try {
    const html = await fetch(routeConfig.template).then((r) => r.text());
    document.getElementById("content").innerHTML = html;
  } catch (err) {
    console.error(`Failed to fetch template for ${loc}:`, err);
    return;
  }

  if (routeConfig.module) {
    try {
      const mod = await import(routeConfig.module);
      if (mod.init) {
        mod.init();
      }
    } catch (err) {
      console.error(`Failed to load module for ${loc}:`, err);
    }
  }
};

window.onpopstate = locationHandler;
window.route = route;

// Initial render
locationHandler();
