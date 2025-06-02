const title = 'Orbital Defense Corps'
const subtitle = 'The Journal of Military Sicence Fiction'

document.addEventListener('DOMContentLoaded', () => {
  // Update the footer year automatically
  document.getElementById('year').textContent = new Date().getFullYear();

  // Navbar
  document.getElementById('nav').innerHTML = `
    <nav>
      <div>
          <h2>${title}</h2>
          <h3><em>${subtitle}</em></h3>
      </div>
      <div>
        <a href="/">HOME</a>  
        <a href="/map.html">MAP</a>
      </div>
    </nav>
`;
});


