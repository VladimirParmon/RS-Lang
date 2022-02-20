import { getData, getSinglePageData } from "../../games/getData";
import { runSniper } from "../../games/sniper";
import { addIndicator } from "../../utils/indicator";
import { hideLoader, showLoader } from "../../utils/loader";
import { removeFooter } from "../../utils/misc";
import { storageT } from "../../utils/storage";
import { Page } from "../router";

export const sniperPage: Page = {
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
      <div id="wrapper-sniper">
        <div id="sniperDisplay">
          <div id="sniperPanorama"></div>
          <div id="bird">
          <img id="birdImg" src="assets/img/bird.gif" alt="bird">
          </div>
          <div id="sniperRoof"></div>
          <div id="flag"></div>
          <span id="sniperWordSpan"></span>
        </div>
        <div class="gameOptions" id="sniperOptions"></div>
      </div>
    </div>
    `
  },
  afterRender: () => {
    removeFooter();
    storageT.currentGameMode = 'sniper'
    storageT.endGameResults.right = [];
    storageT.endGameResults.wrong = [];
    if (storageT.onlyOnePage) addIndicator();
    runSniper();
  }
}