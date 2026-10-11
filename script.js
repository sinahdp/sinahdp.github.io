(function () {
  const stage = document.getElementById('stage');
  const panels = [...document.querySelectorAll('.panel')];
  const links = [...document.querySelectorAll('.menu a')];
  const ind = document.querySelector('.ind');
  const names = panels.map(p => p.dataset.panel);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = -1;

  function moveIndicator(animate) {
    const a = links[current];
    if (!a) return;
    if (!animate) ind.classList.remove('ready');
    ind.style.width = a.offsetWidth + 'px';
    ind.style.height = a.offsetHeight + 'px';
    ind.style.transform = `translate(${a.offsetLeft}px, ${a.offsetTop}px)`;
    if (!animate) requestAnimationFrame(() => requestAnimationFrame(() => ind.classList.add('ready')));
  }

  function route() {
    const key = (location.hash.replace(/^#\/?/, '') || 'overview').split('/')[0];
    const next = Math.max(0, names.indexOf(key));
    const first = current === -1;
    const dir = next >= current ? 1 : -1;
    panels.forEach((p, i) => {
      p.style.setProperty('--dx', (reduce ? 0 : dir * 28) + 'px');
      p.hidden = i !== next;
    });
    links.forEach((a, i) => {
      a.classList.toggle('active', i === next);
      i === next ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
    });
    current = next;
    moveIndicator(!first);
    document.title = next === 0 ? 'Mohammad Sina Heidaripour' : panels[next].dataset.title + ' — M. Sina Heidaripour';
    stage.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  window.addEventListener('resize', () => moveIndicator(false));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveIndicator(false));
  route();

  // Project filters
  const chips = [...document.querySelectorAll('.chip')];
  const cards = [...document.querySelectorAll('.project')];
  chips.forEach(chip => chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    chips.forEach(c => c.classList.toggle('on', c === chip));
    cards.forEach(c => { c.hidden = f !== 'all' && !c.dataset.cat.split(' ').includes(f); });
  }));

  document.getElementById('year').textContent = new Date().getFullYear();
})();
