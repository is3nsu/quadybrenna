

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initScrollReveal();
    initQuadViewer();
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