/**
 * insertArticles():
 *   • Finds #articles-container
 *   • Populates it with some placeholder “news items”
 */

export function insertArticles() {
  const container = document.getElementById("articles-container");
  if (!container) return;

  const sampleArticles = [
    {
      title: "Federation Fleet Completes Deep Space Patrol",
      date: "June 5, 2025",
      summary: "The USS Horizon returned from a six‐month survey of the Gamma sector…",
    },
    {
      title: "Quantum Slipstream Drive Tests in Sector 7G",
      date: "June 3, 2025",
      summary: "Engineers aboard the Taranis II claim a stable 0.85 c slipstream…",
    },
  ];

  sampleArticles.forEach((art) => {
    const wrapper = document.createElement("div");
    wrapper.style.borderBottom = "1px solid #ccc";
    wrapper.style.padding = "0.75rem 0";

    const h3 = document.createElement("h3");
    h3.textContent = art.title;
    h3.style.margin = "0";
    wrapper.appendChild(h3);

    const dateEl = document.createElement("small");
    dateEl.textContent = art.date;
    dateEl.style.display = "block";
    dateEl.style.color = "#666";
    dateEl.style.marginBottom = "0.5rem";
    wrapper.appendChild(dateEl);

    const p = document.createElement("p");
    p.textContent = art.summary;
    wrapper.appendChild(p);

    container.appendChild(wrapper);
  });
}
