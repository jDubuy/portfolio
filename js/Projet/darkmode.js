document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle-darkmode');
  const icon = document.getElementById('theme-icon');
  const body = document.body;

  // Appliquer le thème stocké
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    icon.src = icon.src.replace('lune.png', 'soleil.png');
    icon.alt = 'Icône mode clair';
  }

  toggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    if (isDark) {
      icon.src = icon.src.replace('lune.png', 'soleil.png');
    } else {
      icon.src = icon.src.replace('soleil.png', 'lune.png');
    }
    icon.alt = isDark ? 'Icône mode clair' : 'Icône mode sombre';
  });
});
