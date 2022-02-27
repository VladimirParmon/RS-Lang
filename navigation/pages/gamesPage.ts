import { Page } from "../router";
import { addFooter } from "../../utils/misc";

export const gamesPage: Page = {
  render: () => (`
  <div class="wrapperGames">
    <div class="gameModeSelector">
      <span>Audio challenge</span>
      <div id="goAudio"></div>
    </div>
    <div class="gameModeSelector">
      <span>Sprint mode</span>
      <div id="goSprint"></div>
    </div>
    <div class="gameModeSelector">
      <span>Sniper</span>
      <div id="goSniper"></div>
    </div>
    <div class="gameModeSelector">
      <span>Puzzle game</span>
      <div id="goPuzzle"></div>
    </div>
  </div>
  `),
  afterRender: () => {
    addFooter();
  }
}