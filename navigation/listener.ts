import { manageServerInfo, serverInfoObject, statistics, storage, storageObject, storageT } from "../utils/storage";
import { rollMenu, rollPageSelector, rollSectionSelector, rollGamesSelector, passwordReveal, rollSetting } from "./rollMenu";
import { router, routerLib } from "./router";
import { playSound } from "../utils/playSound";
import { filesUrl, handleLogin } from "../utils/api";
import { slider } from "../utils/slider";
import { endGame } from "../utils/endGame";

export const listener = ():void => {
  window.addEventListener('click', (e) => {
    let eventTarget = e.target as HTMLElement;
    let eventInputTarget = e.target as HTMLInputElement;
    let id = eventTarget.id;

    //console.log(id)

    if (id === 'goHome') router('home');
    if (id === 'goBook' || id === 'learnWords') router('book');
    if (id === 'goHistory') router('history');
    if (id === 'goGames' || id === 'playGames') router('games');
    if (id === 'goStats' || id === 'yourStats') router('stats');
    if (id === 'goDev') window.open('https://rolling-scopes-school.github.io/vladimirparmon-JSFE2021Q3/CV/index.html','mywindow');
    if (id === 'goComments') router('comments');

    if (id === 'goAudio') {
      storageT.currentGameMode = 'audio';
      router('redirect');
    }
    if (id === 'goSprint') {
      storageT.currentGameMode = 'sprint';
      router('redirect');
    } 
    if (id === 'goSniper') {
      storageT.currentGameMode = 'sniper';
      router('redirect');
    }
    if (id.split('-')[0] === 'levelsListOption') {
      const x = storageT.currentGameMode as keyof routerLib;
      storageT.currentDifficulty = +id.split('-')[1];
      router(x)
    }

    if (id === 'openMenuButton') rollMenu('open');
    if (id === 'closeMenuButton') rollMenu('close');
    if (id !== 'openMenuButton' && id !== 'modeSwitch') rollMenu('close');

    if (id === 'page') rollPageSelector('open');
    if (id !== 'page') rollPageSelector('close');
    if (id === 'previousPage') {
      storage.bookPage > 0 ? storage.bookPage -= 1 : storage.bookPage;
      router('book');
    }
    if (id === 'nextPage') {
      storage.bookPage < storageT.totalPages ? storage.bookPage += 1 : storage.bookPage;
      router('book');
    }
    if (id.split('-')[0] === 'pageListOption') {
      storage.bookPage = +id.split('-')[1];
      router('book');
    }

    if (id === 'section') rollSectionSelector('open');
    if (id !== 'section') rollSectionSelector('close');
    if (id.split('-')[0] === 'sectionListOption') {
      storage.bookGroup = +id.split('-')[1];
      storage.bookPage = 0;
      router('book');
    }

    
    if (id === 'games') rollGamesSelector('open');
    if (id !== 'games') rollGamesSelector('close');
    if (id.split('-')[0] === 'gamesListOption') {
      const gameToTravelTo = id.split('-')[1];
      switch (gameToTravelTo) {
        case 'audio': router('audio', 'onlyOnePageRequired');
        break;
        // case 'puzzle': router('puzzle', 'onlyOnePageRequired');
        // break;
        case 'sniper': router('sniper', 'onlyOnePageRequired');
        break;
        case 'sprint': router('sprint', 'onlyOnePageRequired');
        break;
      }
    }

    if (id === 'settings') rollSetting('open');
    if (id !== 'settings' && id !== 'modeSwitch') rollSetting('close');

    if (id.split('-')[0] === 'playSound') playSound(id.split('-')[1]);

    if (id === 'repeatAudio') {
      const audioBite = new Audio;
      audioBite.src = `${filesUrl}/${storageT.rightAnswer.audio}`;
      audioBite.play();
    }

    if (id === 'login') handleLogin('login');
    if (id === 'send') handleLogin('send');
    if (id === 'passwordReveal') passwordReveal();


    if (id.split('-')[0] === 'learnt') {
      const wordId = id.split('-')[1];
      if (eventInputTarget.checked) {
        manageServerInfo(wordId, "learnt", 'add');
      } else {
        manageServerInfo(wordId, "learnt", 'remove');
      }
    }
    if (id.split('-')[0] === 'difficult') {
      const wordId = id.split('-')[1];
      if (eventInputTarget.checked) {
        manageServerInfo(wordId, "difficult", 'add');
      } else {
        manageServerInfo(wordId, "difficult", 'remove');
      }
    }
    if (id.split('-')[0] === 'garbage') {
      const wordId = id.split('-')[1];
      manageServerInfo(wordId, "deleted", 'add');
      const theCard = document.querySelector(`#card-${wordId}`) as HTMLElement;
      theCard.style.display = 'none';
    }
    if (id.split('-')[0] === 'difficultHistory') {
      const wordId = id.split('-')[1];
      manageServerInfo(wordId, "difficult", 'remove');
      const theCard = document.querySelector(`#carddifficult-${wordId}`) as HTMLElement;
      theCard.style.display = 'none';
    }
    if (id.split('-')[0] === 'garbageHistory') {
      const wordId = id.split('-')[1];
      manageServerInfo(wordId, "deleted", 'remove');
      const theCard = document.querySelector(`#carddeleted-${wordId}`) as HTMLElement;
      theCard.style.display = 'none';
    }

    if (id === 'quitGame') endGame();
  });

  const loginButton = document.querySelector('#authIn') as HTMLElement;
  loginButton.addEventListener('click', async () => {
    router('home');
    setTimeout(() => {
      slider('reg');
    }, 10) 
  })
}