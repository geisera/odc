// src/articles.js

const articleList = [
  {
    title: 'Latest Doctrine',
    description: 'How rotating fortress‑stations tore up orbital warfare playbooks.',
    link: '/article'
  },
  {
    title: 'Tech Brief',
    description: 'Rail‑cannons vs lasers: cost, power, and reload times in deep‑space engagements.',
    link: '/article'
  },
  {
    title: 'After Action Report',
    description: 'Lessons from the simulated Siege of Tanhauser Gate, why timing an EMP strike still matters.',
    link: '/article'
  },
    {
    title: 'Latest Doctrine',
    description: 'How rotating fortress‑stations tore up orbital warfare playbooks.',
    link: '/article'
  },
  {
    title: 'Tech Brief',
    description: 'Rail‑cannons vs lasers: cost, power, and reload times in deep‑space engagements.',
    link: '/article'
  },
  {
    title: 'After Action Report',
    description: 'Lessons from the simulated Siege of Tanhauser Gate, why timing an EMP strike still matters.',
    link: '/article'
  },
    {
    title: 'Latest Doctrine',
    description: 'How rotating fortress‑stations tore up orbital warfare playbooks.',
    link: '/article'
  },
  {
    title: 'Tech Brief',
    description: 'Rail‑cannons vs lasers: cost, power, and reload times in deep‑space engagements.',
    link: '/article'
  },
  {
    title: 'After Action Report',
    description: 'Lessons from the simulated Siege of Tanhauser Gate, why timing an EMP strike still matters.',
    link: '/article'
  },
    {
    title: 'Latest Doctrine',
    description: 'How rotating fortress‑stations tore up orbital warfare playbooks.',
    link: '/article'
  },
  {
    title: 'Tech Brief',
    description: 'Rail‑cannons vs lasers: cost, power, and reload times in deep‑space engagements.',
    link: '/article'
  },
  {
    title: 'After Action Report',
    description: 'Lessons from the simulated Siege of Tanhauser Gate, why timing an EMP strike still matters.',
    link: '/article'
  },
    {
    title: 'Latest Doctrine',
    description: 'How rotating fortress‑stations tore up orbital warfare playbooks.',
    link: '/article'
  },
  {
    title: 'Tech Brief',
    description: 'Rail‑cannons vs lasers: cost, power, and reload times in deep‑space engagements.',
    link: '/article'
  },
  {
    title: 'After Action Report',
    description: 'Lessons from the simulated Siege of Tanhauser Gate, why timing an EMP strike still matters.',
    link: '/article'
  },
    {
    title: 'Latest Doctrine',
    description: 'How rotating fortress‑stations tore up orbital warfare playbooks.',
    link: '/article'
  },
  {
    title: 'Tech Brief',
    description: 'Rail‑cannons vs lasers: cost, power, and reload times in deep‑space engagements.',
    link: '/article'
  },
  {
    title: 'After Action Report',
    description: 'Lessons from the simulated Siege of Tanhauser Gate, why timing an EMP strike still matters.',
    link: '/article'
  },
    {
    title: 'Latest Doctrine',
    description: 'How rotating fortress‑stations tore up orbital warfare playbooks.',
    link: '/article'
  },
  {
    title: 'Tech Brief',
    description: 'Rail‑cannons vs lasers: cost, power, and reload times in deep‑space engagements.',
    link: '/article'
  },
  {
    title: 'After Action Report',
    description: 'Lessons from the simulated Siege of Tanhauser Gate, why timing an EMP strike still matters.',
    link: '/article'
  },
    {
    title: 'Latest Doctrine',
    description: 'How rotating fortress‑stations tore up orbital warfare playbooks.',
    link: '/article'
  },
  {
    title: 'Tech Brief',
    description: 'Rail‑cannons vs lasers: cost, power, and reload times in deep‑space engagements.',
    link: '/article'
  },
  {
    title: 'After Action Report',
    description: 'Lessons from the simulated Siege of Tanhauser Gate, why timing an EMP strike still matters.',
    link: '/article'
  }
];

export function insertArticles(containerId = 'articles') {
  const container = document.getElementById(containerId);
  if (!container) return;

  articleList.forEach(article => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      <p><a href="${article.link}" class="brand">read more...</a></p>
    `;
    container.appendChild(card);
  });
}
