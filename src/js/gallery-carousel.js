export function initGalleryCarousel() {
  const track = document.querySelector('[data-gallery-track]');
  const previousButton = document.querySelector('[data-gallery-prev]');
  const nextButton = document.querySelector('[data-gallery-next]');

  if (!track || !previousButton || !nextButton) return;

  function updateButtons() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    previousButton.disabled = track.scrollLeft <= 1;
    nextButton.disabled = track.scrollLeft >= maxScroll - 1;
  }

  function getScrollDistance() {
    const firstImage = track.querySelector('[data-gallery-image]');
    if (!firstImage) return track.clientWidth;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    return firstImage.getBoundingClientRect().width + gap;
  }

  previousButton.addEventListener('click', () => {
    track.scrollBy({ left: -getScrollDistance(), behavior: 'smooth' });
  });

  nextButton.addEventListener('click', () => {
    track.scrollBy({ left: getScrollDistance(), behavior: 'smooth' });
  });

  track.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  updateButtons();
}