const title = 'Orbital Defense Corps'
const subtitle = 'The Journal of Military Sicence Fiction'
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
  }
]

document.addEventListener('DOMContentLoaded', () => {
  // Update the footer year automatically
  document.getElementById('year').textContent = new Date().getFullYear();

  // Article Cards
  const section = document.getElementById('articles');
 
  articleList.forEach(article => {
    let node = document.createElement('article');
    node.className = 'card';
    node.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <p><a href="${article.link}">read more...</a></p>
    `;
    section.appendChild(node);
    console.log(`${article.title}`);
  });
});

// Head Tag
document.getElementsByName('head').innerHTML = `
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>Orbital Defense Corps | The Journal of Military Science Fiction</title>
  <meta name="description" content="Orbital Defense Corps delivers weekly doctrine drops, tech briefs, after‑action reports, and battle‑tested reviews for military‑SF fans.">

  <link rel="canonical" href="https://orbitaldefensecorps.com/">

  <!-- Open Graph / Twitter -->
  <meta property="og:type"        content="website">
  <meta property="og:title"       content="Orbital Defense Corps">
  <meta property="og:description" content="Weekly briefings for military science‑fiction aficionados.">
  <meta property="og:url"         content="https://orbitaldefensecorps.com/">
  <meta property="og:image"       content="https://orbitaldefensecorps.com/og-card.jpg">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@OrbitalDefense">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Russo+One&family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=home" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=orbit" />  
  <link rel="stylesheet" href="style.css">
`;

// Navbar
document.getElementById('nav').innerHTML = `
  <nav>
    <div>
        <h2>${title}</h2>
        <h3><em>${subtitle}</em></h3>
    </div>
    <div>
      <a href="/"><span class="material-symbols-outlined">home</span></a>  
      <a href="/map.html"><span class="material-symbols-outlined">orbit</span></a>
    </div>
  </nav>
`;

