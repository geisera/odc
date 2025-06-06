/**
 * This module is “mounted” whenever the “/” route is loaded.
 * Export a single init() that:
 *   • sets the view type
 *   • builds navigation into #nav
 *   • inserts articles into #articles-container
 *   • initializes the galaxy canvas (if any)
 *   • logs a message
 *   • builds a footer
 *   • hooks up any view‐switching logic
 */

import { insertArticles } from "./articles.js";
import { initGalaxy } from "./galaxy.js";
import { log } from "./utils.js";
import { buildNav, setupViewHandler } from "./nav.js";
import { buildFooter } from "./footer.js";
import { setViewType } from "./state.js";

export function init() {
  console.log("index.js: init() called for /");

  // 1) Let state.js know we’re on “news-view”
  setViewType("news-view");

  // 2) Build <nav> into <div id="nav"></div>
  buildNav("Orbital Defense Corps", [
    { id: "/", label: "News" },
    { id: "/map", label: "Star Map" },
  ]);

  // 3) Fill #articles-container inside templates/index.html
  insertArticles();

  // 4) Initialize the galaxy canvas (if there is one on this view)
  initGalaxy();
  log("Galaxy initialized");

  // 5) Build the footer
  buildFooter();

  // 6) Hook up any “view change” logic if needed
  setupViewHandler();
}
