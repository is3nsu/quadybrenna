export function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-scroll-reveal]');

  if (!revealElements.length) return;

  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('revealed');
      currentObserver.unobserve(entry.target);
    });
  }, {
    rootMargin: isMobile ? '0px 0px 25% 0px' : '0px 0px -10% 0px',
    threshold: 0.1,
  });

  revealElements.forEach((element) => observer.observe(element));
}