import { addFooter } from "../../utils/misc";
import { Page } from "../router";
import { filesUrl, getSingleWord, getUserSettings } from "../../utils/api";
import { serverInfoObject, WordInfo } from "../../utils/storage";
import { hideLoader, showLoader } from "../../utils/loader";

export const historyPage: Page = {
  render: async () => {
    let difficult: string[];
    let deleted: string[];
    let learnt: string[];
    let learning: string[];

    let diffLayout = '';
    let delLayout = '';
    let learntLayout = '';
    let learningLayout = '';
    showLoader();
    //await getUserSettings()
    //.then(() => {
      difficult = Object.keys(serverInfoObject.difficult);
      deleted = Object.keys(serverInfoObject.deleted);
      learnt = Object.keys(serverInfoObject.learnt);
      const learningSet = new Set();
      difficult.forEach(el => learningSet.add(el));
      deleted.forEach(el => learningSet.add(el));
      learnt.forEach(el => learningSet.add(el));
      learning = Array.from(learningSet) as string[];
   // })
   // .then(async () => {
      for (let i = 0; i < difficult.length; i++) {
        if (difficult[i] !== '' && serverInfoObject.difficult[difficult[i]]) {
          const info = await getSingleWord(difficult[i]);
          diffLayout += generateCard(info, 'difficult');
        }
      }
      for (let i = 0; i < deleted.length; i++) {
        if (deleted[i] !== '' && serverInfoObject.deleted[deleted[i]]) {
          const info = await getSingleWord(deleted[i]);
          delLayout += generateCard(info, 'deleted');
        }
      }
      for (let i = 0; i < learnt.length; i++) {
        if (learnt[i] !== '' && serverInfoObject.learnt[learnt[i]]) {
          const info = await getSingleWord(learnt[i]);
          learntLayout += generateCard(info, 'learnt');
        }
      }
      for (let i = 0; i < learning.length; i++) {
        if (learning[i] !== '') {
          const info = await getSingleWord(learning[i]);
          learningLayout += generateCard(info, 'learning');
        }
      }
 //   })
  //  .finally(() => {
      hideLoader()
   // })
    function capitalize (string: string) {
      return string[0].toUpperCase() + string.slice(1);
    }
    function generateCard(info: WordInfo, section: string) {
      let button = '';
      if (section === 'difficult') {
        button = `
        <div class="redoButton" id="difficultHistory-${info.id}"><img src="assets/svg/x.svg"></div>`
      } else if (section === 'deleted') {
        button = `
        <div class="redoButton" id="garbageHistory-${info.id}"><img src="assets/svg/x.svg"></div>`
      }
      return `        
      <div class="card" id="card${section}-${info.id}">
        <img class="cardImg" src="${filesUrl}/${info.image}" alt="${info.word}">
        <div class="cardInfo">
          <h2>${capitalize(info.word)} - ${info.transcription}<img class="soundIcon" id="playSound-${info.audio}" src="assets/svg/sound.svg" alt="sound"></h2>
          <h3>${capitalize(info.wordTranslate)}</h3>
          <div style="margin-top: 20px">
            <img class="soundIcon2" id="playSound-${info.audioMeaning}" src="assets/svg/playButton.svg" alt="sound">
            <span>${info.textMeaning}</span>
          </div>
          <span>${info.textMeaningTranslate}</span><br>
          <div style="margin-top: 20px">
            <img class="soundIcon2" id="playSound-${info.audioExample}" src="assets/svg/playButton.svg" alt="sound">
            <span>${info.textExample}</span>
          </div>
          <span>${info.textExampleTranslate}</span>
        </div>
        ${button}
      </div>`
    }
  return`
  <div id="wrapperHistory">
    <input type="radio" class="historyInput" id="history1" name="history" style="display: none" checked>
    <label for="history1" class="historyHeader">Сложные слова</label>

    <input type="radio" class="historyInput" id="history2" name="history" style="display: none">
    <label for="history2" class="historyHeader">Удаленные слова</label>

    <input type="radio" class="historyInput" id="history3" name="history" style="display: none">
    <label for="history3" class="historyHeader">Изученные слова</label>

    <input type="radio" class="historyInput" id="history4" name="history" style="display: none">
    <label for="history4" class="historyHeader">Уже встречались</label>

    <div class="historyInner">
      <div id="difficultWords">${diffLayout ? diffLayout : 'Тут пока ничего нет'}</div> 
      <div id="deletedWords">${delLayout ? delLayout : 'Тут пока ничего нет'}</div> 
      <div id="learntWords">${learntLayout ? learntLayout : 'Тут пока ничего нет'}</div> 
      <div id="learning">${learningLayout ? learningLayout : 'Тут пока ничего нет'}</div> 
    </div>
  </div>
  `},
  afterRender: () => {
    addFooter();
  }
}