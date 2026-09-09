import { initContactForm } from './contact-form.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initQuadViewer } from './quad-viewer.js';
import { initReviewsCarousel } from './reviews-carousel.js';

function initialize() {
  initContactForm();
  initScrollReveal();
  initQuadViewer();
  initReviewsCarousel();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize, { once: true });
} else {
  initialize();
}