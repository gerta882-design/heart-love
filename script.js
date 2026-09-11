const heart = document.querySelector('#heart');
const message = 'I Love You';
const wordCount = 31;
const addWord = (x, y, delay, className = '', xScale = 2.2, yScale = 2.45) => {
  const word = document.createElement('span');
  word.className = `word ${className}`.trim();
  word.textContent = message;
  word.style.left = `${50 + x * xScale}%`;
  word.style.top = `${50 - y * yScale}%`;
  word.style.setProperty('--word-delay', `${delay}s`);
  word.style.setProperty('--cycle-delay', `${Math.random() * 12}s`);
  heart.append(word);
};

for (let index = 0; index < wordCount; index += 1) {
  const angle = (index / wordCount) * Math.PI * 2;
  const x = 16 * Math.sin(angle) ** 3;
  const y = 13 * Math.cos(angle) - 5 * Math.cos(angle * 2) - 2 * Math.cos(angle * 3) - Math.cos(angle * 4);

  addWord(x, y, index * 0.16, 'first-heart-word');
}

const secondHeartRows = 9;
const secondHeartColumns = 15;
let secondHeartIndex = 0;

for (let row = 0; row < secondHeartRows; row += 1) {
  for (let column = 0; column < secondHeartColumns; column += 1) {
    const x = (column / (secondHeartColumns - 1)) * 2.8 - 1.4;
    const y = 1.25 - (row / (secondHeartRows - 1)) * 2.5;
    const equation = (x * x + y * y - 1) ** 3 - x * x * y ** 3;

    if (equation < -0.16) {
      const randomDelay = 15 + Math.random() * 12;
      addWord(x, y, randomDelay, 'second-heart-word', 31, 32);
      secondHeartIndex += 1;
    }
  }
}

const startButton = document.querySelector('#start-button');
const playerFrame = document.querySelector('#soundcloud-player');
const scene = document.querySelector('.love-scene');
const soundcloudPlayer = SC.Widget(playerFrame);
const startTime = 105000;
let shouldStartMusic = false;

soundcloudPlayer.bind(SC.Widget.Events.READY, () => {
  if (shouldStartMusic) {
    soundcloudPlayer.seekTo(startTime);
    soundcloudPlayer.play();
  }
});

startButton.addEventListener('click', () => {
  shouldStartMusic = true;
  soundcloudPlayer.seekTo(startTime);
  soundcloudPlayer.play();
  startButton.classList.add('is-hidden');
  scene.classList.add('is-transitioning');

  window.setTimeout(() => {
    scene.classList.add('is-started');
  }, 200);
});

