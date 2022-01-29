import { getRandomInt } from "../utils/misc";
import { storage } from "../utils/storage";
import { prepareData } from "./getData";
import { capitalize } from "../utils/misc";
import { ReducedWordInfo } from '../utils/storage';

let endGameResults = {
  wrong: <ReducedWordInfo[]> [],
  right: <ReducedWordInfo[]> []
}

export function runSprint() {
  const wordSpan = document.querySelector('#sprintWordSpan');
  const variantSpan = document.querySelector('#sprintVariantSpan');
  const sprintButtons = document.querySelector('#sprintButtons');

  sprintButtons!.innerHTML = '';
  prepareData();
  
  const coin = getRandomInt(0, 1);
  if (wordSpan && variantSpan) {
    wordSpan.innerHTML = capitalize(storage.rightAnswer.word);
    variantSpan.innerHTML = coin === 1 ? capitalize(storage.rightAnswer.translate) : capitalize(storage.singleVariant.translate);
  }

  const buttonRight = document.createElement('button');
  buttonRight.id = 'sprintRight';
  buttonRight.textContent = 'Верно';

  const buttonWrong = document.createElement('button');
  buttonWrong.id = 'sprintWrong';
  buttonWrong.textContent = 'Неверно';

  sprintButtons?.appendChild(buttonWrong);
  sprintButtons?.appendChild(buttonRight);

  buttonRight.addEventListener('click', ()=> {
    console.log('next')
    coin === 1 ? goNext(true) : goNext(false);
  }, {
    once: true
  })

  buttonWrong.addEventListener('click', ()=> {
    coin === 0 ? goNext(true) : goNext(false);
  }, {
    once: true
  })
}

function goNext(command: boolean) {
  const audioBite = new Audio;
  if (command) {
    audioBite.src = './assets/sounds/rightAnswer.mp3';
    endGameResults.right.push(storage.rightAnswer);
  } else {
    audioBite.src = './assets/sounds/wrongAnswer.mp3'
    endGameResults.wrong.push(storage.singleVariant);
  }
  audioBite.play();
  runSprint();
}

export function endSprint() {
  const root = document.querySelector('.wrapperGames');
  const results = document.createElement('div');
  results.id = 'resultsSprint';
  const rightOnes = document.createElement('div');
  const wrongOnes = document.createElement('div');
  const spanR = document.createElement('h2');
  const spanW = document.createElement('h2');
  spanR.textContent = 'Правильные ответы:';
  spanW.textContent = 'Неправильные ответы:';
  rightOnes.appendChild(spanR);
  wrongOnes.appendChild(spanW);

  endGameResults.right.forEach((el) => {
    const option = `
    <div class="sprintOption">
      <img src="assets/svg/sound.svg" alt="audio" id="playSound-${el.audio}">
      <span>${el.word} – ${el.translate}</span>
    </div>
    `
    rightOnes.innerHTML += option;
  })
  endGameResults.wrong.forEach((el) => {
    const option = `
    <div class="sprintOption">
      <img src="assets/svg/sound.svg" alt="audio">
      <span>${el.word} – ${el.translate}</span>
    </div>
    `
    wrongOnes.innerHTML += option;
  })
  results?.appendChild(rightOnes);
  results?.appendChild(wrongOnes);
  root?.appendChild(results);
}
