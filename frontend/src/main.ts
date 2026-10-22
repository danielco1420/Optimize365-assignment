type ApiSuccess = {
  success: true;
  name: string;
  image: string;
};

type ApiError = {
  success: false;
  error: string;
};

const button = document.querySelector<HTMLButtonElement>('#fetch-button');
const result = document.querySelector<HTMLElement>('#result');
const status = document.querySelector<HTMLElement>('#status');
const image = document.querySelector<HTMLImageElement>('#pokemon-image');
const guessForm = document.querySelector<HTMLFormElement>('#guess-form');
const guessInput = document.querySelector<HTMLInputElement>('#guess-input');
const guessFeedback = document.querySelector<HTMLElement>('#guess-feedback');
const name = document.querySelector<HTMLElement>('#pokemon-name');

if (!button || !result || !status || !image || !guessForm || !guessInput || !guessFeedback || !name) {
  throw new Error('Required page elements are missing.');
}

let currentName = '';

function formatName(rawName: string) {
  return rawName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function normalizeName(value: string) {
  return value.trim().toLowerCase().replace(/[-.\s']/g, '');
}

function resetGuessUi() {
  currentName = '';
  guessForm.hidden = true;
  guessInput.value = '';
  guessInput.disabled = false;
  guessFeedback.hidden = true;
  guessFeedback.textContent = '';
  guessFeedback.className = '';
  name.hidden = true;
  name.textContent = '';
  image.hidden = true;
  image.classList.add('silhouette');
  image.alt = '';
  image.removeAttribute('src');
}

button.addEventListener('click', async () => {
  button.disabled = true;
  result.hidden = false;
  status.hidden = false;
  status.textContent = 'Loading...';
  resetGuessUi();

  try {
    const response = await fetch('/api/fetch-data');
    const data = (await response.json()) as ApiSuccess | ApiError;

    if (!data.success) {
      status.textContent = data.error;
      return;
    }

    currentName = data.name;
    image.classList.add('silhouette');
    image.alt = "Mystery Pokémon";
    image.src = data.image;
    image.hidden = false;
    guessForm.hidden = false;
    guessInput.focus();
    status.hidden = true;
  } catch {
    status.textContent = 'Could not reach the API.';
  } finally {
    button.disabled = false;
  }
});

guessForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!currentName) {
    return;
  }

  const isCorrect = normalizeName(guessInput.value) === normalizeName(currentName);
  const displayName = formatName(currentName);

  guessFeedback.hidden = false;
  guessFeedback.className = isCorrect ? 'correct' : 'incorrect';
  guessFeedback.textContent = isCorrect ? 'Correct' : 'Incorrect';
  image.classList.remove('silhouette');
  image.alt = displayName;
  name.textContent = displayName;
  name.hidden = false;
  guessInput.disabled = true;
});
