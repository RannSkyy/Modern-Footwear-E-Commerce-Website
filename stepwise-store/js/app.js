// ===========================
// STEPWISE — MAIN APP
// ===========================

// ---- CUSTOM CURSOR ----
(function() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Scale on hover
  document.querySelectorAll('a, button, .product-card, .cat-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1.5)';
      follower.style.transform = 'translate(-50%,-50%) scale(1.4)';
      follower.style.borderColor = 'rgba(201,169,110,0.9)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.borderColor = 'rgba(201,169,110,0.5)';
    });
  });
})();

// ---- NAVBAR SCROLL ----
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ---- MOBILE MENU ----
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('menuToggle');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

// ---- SEARCH ----
function toggleSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay.classList.toggle('open');
  if (overlay.classList.contains('open')) {
    document.getElementById('searchInput').focus();
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    document.getElementById('searchResults').innerHTML = '';
    document.getElementById('searchInput').value = '';
  }
}

// Close search on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('searchOverlay').classList.contains('open')) toggleSearch();
    if (document.getElementById('productModal').classList.contains('open')) closeModal();
  }
});

// ---- TOAST ----
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function initReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ---- COUNTER ANIMATION ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString('id-ID');
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// ---- NEWSLETTER ----
function subscribeNewsletter() {
  const email = document.getElementById('emailInput').value;
  if (!email || !email.includes('@')) {
    showToast('⚠️ Masukkan email yang valid!');
    return;
  }
  showToast('🎉 Selamat! Kode diskon 15% telah dikirim ke email Anda.');
  document.getElementById('emailInput').value = '';
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  // Stats counters
  document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

  // Reveal elements
  initReveal();

  // Add reveal class to sections
  ['.categories-section', '.stats-section', '.about-section', '.testimonials-section']
    .forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.classList.add('reveal');
    });

  // Re-observe after adding classes
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));

  // Section headers
  document.querySelectorAll('.section-header').forEach((el, i) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
});

// ---- SMOOTH ANCHOR ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});