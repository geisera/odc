// src/index.js
import { insertArticles } from './articles.js';
import { initGalaxy }      from './galaxy.js';
import { log }             from './utils.js';
import { buildNav, setupViewHandler } from './nav.js';
import { buildFooter }     from './footer.js';
import { setViewType }     from './state.js';

export function init() {
  console.log('index.js init() running…');

  // (1) Tell your state which “view” this is
  setViewType('news-view');

  // (2) Build the navigation bar 
  buildNav('Orbital Defense Corps', [
    { id: 'map-view',   label: 'Star Map' },
    { id: 'news-view',  label: 'News' }
  ]);

  // (3) Insert the news articles into the newly‐inserted HTML
  insertArticles();

  // (4) Kick off the galaxy canvas if that exists on this view
  initGalaxy();
  log('Galaxy initialized');

  // (5) Build the footer 
  buildFooter();

  // (6) Wire up any “view toggle” handlers after injection
  setupViewHandler();
}
