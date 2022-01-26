import { Page } from "../router";
import { storage, WordInfo } from "../../utils/storage";
import { getWords, filesUrl } from "../../utils/api";
import { showLoader, hideLoader } from "../../utils/loader";

export const bookPage: Page = {
  render: async () => {
    const { bookGroup, bookPage } = storage;
    let info: WordInfo[];
    try {
      showLoader();
      info = await getWords(bookGroup, bookPage);
    } finally {
      hideLoader();
    }

    let pageLayout: string = '';
    
    for (let i=0; i < info.length; i++) {
      pageLayout += await generateCard(i)
    }

    function capitalize (string: string) {
      return string[0].toUpperCase() + string.slice(1);
  }

    async function generateCard (i: number) {
      return `
        <div class="card">
          <img class="cardImg" src="${filesUrl}/${info[i].image}" alt="${info[i].word}">
          <div class="cardInfo">
            <h2>${capitalize(info[i].word)} - ${info[i].transcription}<img class="soundIcon" id="playSound-${info[i].audio}" src="assets/svg/sound.svg" alt="sound"></h2>
            <h3>${capitalize(info[i].wordTranslate)}</h3>
            <div style="margin-top: 20px">
              <img class="soundIcon2" id="playSound-${info[i].audioMeaning}" src="assets/svg/playButton.svg" alt="sound">
              <span>${info[i].textMeaning}</span>
            </div>
            <span>${info[i].textMeaningTranslate}</span><br>
            <div style="margin-top: 20px">
              <img class="soundIcon2" id="playSound-${info[i].audioExample}" src="assets/svg/playButton.svg" alt="sound">
              <span>${info[i].textExample}</span>
            </div>
            <span>${info[i].textExampleTranslate}</span>
          </div>
        </div>
      `
    }
    return `
    <div class="wrapper">
      <h1>Учебник</h1>
      <div class="pageControls">
        <div id="section">
          <img src="assets/svg/folder.svg" alt="folderIcon">
          <span>Раздел <span id="sectionCounter">${storage.bookGroup + 1}/${storage.totalGroups}</span></span>
        </div>
        <div id="page">
          <div id="previousPage">
            <img src="assets/svg/arrow.svg" alt="prev">
          </div>
          <span>Страница <span id="pageCounter">${storage.bookPage + 1}/${storage.totalPages}</span></span>
          <div id="nextPage">
            <img src="assets/svg/arrow.svg" alt="next">
          </div>
        </div>
        <div id="settings">
          <img src="assets/svg/settings.svg" alt="settingsIcon">
          <span>Настройки</span>
        </div>
      </div>
      ${pageLayout}
    </div>
    <div class="returnButton"></div>
    `
  },
  afterRender: () => {
    
  }
}