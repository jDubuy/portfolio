document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle-darkmode');
  const icon = document.getElementById('theme-icon');
  const body = document.body;

  // Appliquer le thème stocké
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    icon.src = '../asset/png/soleil.png';
    icon.alt = 'Icône mode clair';
  }

  toggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    icon.src = isDark ? '../asset/png/soleil.png' : '../asset/png/lune.png';
    icon.alt = isDark ? 'Icône mode clair' : 'Icône mode sombre';
  });
});
