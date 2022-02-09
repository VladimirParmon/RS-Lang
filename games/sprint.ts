import { getRandomInt } from '../utils/misc';
import { storage, storageT } from '../utils/storage';
import { prepareData } from './getData';
import { capitalize } from '../utils/misc';
import { endGame } from '../utils/endGame';
import { updateIndicator } from '../utils/indicator';

export function runSprint() {
  const wordSpan = document.querySelector('#sprintWordSpan');
  const variantSpan = document.querySelector('#sprintVariantSpan');
  const sprintButtons = document.querySelector('#sprintButtons');

  const wrapper = document.querySelector('#wrapper-sprint') as HTMLElement;
  wrapper.style.pointerEvents = 'all';
  wrapper.style.opacity = '1';

  sprintButtons!.innerHTML = '';
  prepareData();

  const coin = getRandomInt(0, 1);
  if (wordSpan && variantSpan) {
    wordSpan.innerHTML = capitalize(storageT.rightAnswer.word);
    variantSpan.innerHTML =
      coin === 1
        ? capitalize(storageT.rightAnswer.translate)
        : capitalize(storageT.singleVariant.translate);
  }

  const buttonRight = document.createElement('button');
  buttonRight.id = 'sprintRight';
  buttonRight.textContent = 'Верно →';

  const buttonWrong = document.createElement('button');
  buttonWrong.id = 'sprintWrong';
  buttonWrong.textContent = '← Неверно';

  sprintButtons?.appendChild(buttonWrong);
  sprintButtons?.appendChild(buttonRight);

  storageT.abortController = new AbortController();

  buttonRight.addEventListener(
    'click',
    () => {
      coin === 1 ? goNext(true) : goNext(false);
    },
    {
      once: true,
      signal: storageT.abortController!.signal
    }
  );

  buttonWrong.addEventListener(
    'click',
    () => {
      coin === 0 ? goNext(true) : goNext(false);
    },
    {
      once: true,
      signal: storageT.abortController!.signal
    }
  );

  window.addEventListener(
    'keyup',
    (e) => {
      if (e.code === 'ArrowRight') {
        coin === 1 ? goNext(true) : goNext(false);
      } else if (e.code === 'ArrowLeft') {
        coin === 0 ? goNext(true) : goNext(false);
      }
    },
    {
      once: true,
      signal: storageT.abortController!.signal
    }
  );
}

function goNext(command: boolean) {
  if (storageT.onlyOnePage) updateIndicator();
  const audioBite = new Audio();
  if (command) {
    audioBite.src = './assets/sounds/rightAnswer.mp3';
    storageT.endGameResults.right.push(storageT.rightAnswer);
  } else {
    audioBite.src = './assets/sounds/wrongAnswer.mp3';
    storageT.endGameResults.wrong.push(storageT!.rightAnswer);
  }
  audioBite.play();
  storageT.abortController?.abort();
  // runSprint();
  if (storageT.currentGameQueue!.length === 0) {
    storageT.abortController!.abort();
    endGame();
  } else {
    runSprint();
  }
}
