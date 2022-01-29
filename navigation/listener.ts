import { storage } from "../utils/storage";
import { rollMenu, rollPageSelector, rollSectionSelector, rollGamesSelector } from "./rollMenu";
import { router } from "./router";
import { playSound } from "../utils/playSound";
import { filesUrl } from "../utils/api";

export const listener = ():void => {
  window.addEventListener('click', (e) => {
    let eventTarget = e.target as HTMLElement;
    let id = eventTarget.id;

    if (id === 'goHome') router('home');
    if (id === 'goBook') router('book');
    if (id === 'goHistory') router('history');
    if (id === 'goGames') router('games');
    if (id === 'goStats') router('stats');
    if (id === 'goDev') router('dev');
    if (id === 'goComments') router('comments');

    if (id === 'goAudio') router('audio');
    if (id === 'goSprint') router('sprint');

    if (id === 'openMenuButton') rollMenu('open');
    if (id === 'closeMenuButton') rollMenu('close');
    if (id !== 'openMenuButton') rollMenu('close');

    if (id === 'page') rollPageSelector('open');
    if (id !== 'page') rollPageSelector('close');
    if (id === 'previousPage') {
      storage.bookPage > 0 ? storage.bookPage -= 1 : storage.bookPage;
      router('book');
    }
    if (id === 'nextPage') {
      storage.bookPage < storage.totalPages ? storage.bookPage += 1 : storage.bookPage;
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
        // case 'time': router('time', 'onlyOnePageRequired');
        // break;
        // case 'sprint': router('sprint', 'onlyOnePageRequired');
        // break;
      }
    }

    if (id.split('-')[0] === 'playSound') playSound(id.split('-')[1]);

    if (id === 'repeatAudio') {
      const audioBite = new Audio;
      audioBite.src = `${filesUrl}/${storage.rightAnswer.audio}`;
      audioBite.play();
    }

    
  });
}