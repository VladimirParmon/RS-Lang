import { rollMenu } from "./rollMenu";
import { router } from "./router";

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

    if (id === 'openMenuButton') rollMenu('open');
    if (id === 'closeMenuButton') rollMenu('close');

  });
}