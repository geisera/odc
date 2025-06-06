/**
 * setViewType(viewName):
 *   • Just stores the current view (e.g. “news-view” or “map-view”) in some global
 *     or in sessionStorage, so that other modules can read it.
 */

export function setViewType(viewName) {
  window.__CURRENT_VIEW = viewName;
  console.log(`state.js: current view set to '${viewName}'`);
}
