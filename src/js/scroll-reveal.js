export function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-scroll-reveal]');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('revealed');
      currentObserver.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1,
  });

  revealElements.forEach((element) => observer.observe(element));
}