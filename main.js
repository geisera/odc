const title = 'Orbital Defense Corps';
const subtitle = 'The Journal of Military Sicence Fiction';
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
];
let viewType;

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

/*--------------/ Header and Navbar /--------------*/
document.getElementById('nav').innerHTML = `
  <nav>
    <div>
        <h2>${title}</h2>
    </div>
    <div>
      <a href="#star-map" data-view="map-view" onclick="viewHandler(this)">Star Map</a>
      <a href="#news" data-view="news-view" onclick="viewHandler(this)">News</a>
    </div>
  </nav>
`;

/*--------------/ View handler /--------------*/
function viewHandler(event){

  viewType = event.getAttribute("data-view");
  
  let views = document.querySelectorAll('.view');
  views.forEach((view) => {
    view.style.display = "none"
  })

  for(let i = 0; i < views.length; i++){
    if( views[i].id === viewType){
      views[i].style.display = "block";
    }
    
  }
}