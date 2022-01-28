import { Page } from "../router";

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
      <span>Time game</span>
      <div id="goTime"></div>
    </div>
    <div class="gameModeSelector">
      <span>Puzzle game</span>
      <div id="goPuzzle"></div>
    </div>
  </div>
  `),
  afterRender: () => {
    
  }
}