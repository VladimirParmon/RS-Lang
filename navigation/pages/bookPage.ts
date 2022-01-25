import { Page } from "../router";
import { storage, WordInfo } from "../../utils/storage";
import { getWords, filesUrl } from "../../utils/api";
import { showLoader, hideLoader } from "../../utils/loader";



export const bookPage: Page = {
  render: async () => {
    const { bookGroup, bookPage } = storage;
    let info: WordInfo[];
    const wordInfoLength = 19;
    try {
      showLoader();
      info = await getWords(bookGroup, bookPage);
    } finally {
      hideLoader();
    }

    let pageLayout: string = '';
    
    for (let i=0; i < info.length-1; i++) {
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
            <h2>${capitalize(info[i].word)} - ${info[i].transcription}</h2>
            <h3>${capitalize(info[i].wordTranslate)}</h3>
            <span style="margin-top: 20px">${info[i].textMeaning}</span><br>
            <span>${info[i].textMeaningTranslate}</span><br>
            <span style="margin-top: 20px">${info[i].textExample}</span><br>
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
          <span>Раздел</span>
        </div>
        <div id="page">
          <div id="previousPage">
            <img src="assets/svg/arrow.svg" alt="prev">
          </div>
          <span>Страница <span id="pageCounter">${storage.bookPage + 1}/${storage.totalPages + 1} </span></span>
          <div id="nextPage">
            <img src="assets/svg/arrow.svg" alt="next">
          </div>
        </div>
        <div id="settings">
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