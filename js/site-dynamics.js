document.addEventListener("DOMContentLoaded", () => {
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
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));

  const blob = document.querySelector(".blob");
  if (blob) {
    document.addEventListener("mousemove", (event) => {
      const offsetX = (event.clientX / window.innerWidth - 0.5) * 14;
      const offsetY = (event.clientY / window.innerHeight - 0.5) * 14;
      blob.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  }

  const projectsSection = document.querySelector(".projects-section");
  if (!projectsSection) return;

  const cards = Array.from(
    projectsSection.querySelectorAll(".project-card, .entreprise-card")
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

  const projectsHead = projectsSection.querySelector(".projects-head");
  if (projectsHead && projectsHead.nextSibling) {
    projectsSection.insertBefore(controls, projectsHead.nextSibling);
  } else {
    projectsSection.insertBefore(controls, projectsSection.querySelector(".entreprise-column"));
  }

  const searchInput = controls.querySelector(".projects-search");
  const filterSelect = controls.querySelector(".projects-filter");
  const results = controls.querySelector(".projects-results");

  cards.forEach((card) => {
    const title = card.querySelector("h3")?.textContent?.toLowerCase() || "";
    const parentBlock = card.closest(".projects-column");
    const blockTitle = parentBlock?.querySelector(".column-title")?.textContent?.toLowerCase() || "";
    const cardText = card.textContent?.toLowerCase() || "";
    let type = "autre";

    if (blockTitle.includes("entreprise") || blockTitle.includes("industry")) type = "entreprise";
    else if (blockTitle.includes("informati") || blockTitle.includes("it project")) type = "informatique";
    else if (blockTitle.includes("statisti")) type = "statistique";

    card.dataset.search = `${title} ${blockTitle} ${cardText}`;
    card.dataset.type = type;
  });

  // Tous les blocs parents qui contiennent des cartes
  const sectionBlocks = Array.from(
    projectsSection.querySelectorAll(".projects-column, .projects-column-full")
  );

  const applyFilters = () => {
    const query = searchInput.value.trim().toLowerCase();
    const selectedType = filterSelect.value;
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesQuery = card.dataset.search.includes(query);
      const matchesType =
        selectedType === "all" || card.dataset.type === selectedType;

      const show = matchesQuery && matchesType;
      card.style.display = show ? "" : "none";
      if (show) visibleCount += 1;
    });

    // Masquer les blocs de section dont toutes les cartes sont cachées
    sectionBlocks.forEach((block) => {
      const blockCards = block.querySelectorAll(".project-card, .entreprise-card");
      const hasVisible = Array.from(blockCards).some((c) => c.style.display !== "none");
      block.style.display = hasVisible ? "" : "none";
    });

    // Masquer aussi le wrapper .projects-columns s'il est vide
    const columnsWrapper = projectsSection.querySelector(".projects-columns");
    if (columnsWrapper) {
      const hasVisibleColumn = Array.from(
        columnsWrapper.querySelectorAll(".projects-column")
      ).some((col) => col.style.display !== "none");
      columnsWrapper.style.display = hasVisibleColumn ? "" : "none";
    }

    results.textContent = i18n.results(visibleCount);
  };

  searchInput.addEventListener("input", applyFilters);
  filterSelect.addEventListener("change", applyFilters);
  applyFilters();
});
