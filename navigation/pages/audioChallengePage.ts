import { Page } from '../router';
import { hideLoader, showLoader } from '../../utils/loader';
import { runAudioGame } from '../../games/audioChallenge';
import { getData, getSinglePageData } from '../../games/getData';
import { storage } from '../../utils/storage';
import { removeFooter } from '../../utils/misc';

export const audioChallengePage: Page = {
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
      <div id="wrapperAudioGame">
        <div id="repeatAudio">
          <img id="repeatAudioIcon" src="assets/svg/sound.svg" alt="icon">
        </div>
        <div id="audioGameOptions"></div>
      </div>
    </div>
    `;
  },
  afterRender: () => {
    storage.currentGameMode = 'AudioGame';
    storage.endGameResults.right = [];
    storage.endGameResults.wrong = [];
    removeFooter();
    runAudioGame();
  }
};
