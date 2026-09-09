export function initContactForm() {
  const form = document.querySelector('#contact-form');

  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    setButtonLoading(submitButton, true);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      showNotification('Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się wkrótce.');
      form.reset();
    } catch (error) {
      const message = error instanceof TypeError
        ? 'Problem z połączeniem internetowym. Sprawdź sieć i spróbuj ponownie.'
        : 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.';
      showNotification(message);
    } finally {
      setButtonLoading(submitButton, false, originalText);
    }
  });
}

function setButtonLoading(button, isLoading, originalText = '') {
  button.textContent = isLoading ? 'Wysyłanie...' : originalText;
  button.disabled = isLoading;
  button.classList.toggle('opacity-75', isLoading);
  button.classList.toggle('cursor-not-allowed', isLoading);
}

function showNotification(message) {
  alert(message);
}