// ===== MENU MOBILNE =====
const navGrid = document.querySelector('.nav-grid');
const hamburger = document.querySelector('.hamburger');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navGrid.classList.toggle('nav-open');
  });
}

// ===== STICKY NAV SHADOW =====
const stickyNav = document.querySelector('.sticky-nav');
window.addEventListener('scroll', () => {
  if (!stickyNav) return;
  if (window.scrollY > 20) stickyNav.classList.add('scrolled');
  else stickyNav.classList.remove('scrolled');
});

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
  // Fallback — pokaż wszystko jeśli brak IO
  revealEls.forEach(el => el.classList.add('in'));
}

// ===== PARALLAX NA WIDEO =====
const videoEl = document.querySelector('.background-video video');
window.addEventListener('scroll', () => {
  if (!videoEl) return;
  const rect = videoEl.getBoundingClientRect();
  const offset = rect.top * 0.15;
  videoEl.style.transform = `translateY(${offset}px)`;
});

// ===== LICZNIK 11 =====
const counterEl = document.querySelector('.heading-11');
let counted = false;

function animateNumber(el, target, duration) {
  const startTime = performance.now();
  function tick(now) {
    const p = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

if (counterEl && 'IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        animateNumber(counterEl, 11, 1500);
      }
    });
  }, { threshold: 0.4 });
  counterObserver.observe(counterEl);
}

// ===== FORMULARZ =====
const form = document.getElementById('email-form');
const formDone = document.querySelector('.w-form-done');
const formFail = document.querySelector('.w-form-fail');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (formDone) formDone.hidden = true;
    if (formFail) formFail.hidden = true;

    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const messageInput = form.querySelector('[name="message"]');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    // Walidacja
    if (!email || !message) {
      if (formFail) {
        formFail.hidden = false;
        formFail.querySelector('div').textContent = 'Please fill in email and message.';
      }
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (formFail) {
        formFail.hidden = false;
        formFail.querySelector('div').textContent = 'Please enter a valid email address.';
      }
      return;
    }

    // Sukces
    if (formDone) {
      formDone.hidden = false;
      formDone.querySelector('div').textContent =
        `Thank you${name ? ', ' + name : ''}! Your submission has been received!`;
    }
    form.reset();

    setTimeout(() => {
      if (formDone) formDone.hidden = true;
    }, 6000);
  });
}

// ===== MAPA (placeholder jeśli brak Webflow widgetu) =====
const mapEl = document.querySelector('.map');
if (mapEl && !mapEl.querySelector('iframe')) {
  mapEl.innerHTML = `
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.72906525696!2d-0.2416812069826387!3d51.52855824165083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondyn!5e0!3m2!1spl!2suk!4v1700000000000"
      width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy">
    </iframe>`;
}