import { initContactForm } from './contact-form.js';
import { initGalleryLightbox } from './gallery-lightbox.js';
import { initGalleryCarousel } from './gallery-carousel.js';
import { initMobileNavigation } from './mobile-navigation.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initQuadViewer } from './quad-viewer.js';
import { initReviewsCarousel } from './reviews-carousel.js';

function initialize() {
  if (window.lucide) window.lucide.createIcons();
  initContactForm();
  initGalleryLightbox();
  initGalleryCarousel();
  initMobileNavigation();
  initScrollReveal();
  initQuadViewer();
  initReviewsCarousel();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize, { once: true });
} else {
  initialize();
}