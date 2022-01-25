import { storage } from "../utils/storage";
import { rollMenu, rollPageSelector } from "./rollMenu";
import { router } from "./router";

export const listener = ():void => {
  window.addEventListener('click', (e) => {
    let eventTarget = e.target as HTMLElement;
    let id = eventTarget.id;

    console.log(id)

    if (id === 'goHome') router('home');
    if (id === 'goBook') router('book');
    if (id === 'goHistory') router('history');
    if (id === 'goGames') router('games');
    if (id === 'goStats') router('stats');
    if (id === 'goDev') router('dev');
    if (id === 'goComments') router('comments');

    if (id === 'openMenuButton') rollMenu('open');
    if (id === 'closeMenuButton') rollMenu('close');
    if (id !== 'openMenuButton') rollMenu('close');

    if (id === 'page') rollPageSelector();
    if (id === 'previousPage') {
      storage.bookPage > 0 ? storage.bookPage -= 1 : storage.bookPage;
      router('book');
    }
    if (id === 'nextPage') {
      storage.bookPage < storage.totalPages ? storage.bookPage += 1 : storage.bookPage;
      router('book');
    }


  });
}