export async function initReviewsCarousel() {
  const track = document.querySelector('#reviews-track');
  const container = document.querySelector('#reviews-carousel-container');
  const previousButton = document.querySelector('#prev-review-btn');
  const nextButton = document.querySelector('#next-review-btn');

  if (!track || !previousButton || !nextButton) return;

  let reviews;
  try {
    const response = await fetch('./data/reviews.json');
    if (!response.ok) throw new Error('Could not load reviews');
    reviews = await response.json();
  } catch (error) {
    console.error('Błąd ładowania opinii:', error);
    track.innerHTML = '<p class="text-zinc-500 text-sm">Nie udało się załadować opinii.</p>';
    return;
  }

  const generateStars = (rating) => Array.from({ length: 5 }, (_, index) => `
    <i data-lucide="star" class="w-4 h-4 ${index < rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'}"></i>
  `).join('');

  track.innerHTML = reviews.map((review) => `
    <div class="review-card w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-4">
          <div class="flex gap-1">${generateStars(review.rating)}</div>
          <span class="text-xs text-zinc-500">${review.date}</span>
        </div>
        <p class="text-zinc-300 text-sm leading-relaxed mb-6">"${review.text}"</p>
      </div>
      <div class="flex items-center gap-3 pt-4 border-t border-zinc-800/60">
        <div class="w-10 h-10 rounded-full bg-brand/20 text-brand font-bold flex items-center justify-center text-sm">
          ${review.avatar}
        </div>
        <div>
          <h4 class="text-white text-sm font-bold">${review.author}</h4>
          <span class="text-xs text-zinc-500 flex items-center gap-1">${review.badge}</span>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();

  const cards = document.querySelectorAll('.review-card');
  let currentIndex = 0;
  let autoplayTimer;
  const autoplayInterval = 4000;

  function getVisibleCardsCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function updateCarousel() {
    const maxIndex = Math.max(0, cards.length - getVisibleCardsCount());
    currentIndex = Math.min(Math.max(currentIndex, 0), maxIndex);
    const cardWidth = cards[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${(cardWidth + 24) * currentIndex}px)`;
    previousButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
  }

  function moveToNextSlide() {
    const maxIndex = Math.max(0, cards.length - getVisibleCardsCount());
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateCarousel();
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(moveToNextSlide, autoplayInterval);
  }

  previousButton.addEventListener('click', () => {
    currentIndex -= 1;
    updateCarousel();
    startAutoplay();
  });

  nextButton.addEventListener('click', () => {
    currentIndex += 1;
    updateCarousel();
    startAutoplay();
  });

  if (container) {
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);
    container.addEventListener('touchstart', stopAutoplay, { passive: true });
    container.addEventListener('touchend', startAutoplay);
  }

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
  startAutoplay();
}