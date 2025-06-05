import { insertArticles } from '../articles.js';
import { initGalaxy } from './galaxy.js';
import { log } from './utils.js';
import { buildNav, setupViewHandler } from './nav.js';
import { buildFooter } from './footer.js';
import { setViewType } from './state.js';

setViewType('news-view'); 

document.addEventListener('DOMContentLoaded', () => {
  insertArticles();
  initGalaxy();
  log('Galaxy initialized');
  buildFooter();

  buildNav('Orbital Defense Corps', [
    { id: 'map-view', label: 'Star Map' },
    { id: 'news-view', label: 'News' }
  ]);

  setupViewHandler();
});
