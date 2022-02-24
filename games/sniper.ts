import { filesUrl } from "../utils/api";
import { checkChoice } from "../utils/checks";
import { endGame } from "../utils/endGame";
import { updateIndicator } from "../utils/indicator";
import { getDistanceBetweenElements } from "../utils/measures";
import { capitalize, checkFor, inGameStats } from "../utils/misc";
import { storage, storageT } from "../utils/storage";
import { prepareData } from "./getData";

export function runSniper() {
  const optionsContainer = document.querySelector(`#sniperOptions`);
  const theWord = document.querySelector('#sniperWordSpan') as HTMLElement;
  const wrapper = document.querySelector('#wrapper-sniper') as HTMLElement;
  if (optionsContainer) optionsContainer!.innerHTML = '';
  const gameStats = document.querySelector('.inGameStats') as HTMLElement;
  if (gameStats) wrapper.removeChild(gameStats);

  prepareData();
  let intermediateArray: string[] = [];

  storageT.workingArray.forEach((el, i) => {
    intermediateArray.push(el.id);
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
      const audioBite = new Audio;
      audioBite.src = `assets/sounds/gunshot.mp3`;
      audioBite.play();
    })
    if (optionsContainer) optionsContainer.appendChild(option);
  }) 
  storageT.currentOptions = intermediateArray;
  theWord!.textContent = storageT.rightAnswer.word.toUpperCase();

  const audioBite = new Audio;
  audioBite.src = `assets/sounds/bird.mp3`;
  setTimeout(() => {
    audioBite.play();
  }, 1200)
  

  if (storage.isAuthorized) {
    const gameStats = document.createElement('div');
    gameStats.classList.add('inGameStats');
    const stats = inGameStats();
    gameStats.innerHTML = stats;
    wrapper.appendChild(gameStats);
  }

  startSniperAnimation();
}

function animation (bird: HTMLElement, distance: number, birdImg: HTMLElement) {
  let animationTime = 4000;
  switch(storageT.currentDifficulty) {
    case 1: animationTime = 3500;
    break;
    case 2: animationTime = 3000;
    break;
    case 3: animationTime = 2500;
    break;
    case 4: animationTime = 2000;
    break;
    case 5: animationTime = 1750;
    break;
  }
  let start : number | null = null;

  function step(timestamp: number) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distance / animationTime));

    bird.style.transform = `translateX(${Math.min(passed, distance)}px)`

    if (passed < distance && storageT.currentBirdStatus !== 'dead') {
      storageT.animation = window.requestAnimationFrame(step);
    } else {
      if (storageT.onlyOnePage) updateIndicator();
      cancelAnimationFrame(storageT.animation)
      if (storageT.currentBirdStatus === 'flies') {
        checkChoice('invalid')
        setTimeout(() => {
          storageT.currentGameQueue.length === 0 ? endGame() : runSniper();
        }, 1500)
      } else if (storageT.currentBirdStatus === 'dead') {
        bird.classList.add('falling');
        birdImg.classList.add('rotating');
        setTimeout(() => {
          bird.classList.remove('falling');
          birdImg.classList.remove('rotating');
          storageT.currentGameQueue.length === 0 ? endGame() : runSniper();
        }, 1500)
      } else {
        setTimeout(() => {
          storageT.currentGameQueue.length === 0 ? endGame() : runSniper();
        }, 1500)
      }
    }

  }
  storageT.animation = window.requestAnimationFrame(step);
}

  export const startSniperAnimation = () => {
  const wrapper = document.querySelector('#wrapper-sniper');
  const buttonsDiv = document.querySelector('.gameOptions') as HTMLElement;
  setTimeout(() => {
    buttonsDiv.style.pointerEvents = 'all';
    window.addEventListener('keyup', checkFor, {
      once: true
    });
  }, 1000)
  if (wrapper) {
    const bird = document.querySelector('#bird') as HTMLElement;
    const birdImg = document.querySelector('#birdImg') as HTMLElement;
    bird.style.transform = 'translateX(0)';
    storageT.currentBirdStatus = 'flies';
    const flag = document.querySelector('#flag') as HTMLElement;
    const pathLength = Math.floor(getDistanceBetweenElements(bird, flag)) + 50;
    setTimeout(() => {
      animation(bird, pathLength, birdImg);
    }, 1200)
  }
}