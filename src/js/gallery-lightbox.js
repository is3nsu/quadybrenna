export function initGalleryLightbox() {
  const galleryImages = document.querySelectorAll('[data-gallery-image]');

  if (!galleryImages.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'fixed inset-0 z-[60] hidden items-center justify-center bg-black/90 p-4';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Powiększone zdjęcie');
  lightbox.innerHTML = `
    <button
      type="button"
      class="absolute right-4 top-4 rounded-full bg-zinc-900/80 p-3 text-white transition-colors hover:bg-brand hover:text-black"
      aria-label="Zamknij powiększenie"
    >
      <i data-lucide="x" class="h-6 w-6"></i>
    </button>
    <img class="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl" alt="" />
  `;

  document.body.append(lightbox);

  const closeButton = lightbox.querySelector('button');
  const lightboxImage = lightbox.querySelector('img');

  function closeLightbox() {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  }

  function openLightbox(image) {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    closeButton.focus();
  }

  galleryImages.forEach((image) => {
    image.addEventListener('click', () => openLightbox(image));
  });

  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });

  if (window.lucide) window.lucide.createIcons();
}