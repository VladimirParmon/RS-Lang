import { storageT } from "./storage";
import { getData, getSinglePageData } from "../games/getData";
import { timer } from "./timer";
import { runSprint } from "../games/sprint";
import { runAudioGame } from "../games/audioChallenge";
import { router } from "../navigation/router";
import { runSniper } from "../games/sniper";
import { updateIndicator } from "./indicator";

export function endGame() {
  const root = document.querySelector('.wrapperGames');
  if (root) {
    const soundBite = new Audio;
    soundBite.src = 'assets/sounds/roundEnded.mp3';
    soundBite.play();
    if (storageT.onlyOnePage) {
      getSinglePageData();
      if(storageT.secondsInterval) clearInterval(storageT.secondsInterval);
      if(storageT.msInterval) clearInterval(storageT.msInterval);
    };
    
    const resultsWrapper = document.createElement('div');
    resultsWrapper.id = 'resultsWrapper';
  
    const theId = `#wrapper-${storageT.currentGameMode}`;

    const wrapper = document.querySelector(theId) as HTMLElement;
    wrapper.style.pointerEvents = 'none';
    wrapper.style.opacity = '0.5';
  
    const results = document.createElement('div');
    results.id = 'results';
    const rightOnes = document.createElement('div');
    const wrongOnes = document.createElement('div');
    const spanR = document.createElement('h2');
    const spanW = document.createElement('h2');
    spanR.textContent = 'Правильные ответы:';
    spanW.textContent = 'Неправильные ответы:';
    rightOnes.appendChild(spanR);
    wrongOnes.appendChild(spanW);
  
    if (storageT.endGameResults.right.length !== 0) {
      storageT.endGameResults.right.forEach((el) => {
        const option = `
        <div class="resultsOption">
          <img src="assets/svg/sound.svg" alt="audio" id="playSound-${el.audio}">
          <span><b>${el.word}</b> – ${el.translate}</span>
        </div>
        `
        rightOnes.innerHTML += option;
      })
    } else {
      rightOnes.innerHTML += 'Нет правильных ответов :('
    }
  
    if (storageT.endGameResults.wrong.length !== 0) {
      storageT.endGameResults.wrong.forEach((el) => {
        const option = `
        <div class="resultsOption">
          <img src="assets/svg/sound.svg" alt="audio" id="playSound-${el.audio}">
          <span><b>${el.word}</b> – ${el.translate}</span>
        </div>
        `
        wrongOnes.innerHTML += option;
      })
    } else {
      wrongOnes.innerHTML += 'Нет неправильных ответов!'
    }
    results?.appendChild(rightOnes);
    results?.appendChild(wrongOnes);

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.id = 'resultsButtonsWrapper';
  
    const playAgain = document.createElement('button');
    playAgain.textContent = 'Играть снова';
    playAgain.addEventListener('click', () => {
      storageT.initialGameQueueLength = storageT.currentGameQueue.length;
      if (storageT.onlyOnePage) updateIndicator();
      root?.removeChild(resultsWrapper);
      wrapper.style.opacity = '1';
      wrapper.style.pointerEvents = 'all';
      storageT.endGameResults.right = [];
      storageT.endGameResults.wrong = [];
      storageT.onlyOnePage ? getSinglePageData() : getData();
      switch (storageT.currentGameMode) {
        case 'audio': runAudioGame()
        break;
        case 'sprint': {
          timer();
          runSprint();
        } 
        break;
        // case 'Puzzle': runPuzzle();
        // break;
        case 'sniper': runSniper();
        break;
      }
    }, {
      once: true
    });
    const exit = document.createElement('button');
    exit.textContent = 'Выйти';
    exit.addEventListener('click', () => {
      root?.removeChild(resultsWrapper);
      storageT.endGameResults.right = [];
      storageT.endGameResults.wrong = [];
      router('home');
    }, {
      once: true
    });
    resultsWrapper.appendChild(results);
    buttonsWrapper.appendChild(playAgain);
    buttonsWrapper.appendChild(exit);
    resultsWrapper.appendChild(buttonsWrapper);
  
    root?.appendChild(resultsWrapper)
  }
}