document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('mainNav');
  const upAnchor = document.querySelector('.upAnchor');

  // --- Menú móvil ---
  function closeMenu() {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // --- Header con sombra y botón "volver arriba" al hacer scroll ---
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 10);
    if (upAnchor) upAnchor.classList.toggle('visible', y > 600);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Enlace activo del menú según la sección visible ---
  const navLinks = nav ? nav.querySelectorAll('.nav-link') : [];
  const sections = Array.from(navLinks)
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { sectionObserver.observe(s); });

    // --- Animaciones de entrada ---
    const revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in-view'); });
  }

  // --- Lightbox de la galería ---
  const lightbox = document.getElementById('lightbox');
  const items = Array.from(document.querySelectorAll('[data-lightbox="sala-gallery"]'));
  if (lightbox && items.length) {
    const img = lightbox.querySelector('img');
    const caption = lightbox.querySelector('figcaption');
    let current = 0;
    let lastFocus = null;

    function show(i) {
      current = (i + items.length) % items.length;
      const item = items[current];
      img.src = item.getAttribute('href');
      img.alt = item.dataset.title || '';
      caption.textContent = item.dataset.title || '';
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      lightbox.querySelector('.lightbox-close').focus();
    }
    function close() {
      lightbox.hidden = true;
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }

    items.forEach(function (item, i) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        open(i);
      });
    });
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function () { show(current - 1); });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function () { show(current + 1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', function (e) {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
});
