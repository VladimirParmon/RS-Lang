import { Page } from "../router";
import { showLoader, hideLoader } from "../../utils/loader";
import { audioGame, runAudioGame } from "../../games/audioChallenge";

export const audioChallengePage: Page = {
  render: async () => {
    try {
      console.log('started')
      showLoader();
      await audioGame();
    } finally {
      console.log('finally')
    }

    return `
    <div class="wrapperGames">
      <div id="repeatAudio">
        <img src="assets/svg/sound.svg" alt="repeatSound">
      </div>
      <div id="audioGameOptions">
        <div id="audioGameOption-0"></div>
        <div id="audioGameOption-1"></div>
        <div id="audioGameOption-2"></div>
        <div id="audioGameOption-3"></div>
        <div id="audioGameOption-4"></div>
      </div>
    </div>
    `
  },
  afterRender: () => {
    runAudioGame();
  }
}