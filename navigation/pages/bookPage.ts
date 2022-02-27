import { Page } from "../router";
import { storage, WordInfo, storageT, serverInfoObject } from "../../utils/storage";
import { getWords, filesUrl } from "../../utils/api";
import { showLoader, hideLoader } from "../../utils/loader";
import { addFooter } from "../../utils/misc";
import { getUserSettings } from "../../utils/api"

export const bookPage: Page = {
  render: async () => {
    const { bookGroup, bookPage } = storage;
    let info: WordInfo[];
    try {
      showLoader();
      info = await getWords(bookGroup, bookPage);
      //await getUserSettings();
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
      const isMarkedDifficult = serverInfoObject.difficult[info[i].id] ? serverInfoObject.difficult[info[i].id] : null;
      const isMarkedDeleted = serverInfoObject.deleted[info[i].id] ? serverInfoObject.deleted[info[i].id] : null;
      const isMarkedLearnt = serverInfoObject.learnt[info[i].id] ? serverInfoObject.learnt[info[i].id] : null;
      const howManyInARow = serverInfoObject.howManyInARow[info[i].id] ? serverInfoObject.howManyInARow[info[i].id] : 0;
      const howManyRight = serverInfoObject.howManyRight[info[i].id] ? serverInfoObject.howManyRight[info[i].id] : 0;
      const howManyWrong = serverInfoObject.howManyWrong[info[i].id] ? serverInfoObject.howManyWrong[info[i].id] : 0;
      const authAdditionalOptions = storage.isAuthorized ? 
      `<div id="authAdditionalOptions">
        <input class="bookCheckbox" type="checkbox" id="learnt-${info[i].id}" style="display: none" ${isMarkedLearnt ? 'checked' : ''}>
        <label for="learnt-${info[i].id}" class="learntLabel">
          <img src="assets/svg/cap.svg">
        </label>
        <input class="bookCheckbox" type="checkbox" id="difficult-${info[i].id}" style="display: none" ${isMarkedDifficult ? 'checked' : ''}>
        <label for="difficult-${info[i].id}" class="difficultLabel">
          <img src="assets/svg/dumbbell.svg">
        </label>
        <div class="garbage" id="garbage-${info[i].id}">
          <img src="assets/svg/garbage.svg">
        </div>
      </div>` : '';
      const authAdditionalInfo = storage.isAuthorized ? `
      <button class="statsButton"></button>
      <div class="inBookStats">
        <span>Угадано подряд: ${howManyInARow}</span>
        <span>Правильных ответов: ${howManyRight}</span>
        <span>Ошибок: ${howManyWrong}</span>
      </div>
      ` : '';
      return `
        <div class="card" id="card-${info[i].id}" style="display: ${isMarkedDeleted ? 'none' : 'flex'}">
          <img class="cardImg" src="${filesUrl}/${info[i].image}" alt="${info[i].word}">
          <div class="cardInfo">
            <h2>${capitalize(info[i].word)} - ${info[i].transcription}<img class="soundIcon" id="playSound-${info[i].audio}" src="assets/svg/playButton.svg" alt="sound"></h2>
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
          ${authAdditionalOptions}
          ${authAdditionalInfo}
        </div>
      `
    }
    return `
    <div class="wrapper">
      <h1>Учебник</h1>
      <div class="pageControls">
        <div id="section">
          <img src="assets/svg/folder.svg" alt="folderIcon">
          <span>Раздел <span id="sectionCounter">${storage.bookGroup + 1}/${storageT.totalGroups}</span></span>
        </div>
        <div id="page">
          <div id="previousPage">
            <img src="assets/svg/arrow.svg" alt="prev">
          </div>
          <span>Страница <span id="pageCounter">${storage.bookPage + 1}/${storageT.totalPages}</span></span>
          <div id="nextPage">
            <img src="assets/svg/arrow.svg" alt="next">
          </div>
        </div>
        <div id="settings">
          <img src="assets/svg/settings.svg" alt="settingsIcon">
          <span>Управление</span>
        </div>
        <div id="games">
          <img src="assets/svg/gamepad.svg" alt="gamesIcon">
          <span>Игры</span>
        </div>
      </div>
      ${pageLayout}
      <div class="settingsList">
        <div class="redoButton">
          <img src="assets/svg/x.svg">
        </div>
        <div id="settingsInner">
          <span><img class="soundIcon2" src="assets/svg/cap.svg">Изученное слово – слово, угаданное 3 раза подряд в играх. Не учавствует в играх, запущенных со страницы учебника</span>
          <span><img class="soundIcon2" src="assets/svg/dumbbell.svg">Сложное слово – слово, помеченное сложным, необходимо угадать 5 раз в играх для того, чтобы оно стало изученым</span>
          <span><img class="soundIcon2" src="assets/svg/garbage.svg">Удалить слово – убрать слово со страницы учебника. Слово можно вернуть в разделе "История"</span>
          <span><img class="soundIcon2" src="assets/svg/playButton.svg">Прослушать аудиоотрывок, относящийся к тому тексту, рядом с которым он стоит</span>
          <span><img class="soundIcon2" src="assets/svg/question.svg">Дополнительная информация о слове (статистика показывает информацию за текущий день)</span>
        </div>
      </div>
    </div>
    <div class="returnButton"></div>
    `
  },
  afterRender: () => {
    addFooter();
  }
}