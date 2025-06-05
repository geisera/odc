export function buildFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <p>&copy; <span id="year"></span> <a href="https://orbitaldefensecorps.com" class="brand">Orbital Defense Corps.</a> · A publication of the Terran Imperium War College · All frequencies monitored</p>
  `;
  document.body.appendChild(footer);

  // Set the current year
  document.getElementById('year').textContent = new Date().getFullYear();
}
