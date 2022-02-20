import { Page } from '../router';
import { hideLoader, showLoader } from '../../utils/loader';
import { runAudioGame } from '../../games/audioChallenge';
import { getData, getSinglePageData } from '../../games/getData';
import { storage, storageT } from '../../utils/storage';
import { removeFooter } from '../../utils/misc';
import { addIndicator } from '../../utils/indicator';

export const audioChallengePage: Page = {
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
      <div id="wrapper-audio">
        <div id="repeatAudio">
          <img id="repeatAudioIcon" src="assets/svg/sound.svg" alt="icon">
        </div>
        <div class="gameOptions" id="audioGameOptions"></div>
      </div>
    </div>
    `;
  },
  afterRender: () => {
    storageT.currentGameMode = 'audio';
    storageT.endGameResults.right = [];
    storageT.endGameResults.wrong = [];
    removeFooter();
    runAudioGame();
    if(storageT.onlyOnePage) addIndicator();
  }
};
