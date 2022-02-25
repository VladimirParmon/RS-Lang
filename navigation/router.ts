import { homePage } from './pages/homePage';
import { bookPage } from './pages/bookPage';
import { historyPage } from './pages/historyPage';
import { gamesPage } from './pages/gamesPage';
import { statsPage } from './pages/statsPage';
import { commentsPage } from './pages/commentsPage';
import { audioChallengePage } from './pages/audioChallengePage';
import { storage, storageT } from '../utils/storage';
import { sprintPage } from './pages/sprintPage';
import { redirectPage } from './pages/gamesRedirect';
import { hideLoader } from '../utils/loader';
import { sniperPage } from './pages/sniperPage'
import { getUserSettings, getUserStatistics } from '../utils/api';

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
  comments: Page,
  audio: Page,
  sprint: Page,
  sniper: Page,
  redirect: Page
}

const pages: routerLib = {
  home: homePage,
  book: bookPage,
  history: historyPage,
  games: gamesPage,
  stats: statsPage,
  comments: commentsPage,
  audio: audioChallengePage,
  sprint: sprintPage,
  sniper: sniperPage,
  redirect: redirectPage
};

const getPageFromName = (pageName: keyof routerLib) => pages[pageName] || null;

export const router = async (pageName: keyof routerLib, instruction?: string) => {
  if (!storage.isAuthorized) {
    routing(pageName, instruction);
  } else {
    getUserSettings()
    .then(() => getUserStatistics())
    .then(async () => {
      routing(pageName, instruction);
    })
  }

  async function routing(pageName: keyof routerLib, instruction?: string) {
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
  }
};

function additionalEvent() {
}