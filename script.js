document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initScrollReveal();
    initQuadViewer();
    initReviewsCarousel();
});

/* Obsługa formularza */

function initContactForm() {
  const form = document.querySelector('#contact-form');
  
  // Guard clause: jeśli nie ma formularza na stronie, przerywamy działanie
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    // Ustawienie stanu ładowania
    setButtonLoading(submitBtn, true);

    try {
      // Wysłanie danych do serwisu FormSubmit w tle (AJAX)
      const response = await fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showNotification('Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się wkrótce.', 'success');
        this.reset();
      } else {
        showNotification('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.', 'error');
      }
    } catch (error) {
      showNotification('Problem z połączeniem internetowym. Sprawdź sieć i spróbuj ponownie.', 'error');
    } finally {
      // Przywrócenie domyślnego stanu przycisku
      setButtonLoading(submitBtn, false, originalBtnText);
    }
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-scroll-reveal]');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      obs.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1,
  });

  revealElements.forEach((element) => observer.observe(element));
}

/* button status */

function setButtonLoading(button, isLoading, originalText = '') {
  if (isLoading) {
    button.textContent = 'Wysyłanie...';
    button.disabled = true;
    button.classList.add('opacity-75', 'cursor-not-allowed');
  } else {
    button.textContent = originalText;
    button.disabled = false;
    button.classList.remove('opacity-75', 'cursor-not-allowed');
  }
}

/* powiadomienie wysłania */ 

function showNotification(message, type = 'success') {
  alert(message);
}

/* Wybór i podgląd floty Quadów */
const fleetData = {
  'q1': {
    title: 'Quad 1',
    badge: 'Najchętniej wybierany',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    desc: 'Flagowy terenowy quad o legendarnej niezawodności. Idealny na górskie szlaki i wymagające przeprawy.',
    specs: {
      'Pojemność': '686 cm³',
      'Moc': '48 KM',
      'Napęd': '2WD / 4WD / Blokada dyferencjału',
      'Skrzynia': 'Automatyczna Ultramatic',
      'Wspomaganie': 'Elektroniczne (EPS)'
    }
  },
  'q2': {
    title: 'Quad 2',
    badge: 'Potwór Mocy',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    desc: 'Maksymalna moc silnika V-Twin dla osób poszukujących bezkompromisowych wrażeń i jazdy we dwoje.',
    specs: {
      'Pojemność': '976 cm³ (V-Twin)',
      'Moc': '91 KM',
      'Napęd': '4x4 Visco-Lok QE',
      'Miejsca': '2-osobowy (wygodne kanapy)',
      'Wspomaganie': 'Trzystopniowe Tri-Mode DPS'
    }
  },
  'q3': {
    title: 'Quad 3',
    badge: 'Idealny na start',
    image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
    desc: 'Lekki, łagodny w prowadzeniu i niezwykle komfortowy model, idealny dla początkujących pasjonatów off-roadu.',
    specs: {
      'Pojemność': '567 cm³',
      'Moc': '44 KM',
      'Napęd': 'Automatyczny True On-Demand AWD',
      'Zawieszenie': 'Niezależne tylne (IRS)',
      'Wspomaganie': 'Tak'
    }
  }
};

function initQuadViewer() {
  const buttons = document.querySelectorAll('.quad-tab-btn');
  const imgEl = document.querySelector('#quad-display-image');
  const titleEl = document.querySelector('#quad-display-title');
  const badgeEl = document.querySelector('#quad-display-badge');
  const descEl = document.querySelector('#quad-display-desc');
  const specsEl = document.querySelector('#quad-display-specs');

  if (buttons.length === 0 || !titleEl) return;

  // Funkcja aktualizująca widok
  function updateDisplay(key) {
    const data = fleetData[key];
    if (!data) return;

    // Podmiana danych z delikatną animacją przezroczystości
    imgEl.style.opacity = '0.3';
    
    setTimeout(() => {
      imgEl.src = data.image;
      imgEl.alt = data.title;
      titleEl.textContent = data.title;
      badgeEl.textContent = data.badge;
      descEl.textContent = data.desc;

      // Generowanie wierszy tabeli
      specsEl.innerHTML = Object.entries(data.specs)
        .map(([k, v]) => `
          <tr class="hover:bg-zinc-900/50">
            <td class="px-4 py-2.5 font-bold text-zinc-400 uppercase tracking-wider">${k}</td>
            <td class="px-4 py-2.5 text-right font-semibold text-white">${v}</td>
          </tr>
        `).join('');

      imgEl.style.opacity = '1';
    }, 150);
  }

  // Obsługa kliknięć w przyciski wyboru
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Zmiana stylów aktywności przycisku
      buttons.forEach(b => {
        b.classList.remove('bg-brand', 'text-black', 'shadow-lg', 'shadow-brand/20');
        b.classList.add('bg-zinc-900', 'text-zinc-400', 'border', 'border-zinc-800');
      });

      btn.classList.remove('bg-zinc-900', 'text-zinc-400', 'border', 'border-zinc-800');
      btn.classList.add('bg-brand', 'text-black', 'shadow-lg', 'shadow-brand/20');

      // Wywołanie aktualizacji danych
      const quadKey = btn.getAttribute('data-quad-key');
      updateDisplay(quadKey);
    });
  });

  // Wczytaj domyślny model przy starcie
  updateDisplay('q1');
}

/* ==========================================
   Karuzela Opinii (Ładowanie z JSON + Autoplay)
   ========================================== */
async function initReviewsCarousel() {
  const track = document.querySelector('#reviews-track');
  const container = document.querySelector('#reviews-carousel-container');
  const prevBtn = document.querySelector('#prev-review-btn');
  const nextBtn = document.querySelector('#next-review-btn');

  if (!track || !prevBtn || !nextBtn) return;

  // 1. Pobieranie danych z pliku JSON
  let reviews = [];
  try {
    const response = await fetch('./reviews.json');
    if (!response.ok) throw new Error('Nie udało się pobrać pliku JSON');
    reviews = await response.json();
  } catch (error) {
    console.error('Błąd ładowania opinii:', error);
    track.innerHTML = '<p class="text-zinc-500 text-sm">Nie udało się załadować opinii.</p>';
    return;
  }

  // 2. Generowanie gwiazdek HTML
  const generateStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => `
      <i data-lucide="star" class="w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'}"></i>
    `).join('');
  };

  // 3. Renderowanie kart opinii do HTML
  track.innerHTML = reviews.map(review => `
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

  // Wywołanie ikon Lucide po wygenerowaniu dynamicznego HTML
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 4. Logika karuzeli i auto-scrolla
  const cards = document.querySelectorAll('.review-card');
  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 4000;

  function getVisibleCardsCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function updateCarousel() {
    const visibleCards = getVisibleCardsCount();
    const maxIndex = cards.length - visibleCards;

    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24;
    const moveAmount = (cardWidth + gap) * currentIndex;

    track.style.transform = `translateX(-${moveAmount}px)`;

    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
  }

  function nextSlide() {
    const visibleCards = getVisibleCardsCount();
    const maxIndex = cards.length - visibleCards;
    currentIndex = (currentIndex >= maxIndex) ? 0 : currentIndex + 1;
    updateCarousel();
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  // Eventy dla przycisków i pauzy
  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
    startAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
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