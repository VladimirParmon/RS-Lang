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
      <div id="repeatAudio"></div>
      <div id="audioGameOptions"></div>
    </div>
    `
  },
  afterRender: () => {
    runAudioGame();
  }
}