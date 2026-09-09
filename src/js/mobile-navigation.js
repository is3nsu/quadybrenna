export function initMobileNavigation() {
  const header = document.querySelector('#site-header');
  const hero = document.querySelector('main > section');
  const toggleButton = document.querySelector('#mobile-menu-toggle');
  const mobileNavigation = document.querySelector('#mobile-navigation');

  if (!header || !hero || !toggleButton || !mobileNavigation) return;

  const updateHeaderVisibility = (entries) => {
    header.classList.toggle('header-visible', !entries[0].isIntersecting);
  };

  const observer = new IntersectionObserver(updateHeaderVisibility, {
    threshold: 0,
  });
  observer.observe(hero);

  function closeMenu() {
    mobileNavigation.classList.remove('is-open');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.setAttribute('aria-label', 'Otwórz menu');
    toggleButton.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
    if (window.lucide) window.lucide.createIcons();
  }

  toggleButton.addEventListener('click', () => {
    const isOpen = mobileNavigation.classList.toggle('is-open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
    toggleButton.setAttribute('aria-label', isOpen ? 'Zamknij menu' : 'Otwórz menu');
    toggleButton.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}" class="w-6 h-6"></i>`;
    if (window.lucide) window.lucide.createIcons();
  });

  mobileNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}