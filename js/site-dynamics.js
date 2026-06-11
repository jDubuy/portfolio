document.addEventListener("DOMContentLoaded", () => {
  /* ── Reveal animation on scroll ────────────────── */
  const revealTargets = document.querySelectorAll(
    "main section, .project-card, .entreprise-card, .about_perso, .timeline-mode section, .contact__block, .qa-card"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealTargets.forEach((el) => observer.observe(el));

  /* ── Blob parallax ──────────────────────────────── */
  const blob = document.querySelector(".blob");
  if (blob) {
    document.addEventListener("mousemove", (event) => {
      const offsetX = (event.clientX / window.innerWidth - 0.5) * 14;
      const offsetY = (event.clientY / window.innerHeight - 0.5) * 14;
      blob.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  }

  /* ── Search & Filter ────────────────────────────── */
  // Collect ALL project sections (new multi-section layout)
  const allProjectSections = Array.from(document.querySelectorAll("section.projects-section"));
  if (!allProjectSections.length) return;

  // Collect all cards from all sections
  const cards = Array.from(
    document.querySelectorAll(".projects-section .project-card, .projects-section .entreprise-card")
  );
  if (!cards.length) return;

  const isEN = document.documentElement.lang === "en";
  const i18n = isEN
    ? {
        placeholder: "Search a project, a tech, a skill...",
        all: "All cards",
        entreprise: "Industry experience",
        informatique: "IT projects",
        statistique: "Statistical projects",
        autre: "Other projects",
        results: (n) => `${n} project(s) displayed`,
      }
    : {
        placeholder: "Rechercher un projet, une techno, une compétence...",
        all: "Toutes les cartes",
        entreprise: "Expérience entreprise",
        informatique: "Projets informatiques",
        statistique: "Projets statistiques",
        autre: "Autres projets",
        results: (n) => `${n} projet(s) affiché(s)`,
      };

  // Build controls bar and inject it before the first section
  const firstSection = allProjectSections[0];
  const controls = document.createElement("div");
  controls.className = "projects-controls";
  controls.innerHTML = `
    <input type="search" class="projects-search" placeholder="${i18n.placeholder}" />
    <select class="projects-filter">
      <option value="all">${i18n.all}</option>
      <option value="entreprise">${i18n.entreprise}</option>
      <option value="informatique">${i18n.informatique}</option>
      <option value="statistique">${i18n.statistique}</option>
      <option value="autre">${i18n.autre}</option>
    </select>
    <p class="projects-results" aria-live="polite"></p>
  `;
  firstSection.parentNode.insertBefore(controls, firstSection);

  const searchInput = controls.querySelector(".projects-search");
  const filterSelect = controls.querySelector(".projects-filter");
  const results = controls.querySelector(".projects-results");

  // Tag each card with type & search text
  cards.forEach((card) => {
    const title = card.querySelector("h3")?.textContent?.toLowerCase() || "";
    // Determine type from the parent section's aria-label
    const parentSection = card.closest("section[aria-label]");
    const sectionLabel = parentSection?.getAttribute("aria-label")?.toLowerCase() || "";
    const cardText = card.textContent?.toLowerCase() || "";

    let type = "autre";
    if (sectionLabel.includes("entreprise") || sectionLabel.includes("industry")) type = "entreprise";
    else if (sectionLabel.includes("informati") || sectionLabel.includes("it project")) type = "informatique";
    else if (sectionLabel.includes("statisti")) type = "statistique";

    card.dataset.search = `${title} ${sectionLabel} ${cardText}`;
    card.dataset.type = type;
  });

  const applyFilters = () => {
    const query = searchInput.value.trim().toLowerCase();
    const selectedType = filterSelect.value;
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesQuery = !query || card.dataset.search.includes(query);
      const matchesType = selectedType === "all" || card.dataset.type === selectedType;
      const show = matchesQuery && matchesType;
      card.style.display = show ? "" : "none";
      if (show) visibleCount += 1;
    });

    // Hide entire section if all its cards are hidden
    allProjectSections.forEach((section) => {
      const sectionCards = section.querySelectorAll(".project-card, .entreprise-card");
      const hasVisible = Array.from(sectionCards).some((c) => c.style.display !== "none");
      section.style.display = hasVisible ? "" : "none";
    });

    results.textContent = i18n.results(visibleCount);
  };

  searchInput.addEventListener("input", applyFilters);
  filterSelect.addEventListener("change", applyFilters);
  applyFilters();
});
