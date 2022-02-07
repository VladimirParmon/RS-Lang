import { Page } from '../router';
import { runSprint } from '../../games/sprint';
import { getData, getSinglePageData } from '../../games/getData';
import { storage } from '../../utils/storage';
import { hideLoader, showLoader } from '../../utils/loader';
import { timer } from '../../utils/timer';
import { removeFooter } from '../../utils/misc';

export const sprintPage: Page = {
  render: async () => {
    try {
      showLoader();
      storage.onlyOnePage ? await getSinglePageData() : await getData();
    } catch {
      console.log('Network error');
    } finally {
      hideLoader();
    }
    return `
  <div class="wrapperGames">
    <div id="wrapperSprint">
      <div class="timerHolder">
        <canvas id="timeLeft" width="150" height="150"></canvas>
        <span id="timeLeftDigits"></span>
      </div>
      <span id="sprintWordSpan"></span>
      <span id="sprintVariantSpan"></span>
      <div id="sprintButtons"></div>
    </div>
  </div>
  `;
  },
  afterRender: () => {
    if (storage.secondsInterval) clearInterval(storage.secondsInterval);
    if (storage.msInterval) clearInterval(storage.msInterval);
    storage.currentGameMode = 'Sprint';
    storage.endGameResults.right = [];
    storage.endGameResults.wrong = [];
    removeFooter();
    timer();
    runSprint();
  }
};
