

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initScrollReveal();
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