import { homePage } from './pages/homePage';
import { bookPage } from './pages/bookPage';
import { historyPage } from './pages/historyPage';
import { gamesPage } from './pages/gamesPage';
import { statsPage } from './pages/statsPage';
import { devPage } from './pages/devPage';
import { commentsPage } from './pages/commentsPage';
import { audioChallengePage } from './pages/audioChallengePage';
import { storage } from '../utils/storage';

const root = document.querySelector('#content');


export type Page = {
  render(instruction?: string): Promise<string> | string,
  afterRender(instruction?: string): string | void;
}

type routerLib = {
  home: Page,
  book: Page,
  history: Page,
  games: Page,
  stats: Page,
  dev: Page,
  comments: Page,
  audio: Page
}

const pages: routerLib = {
  home: homePage,
  book: bookPage,
  history: historyPage,
  games: gamesPage,
  stats: statsPage,
  dev: devPage,
  comments: commentsPage,
  audio: audioChallengePage
};

const getPageFromName = (pageName: keyof routerLib) => pages[pageName] || null;

export const router = async (pageName: keyof routerLib, instruction?: string) => {
    let page = getPageFromName(pageName);
    instruction ? storage.onlyOnePage = true : storage.onlyOnePage = false;

    if (page && root) {
        root.innerHTML = await page.render();
        if (page.afterRender) {
          page.afterRender();
        }
    }
};

function additionalEvent() {
}