import { Page } from "../router";
import { showLoader, hideLoader } from "../../utils/loader";
import { storageT } from "../../utils/storage";
import { getData, getSinglePageData } from "../../games/getData";
import { runPuzzle } from "../../games/puzzle";
import { removeFooter } from "../../utils/misc";

export const puzzlePage: Page = {
  render: async () => {
    try {
      showLoader();
      //storageT.onlyOnePage ? await getSinglePageData() : await getData();
    } catch {
      console.log('Network error');
    } finally {
      hideLoader();
    }
    return `
    <div class="wrapperGames">
      <div id="wrapper-puzzle">
        <div id="sockets"></div>
        <div id="blocks"></div>
      </div>
    </div>
    `
  },
  afterRender: () => {
    removeFooter();
    runPuzzle();
  }
}