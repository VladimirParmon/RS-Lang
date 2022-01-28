import { Page } from "../router";
import { showLoader, hideLoader } from "../../utils/loader";
import { runAudioGame } from "../../games/audioChallenge";
import { getData } from "../../games/getData"

export const audioChallengePage: Page = {
  render: async () => {
    try {
      showLoader();
      await getData();
    } catch {
      console.log('Network error')
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
    `
  },
  afterRender: () => {
    runAudioGame();
  }
}