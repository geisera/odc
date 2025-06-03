const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href)
    handleLocation();
    console.log(event.target.href);
}

const routes = {
    404: "404.html",
    "/map" : "/map0.html"
}

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById('test').innerHTML = html;
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();