// ===========================
// STEPWISE — HERO SLIDER
// ===========================

let currentSlide = 0;
const totalSlides = 3;
let sliderInterval;

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');

  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = (index + totalSlides) % totalSlides;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');

  // Reset progress bar
  const progress = document.getElementById('slideProgress');
  progress.style.animation = 'none';
  void progress.offsetWidth; // reflow
  progress.style.animation = 'slideProgress 5s linear infinite';
}

function changeSlide(direction) {
  clearInterval(sliderInterval);
  goToSlide(currentSlide + direction);
  startAutoSlide();
}

function startAutoSlide() {
  sliderInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);
}

// Touch/swipe support for hero
(function() {
  let startX = 0;
  const hero = document.querySelector('.hero');
  if (!hero) return;

  hero.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  hero.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      clearInterval(sliderInterval);
      goToSlide(currentSlide + (diff > 0 ? 1 : -1));
      startAutoSlide();
    }
  }, { passive: true });
})();

// Testimonials slider
let testimonialIndex = 0;

function slideTestimonial(dir) {
  const track = document.getElementById('testimonialTrack');
  const cards = track.querySelectorAll('.testimonial-card');
  const max = cards.length - (window.innerWidth > 900 ? 3 : 1);

  testimonialIndex = Math.max(0, Math.min(max, testimonialIndex + dir));
  track.style.transform = `translateX(-${testimonialIndex * (340 + 24)}px)`;
}

// Start everything
document.addEventListener('DOMContentLoaded', () => {
  startAutoSlide();
});