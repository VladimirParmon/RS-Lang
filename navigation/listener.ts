import { storage } from "../utils/storage";
import { rollMenu, rollPageSelector, rollSectionSelector } from "./rollMenu";
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
      router('book');
    }

  });
}