import { homePage } from './pages/homePage';
import { bookPage } from './pages/bookPage';
import { historyPage } from './pages/historyPage';
import { gamesPage } from './pages/gamesPage';
import { statsPage } from './pages/statsPage';
import { devPage } from './pages/devPage';
import { commentsPage } from './pages/commentsPage';

const root = document.querySelector('#content');

export type Page = {
  render(): Promise<string> | string,
  afterRender(): string | void
}

type routerLib = {
  home: Page,
  book: Page,
  history: Page,
  games: Page,
  stats: Page,
  dev: Page,
  comments: Page
}

const pages: routerLib = {
  home: homePage,
  book: bookPage,
  history: historyPage,
  games: gamesPage,
  stats: statsPage,
  dev: devPage,
  comments: commentsPage
};

const getPageFromName = (pageName: keyof routerLib) => pages[pageName] || null;

export const router = async (pageName: keyof routerLib) => {
    let page = getPageFromName(pageName);

    if (page && root) {
        root.innerHTML = await page.render();
        if (page.afterRender) {
          page.afterRender();
        }
    }
};