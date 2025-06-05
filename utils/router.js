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
    "/": { template: "/templates/index.html", module: "/src/test.js", title: "", description: "" },
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
    const location = window.location.pathname;
    if ( location.length == 0) {
        location = '/';
    }

    const route = routes[ location ] || routes[404];
    const html = await fetch( route.template ).then( (response) => 
    response.text() );

    document.getElementById('content').innerHTML = html;

     // Dynamically import associated module
    if (route.module) {
        try {
        const module = await import(route.module);
        if (module.init) module.init(); // Call init if exported
        } catch (err) {
        console.error(`Failed to load module for ${location}:`, err);
        }
    }
};

window.onpopstate = locationHandler;
window.route = route;

locationHandler();