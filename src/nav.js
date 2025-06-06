import { setViewType } from './state.js';

console.log('nav-js: EXECUTED!')

export function buildNav(title, views) {
  const nav = document.createElement('nav');

  const left = document.createElement('div');
  const heading = document.createElement('h2');
  heading.textContent = title;
  left.appendChild(heading);

  const right = document.createElement('div');
  views.forEach(view => {
    const link = document.createElement('a');
    link.href = `#${view.id}`;
    link.dataset.view = view.id;
    link.textContent = view.label;
    right.appendChild(link);
  });

  nav.appendChild(left);
  nav.appendChild(right);

  document.getElementById('nav').appendChild(nav);
}

export function setupViewHandler() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[data-view]');
    if (!link) return;

    e.preventDefault();
    const viewType = link.dataset.view;
    setViewType(viewType);

    document.querySelectorAll('.view').forEach(view => {
      view.style.display = view.id === viewType ? 'block' : 'none';
    });
  });
}
