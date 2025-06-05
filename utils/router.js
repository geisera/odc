console.log('URL router called!');
document.addEventListener('click', (event) => {
    const { target } = event;
    if ( !target.matches('nav a') ) {
        return;
    };
    event.preventDefault();
    route(event);
});

const routes = {
    404: { template: "/templates/404.html", title: "", description: "" },
    "/": { template: "/templates/index.html", module: ["/src/test.js"], title: "", description: "" },
    "/about": { template: "/templates/about.html", title: "", description: "" },
    "/contact": { template: "/templates/contact.html", title: "", description: "" }
}

const route = (event) => {
    event = event;
    event.preventDefault();
    window.history.pushState( {}, "", event.target.href );
    locationHandler();
}

const locationHandler = async () => {
  let location = window.location.pathname;
  if (location === "") location = "/";

  const route = routes[location] || routes[404];

  const html = await fetch(route.template).then(res => res.text());
  document.getElementById("content").innerHTML = html;

  // Dynamically import all route-specific modules
  if (route.modules && route.modules.length) {
    for (const modulePath of route.modules) {
      try {
        const module = await import(modulePath);
        if (typeof module.init === "function") {
          module.init(); // convention: each module optionally exports an init() function
        }
      } catch (err) {
        console.error(`Error loading module: ${modulePath}`, err);
      }
    }
  }
};


window.onpopstate = locationHandler;
window.route = route;

locationHandler();