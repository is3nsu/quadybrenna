

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
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

function showNotification(message, type = 'success') {
  alert(message);
}