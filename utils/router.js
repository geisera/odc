// utils/router.js
console.log('URL router called!');

document.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('nav a')) return;
  event.preventDefault();
  route(event);
});

const routes = {
  "/": {
    template: "/templates/index.html",
    module:   "/src/index.js",   // ← point at the new index.js
    title:    "",
    description: ""
  },
  404: {
    template: "/templates/404.html",
    module:   null,
    title:    "Not Found",
    description: "Page not found."
  }
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
  const html = await fetch(routeConfig.template).then(r => r.text());

  document.getElementById('content').innerHTML = html;

  if (routeConfig.module) {
    try {
      const module = await import(routeConfig.module);
      if (module.init) module.init();
    } catch (err) {
      console.error(`Failed to load module for ${loc}:`, err);
    }
  }
};

window.onpopstate = locationHandler;
window.route      = route;

locationHandler();  // initial page‐load render
