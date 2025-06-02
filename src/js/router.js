const constructionRoutes = {
  'home': { html: 'src/pages/main.html' },
  '404': { html: 'src/pages/404.html' },
  'under-construction': { html: 'src/pages/under-construction.html', js: 'src/js/under-construction.js' },
  'productivity': { html: 'src/pages/productivity.html', js: 'src/js/productivity.js' },
};

const underConstructionRoutes = {
  'ai': constructionRoutes['under-construction'],
  'pomodoro': constructionRoutes['under-construction'],
  'analytics': constructionRoutes['under-construction'],
  'archievemets': constructionRoutes['under-construction'],
  'forms': constructionRoutes['under-construction'],
  'designer': constructionRoutes['under-construction'],
  'modals_&_ovelays': constructionRoutes['under-construction'],
  'extra_components': constructionRoutes['under-construction'],
  'charts': constructionRoutes['under-construction'],
  'tables_&_data': constructionRoutes['under-construction'],
  'auth': constructionRoutes['under-construction'],
};

const routes = { ...constructionRoutes, ...underConstructionRoutes };

function setSectionActive(section) {
  const url = new URL(window.location.href);
  url.searchParams.set('section', section);
  console.log('url', section);
  history.replaceState({}, '', url);
}

async function loadRoute(hash) {

  if (!routes[hash]) {
    return window.location.href = 'src/pages/404.html'
  }

  const route = routes[hash];
  setSectionActive(hash);

  const res = await fetch(route.html)
    .then(res => res.ok ? res : window.location.href = './404.html');

  const html = await res.text();

  document.getElementById('app').innerHTML = html;

  if (route.js) {
    console.log('Cargando script:', route.js);
    const module = await import(`/${route.js}?t=${Date.now()}`);
    if (module.init) module.init();
  }

  let footer = document.createElement('footer');
  footer.innerHTML = `
    <footer class="main-footer">
        <p class="body-large">Creado y desarrollado por Gabriel Useche + 🤖 <br/> &copy; 2025 QA Labs.</p>
    </footer>
  `
  document.getElementById('app').appendChild(footer)

}

window.addEventListener('DOMContentLoaded', loadRoute('home'));

