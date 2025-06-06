export const routes = {
  "/": {
    template: "templates/template.html",
    data: {
      title: "HOME",
      heading: "Home",
      content: "<b><em>Welcome</em></b> to our vanilla-JS boilerplate app! This is a simple single-page app built with plain HTML, CSS, and JavaScript. No frameworks.",
    },
  },
  "/about": {
    template: "templates/template.html",
    data: {
      title: "About",
      content:
        "This is a simple single-page app built with plain HTML, CSS, and JavaScript. No frameworks.",
    },
  },
   "/test": {
    template: "templates/template.html",
    data: {
      title: "Test",
      content:
        "This is a simple single-page app built with plain HTML, CSS, and JavaScript. No frameworks.",
    },
  },
  "/map": {
    template: "templates/map.html",
    data: {
      title: "Star Map",
      content:
        "Star Map...",
    },
    viewScript: "js/galaxy.js"
  },
};
