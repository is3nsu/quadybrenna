export async function initQuadViewer() {
  const buttons = document.querySelectorAll('.quad-tab-btn');
  const imageElement = document.querySelector('#quad-display-image');
  const titleElement = document.querySelector('#quad-display-title');
  const badgeElement = document.querySelector('#quad-display-badge');
  const descriptionElement = document.querySelector('#quad-display-desc');
  const specsElement = document.querySelector('#quad-display-specs');

  if (!buttons.length || !titleElement) return;

  let fleetData;
  try {
    const response = await fetch('./data/fleet.json');
    if (!response.ok) throw new Error('Could not load fleet data');
    fleetData = await response.json();
  } catch (error) {
    console.error('Błąd ładowania floty:', error);
    return;
  }

  function updateDisplay(key) {
    const data = fleetData[key];
    if (!data) return;

    imageElement.style.opacity = '0.3';

    setTimeout(() => {
      imageElement.src = data.image;
      imageElement.alt = data.title;
      titleElement.textContent = data.title;
      badgeElement.textContent = data.badge;
      descriptionElement.textContent = data.desc;
      specsElement.innerHTML = Object.entries(data.specs)
        .map(([label, value]) => `
          <tr class="hover:bg-zinc-900/50">
            <td class="px-4 py-2.5 font-bold text-zinc-400 uppercase tracking-wider">${label}</td>
            <td class="px-4 py-2.5 text-right font-semibold text-white">${value}</td>
          </tr>
        `).join('');
      imageElement.style.opacity = '1';
    }, 150);
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((currentButton) => {
        currentButton.classList.remove('bg-brand', 'text-black', 'shadow-lg', 'shadow-brand/20');
        currentButton.classList.add('bg-zinc-900', 'text-zinc-400', 'border', 'border-zinc-800');
      });

      button.classList.remove('bg-zinc-900', 'text-zinc-400', 'border', 'border-zinc-800');
      button.classList.add('bg-brand', 'text-black', 'shadow-lg', 'shadow-brand/20');
      updateDisplay(button.dataset.quadKey);
    });
  });

  updateDisplay('q1');
}