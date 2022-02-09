import { homePage } from './pages/homePage';
import { bookPage } from './pages/bookPage';
import { historyPage } from './pages/historyPage';
import { gamesPage } from './pages/gamesPage';
import { statsPage } from './pages/statsPage';
import { devPage } from './pages/devPage';
import { commentsPage } from './pages/commentsPage';
import { audioChallengePage } from './pages/audioChallengePage';
import { storage, storageT } from '../utils/storage';
import { sprintPage } from './pages/sprintPage';
import { redirectPage } from './pages/gamesRedirect';
import { hideLoader } from '../utils/loader';

const root = document.querySelector('#content');

export type Page = {
  render(instruction?: string): Promise<string> | string,
  afterRender(instruction?: string): string | void;
}

export type routerLib = {
  home: Page,
  book: Page,
  history: Page,
  games: Page,
  stats: Page,
  dev: Page,
  comments: Page,
  audio: Page,
  sprint: Page,
  redirect: Page
}

const pages: routerLib = {
  home: homePage,
  book: bookPage,
  history: historyPage,
  games: gamesPage,
  stats: statsPage,
  dev: devPage,
  comments: commentsPage,
  audio: audioChallengePage,
  sprint: sprintPage,
  redirect: redirectPage
};

const getPageFromName = (pageName: keyof routerLib) => pages[pageName] || null;

export const router = async (pageName: keyof routerLib, instruction?: string) => {
  hideLoader();
  let page = getPageFromName(pageName);
  storage.currentPage = pageName;
  instruction ? storageT.onlyOnePage = true : storageT.onlyOnePage = false;

  if (page && root) {
    const layout = await page.render();
    if(storage.currentPage === pageName) {
      root.innerHTML = layout;
      if (page.afterRender) {
        page.afterRender();
      }
    }
  } 
};

function additionalEvent() {
}