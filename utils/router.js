console.log('URL router called!');

document.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('nav a')) {
        return;
    }
    event.preventDefault();
    route(event);
});

const routes = {
    404: { template: "/templates/404.html", title: "", description: "" },
    "/": { template: "/templates/index.html", title: "", description: "" },
    "/about": { template: "/templates/about.html", title: "", description: "" },
    "/contact": { template: "/templates/contact.html", title: "", description: "" }
};

const route = (event) => {
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    locationHandler();
};

const locationHandler = async () => {
    let location = window.location.pathname;
    if (location.length === 0) location = "/";

    const route = routes[location] || routes[404];
    const html = await fetch(route.template).then((res) => res.text());

    injectHTMLWithScripts('content', html);
};

function injectHTMLWithScripts(containerId, html) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const temp = document.createElement('div');
    temp.innerHTML = html;

    [...temp.childNodes].forEach((node) => {
        if (node.tagName === 'SCRIPT') {
            const newScript = document.createElement('script');
            if (node.src) {
                newScript.src = node.src;
            } else {
                newScript.textContent = node.textContent;
            }
            newScript.type = node.type || 'text/javascript';
            document.body.appendChild(newScript);
        } else {
            container.appendChild(node);
        }
    });
}

window.onpopstate = locationHandler;
window.route = route;

locationHandler();
