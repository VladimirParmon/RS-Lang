import { addFooter } from "../../utils/misc";
import { Page } from "../router";

export const redirectPage: Page = {
  render: () => (`
    <div id="levelsListWrapper">
      <h2>Выберите сложность</h2>
      <div id="levelsList">
        <div id="levelsListOption-0" class="levelsListOption">1</div>
        <div id="levelsListOption-1" class="levelsListOption">2</div>
        <div id="levelsListOption-2" class="levelsListOption">3</div>
        <div id="levelsListOption-3" class="levelsListOption">4</div>
        <div id="levelsListOption-4" class="levelsListOption">5</div>
        <div id="levelsListOption-5" class="levelsListOption">6</div>
      </div>
    </div>
  `),
  afterRender: () => {
    addFooter();
  }
}