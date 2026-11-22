// ===== MENU MOBILNE =====
const navGrid = document.querySelector('.nav-grid');
const hamburger = document.querySelector('.hamburger');

if (hamburger && navGrid) {
  hamburger.addEventListener('click', () => {
    navGrid.classList.toggle('nav-open');
    // blokada scrolla pod menu
    document.body.style.overflow = navGrid.classList.contains('nav-open') ? 'hidden' : '';
  });

  // zamknij menu po kliknięciu w link
  navGrid.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navGrid.classList.remove('nav-open');
      document.body.style.overflow = '';
    });
  });
}

// ===== STICKY NAV SHADOW =====
const stickyNav = document.querySelector('.sticky-nav');
if (stickyNav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) stickyNav.classList.add('scrolled');
    else stickyNav.classList.remove('scrolled');
  });
}

// ===== SCROLL-REVEAL ANIMACJE =====
const revealEls = document.querySelectorAll(
  '.reveal-fade, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-zoom'
);

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ===== MAPA (jeśli nie ma iframe w HTML) =====
const mapEl = document.querySelector('.map');
if (mapEl && !mapEl.querySelector('iframe')) {
  mapEl.innerHTML = `
    <iframe
      src="https://www.google.com/maps?q=Grunwaldzka+3,+45-054+Opole&output=embed&hl=pl&z=16"
      width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>`;
}