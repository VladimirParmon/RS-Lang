import { storage } from "./storage";
import { getData, getSinglePageData } from "../games/getData";
import { timer } from "./timer";
import { runSprint } from "../games/sprint";
import { runAudioGame } from "../games/audioChallenge";

export function endGame() {
  const soundBite = new Audio;
  soundBite.src = 'assets/sounds/roundEnded.mp3';
  soundBite.play();
  const root = document.querySelector('.wrapperGames');
  if (root) {
    if (storage.onlyOnePage) {
      getSinglePageData();
      if(storage.secondsInterval) clearInterval(storage.secondsInterval);
      if(storage.msInterval) clearInterval(storage.msInterval);
    };
    
    const resultsWrapper = document.createElement('div');
    resultsWrapper.id = 'resultsWrapper';

    storage.abortController?.abort();
  
    const theId = `#wrapper${storage.currentGameMode}`;

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
  
    if (storage.endGameResults.right.length !== 0) {
      storage.endGameResults.right.forEach((el) => {
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
  
    if (storage.endGameResults.wrong.length !== 0) {
      storage.endGameResults.wrong.forEach((el) => {
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
  
    const playAgain = document.createElement('button');
    playAgain.id = 'resultsPlayAgain';
    playAgain.textContent = 'Играть снова';
    playAgain.addEventListener('click', () => {
      root?.removeChild(resultsWrapper);
      wrapper.style.opacity = '1';
      wrapper.style.pointerEvents = 'all';
      storage.endGameResults.right = [];
      storage.endGameResults.wrong = [];
      storage.onlyOnePage ? getSinglePageData() : getData();
      switch (storage.currentGameMode) {
        case 'AudioGame': runAudioGame()
        break;
        case 'Sprint': {
          timer();
          runSprint();
        } 
        break;
        // case 'Puzzle': runPuzzle();
        // break;
        // case 'Sniper': runSniper();
        // break;
      }
    }, {
      once: true
    })
    resultsWrapper.appendChild(results);
    resultsWrapper.appendChild(playAgain);
  
    root?.appendChild(resultsWrapper)
  }
}