// Update the footer year automatically
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
});

document.getElementById('nav').innerHTML = `
    <nav>
      <div>
          <h2>Orbital Defense Corps</h2>
          <h3><em>The Journal of Military Science Fiction</em></h3>
      </div>
      <div>
        <a href="/">HOME</a>  
        <a href="/map.html">MAP</a>
      </div>
    </nav>
`;
