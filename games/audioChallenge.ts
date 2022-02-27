import { filesUrl } from "../utils/api"
import { serverInfoObject, storage, storageT } from "../utils/storage";
import { capitalize, inGameStats } from "../utils/misc";
import { checkChoice } from "../utils/checks";
import { prepareData } from "./getData";
import { checkFor } from "../utils/misc";
import { endGame } from "../utils/endGame";
import { updateIndicator } from "../utils/indicator";

export function runAudioGame() {
  window.addEventListener('keyup', checkFor);
  const wrapper = document.querySelector('#wrapper-audio') as HTMLElement;
  const gameStats = document.querySelector('.inGameStats') as HTMLElement;
  if (gameStats) wrapper.removeChild(gameStats);

  prepareData();
  let intermediateArray: string[] = [];

  storageT.workingArray.forEach((el, i) => {
    intermediateArray.push(el.id);
    const optionsContainer = document.querySelector(`#audioGameOptions`);
    const option = document.createElement('div');
    const keyIcon = document.createElement('img');
    keyIcon.style.width = '30px';
    keyIcon.style.height = '30px';
    keyIcon.style.marginRight = '10px';
    keyIcon.src = `assets/svg/white/${i + 1}w.svg`;
    option.appendChild(keyIcon);
    option.id = `gameOption-${el.id}`;
    option.innerHTML += capitalize(el.translate);
    option.addEventListener('click', () => {
      checkChoice(el.id);
    })
    optionsContainer!.appendChild(option);
  }) 
  storageT.currentOptions = intermediateArray;

  const audioBite = new Audio;
  audioBite.src = `${filesUrl}/${storageT.rightAnswer.audio}`;
  audioBite.play();

  if (storage.isAuthorized) {
    const gameStats = document.createElement('div');
    gameStats.classList.add('inGameStats');
    const stats = inGameStats();
    gameStats.innerHTML = stats;
    wrapper.appendChild(gameStats);
  }
}

export function runAudioAnimation(id: string) {
  const buttonsDiv = document.querySelector('#audioGameOptions') as HTMLElement;
  const buttonPressed = document.querySelector(`#gameOption-${id}`) as HTMLElement;
  const roundButton = document.querySelector('#repeatAudio') as HTMLElement;
  const roundButtonIcon = document.querySelector('#repeatAudioIcon') as HTMLElement;

  // buttonsDiv.style.pointerEvents = 'none';
  // buttonPressed.style.transform = 'scale(1.07)';

  const nextQuestionButton = document.createElement('div');
  nextQuestionButton.id = 'nextAudioQuestion';
  nextQuestionButton.innerHTML = '[space] →';

  setTimeout(() => {
    buttonsDiv.style.opacity = '0';
    roundButtonIcon.style.opacity = '0';
    
    setTimeout(() => {
      roundButton.style.backgroundImage = `url(${filesUrl}/${storageT.rightAnswer.image})`;
      roundButton.style.width = '500px'
      roundButton.style.height = '300px';
      roundButton.style.borderRadius = '0';
      buttonsDiv.innerHTML = `
        <div>${storageT.rightAnswer.word}</div>
        <div>${storageT.rightAnswer.transcription}</div>
        <div>${storageT.rightAnswer.translate}</div>
      `;
      buttonsDiv.appendChild(nextQuestionButton);

      nextQuestionButton.addEventListener('click', clicked);
      window.addEventListener('keyup', pressed);

      buttonsDiv.style.opacity = '1';
      buttonsDiv.style.pointerEvents = 'all';
    }, 500)
  }, 600)

//=============================================================//
  function clicked() {
    nextQuestionButton.removeEventListener('click', clicked);
    window.removeEventListener('keyup', pressed)
    goNext();
  };

  function pressed(e: KeyboardEvent) {
    if (e.code === 'Space') {
      window.removeEventListener('keyup', pressed)
      goNext()
    }
  };

  function goNext() {
    if (storageT.onlyOnePage) updateIndicator();
    buttonsDiv.style.opacity = '0';
    roundButton.style.width = '140px'
    roundButton.style.height = '140px';
    roundButton.style.borderRadius = '50%';
    roundButton.style.backgroundImage = 'none';
    roundButtonIcon.style.opacity = '1';
    setTimeout(() => {
      buttonsDiv.style.opacity = '1';
      buttonsDiv.innerHTML = ``;
      storageT.currentGameQueue.length === 0 ? endGame() : runAudioGame();
    }, 600);
    }
//=============================================================//
} 

