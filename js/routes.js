export const routes = {
  "/": {
    template: "templates/template.html",
    data: {
      title: "HOME",
      heading: "Home",
      content: `
      <p>Under the blazing light of Sol, we stand as humanity’s shield—unyielding, unwavering, unbeatable.<p>
       <h1>Sol Defense Corps</h1>
        <p>
            Under the blazing light of Sol, we stand as humanity’s shield—unyielding, unwavering, unbeatable.
        </p>

        <h2>Our Mission</h2>
        <p>
            To hunt down threats, seize victory before the enemy can strike, and guarantee peace for every world under our watch.
        </p>

        <h2>Core Values</h2>
        <ul>
            <li><strong>Vigilance</strong>: Our eyes pierce the void—no danger goes unseen.</li>
            <li><strong>Integrity</strong>: We fight with honor; we triumph with honor.</li>
            <li><strong>Innovation</strong>: Tomorrow’s weapons, today’s victories.</li>
            <li><strong>Solidarity</strong>: One corps, one cause—united we conquer.</li>
            <li><strong>Excellence</strong>: Good is not enough; we deliver perfection.</li>
        </ul>

        <p>
            Enlist. Advance. Dominate. <em>For Sol, for humanity, for victory!!!!!</em>
        </p>`,
    },
  },
  "/about": {
    template: "templates/template.html",
    data: {
      title: "About",
      content:
        "This is a simple single-page app built with plain HTML, CSS, and JavaScript. No frameworks.",
    },
  },
   "/test": {
    template: "templates/template.html",
    data: {
      title: "Test",
      content:
        "This is a simple single-page app built with plain HTML, CSS, and JavaScript. No frameworks.",
    },
  },
  "/map": {
    template: "templates/map.html",
    data: {
      title: "STAR MAP",
      content:
        "Star Map...",
    },
    viewScript: "js/galaxy.js"
  },
};
