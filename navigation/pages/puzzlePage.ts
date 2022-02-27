import { Page } from "../router";
import { showLoader, hideLoader } from "../../utils/loader";
import { storageT } from "../../utils/storage";
import { getData, getSinglePageData } from "../../games/getData";
import { runPuzzle } from "../../games/puzzle";
import { removeFooter } from "../../utils/misc";
import { addIndicator } from "../../utils/indicator";

export const puzzlePage: Page = {
  render: async () => {
    try {
      showLoader();
      storageT.onlyOnePage ? await getSinglePageData() : await getData();
    } catch {
      console.log('Network error');
    } finally {
      hideLoader();
    }
    return `
    <div class="wrapperGames">
    <div id="quitGame"></div>
      <div id="wrapper-puzzle">
        <div id="attempts">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div id="sockets"></div>
        <div id="blocks"></div>
      </div>
    </div>
    `
  },
  afterRender: () => {
    removeFooter();
    storageT.currentGameMode = 'puzzle';
    storageT.endGameResults.right = [];
    storageT.endGameResults.wrong = [];
    if (storageT.onlyOnePage) addIndicator();
    runPuzzle();
  }
}