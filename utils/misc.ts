import { ReducedWordInfo, serverInfoObject, storageT } from "./storage";
import { checkKeys } from "./checks";

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function capitalize (string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function shuffle (array: ReducedWordInfo[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function checkFor(el: KeyboardEvent) {
  checkKeys(el.code);
}

export function addFooter() {
  const root = document.querySelector('body');
  const existingFooter = document.querySelector('footer');
  if (!existingFooter && root) {
    const footer = document.createElement('footer');
    footer.innerHTML = `
      <span onclick="window.open('https://ru.wikipedia.org/wiki/2022_%D0%B3%D0%BE%D0%B4','mywindow')">2022</span> 
      <span onclick="window.open('https://github.com/VladimirParmon','mywindow')">Vladimir Parmon</span>
      <img onclick="window.open('https://rs.school/js/','mywindow')" src="assets/svg/rs_school_js.svg" alt="rsSchool">
    `
    root.appendChild(footer);
  }
}

export function removeFooter() {
  const root = document.querySelector('body');
  const footer = document.querySelector('footer');
  if (root && footer) root.removeChild(footer);
}

// class InGameStats extends HTMLElement {
//   connectedCallback() {
//     this.innerHTML = `    
//       <div class="inGameStats">
//         <div class="inARowIndicators">
//           <div style="background-color:${serverInfoObject.howManyInARow[storageT.rightAnswer.id] > 0 ? 'var(--trio3)' : 'var(--header)'}"></div>
//           <div style="background-color:${serverInfoObject.howManyInARow[storageT.rightAnswer.id] > 1 ? 'var(--trio3)' : 'var(--header)'}"></div>
//           <div style="background-color:${serverInfoObject.howManyInARow[storageT.rightAnswer.id] > 2 ? 'var(--trio3)' : 'var(--header)'}"></div>
//           <div style="display:${serverInfoObject.difficult[storageT.rightAnswer.id] ? 'block' : 'none'}; background-color:${serverInfoObject.howManyInARow[storageT.rightAnswer.id] > 3 ? 'var(--trio3)' : 'var(--header)'}"></div>
//           <div style="display:${serverInfoObject.difficult[storageT.rightAnswer.id] ? 'block' : 'none'}; background-color:${serverInfoObject.howManyInARow[storageT.rightAnswer.id] > 4 ? 'var(--trio3)' : 'var(--header)'}"></div>
//         </div>
//         <span style="display:${serverInfoObject.learnt[storageT.rightAnswer.id] ? 'block' : 'none'}">Изученное слово</span>
//         <span style="display:${serverInfoObject.difficult[storageT.rightAnswer.id] ? 'block' : 'none'}">Сложное слово</span>
//       </div>
//     `;
//   }
// }

// customElements.define('game-stats', InGameStats);

export function inGameStats() {
  const inARow = serverInfoObject.howManyInARow[storageT.rightAnswer.id] ? serverInfoObject.howManyInARow[storageT.rightAnswer.id] : 0;
  const isDifficult = serverInfoObject.difficult[storageT.rightAnswer.id];
  const isLearnt = serverInfoObject.learnt[storageT.rightAnswer.id];

  return `
  <div class="inARowIndicators">
    <div style="background-color:${inARow > 0 ? 'var(--trio3)' : 'var(--header)'}"></div>
    <div style="background-color:${inARow > 1 ? 'var(--trio3)' : 'var(--header)'}"></div>
    <div style="background-color:${inARow > 2 ? 'var(--trio3)' : 'var(--header)'}"></div>
    <div style="display:${isDifficult ? 'block' : 'none'}; background-color:${inARow > 3 ? 'var(--trio3)' : 'var(--header)'}"></div>
    <div style="display:${isDifficult ? 'block' : 'none'}; background-color:${inARow > 4 ? 'var(--trio3)' : 'var(--header)'}"></div>
  </div>
  <span style="display:${isLearnt ? 'block' : 'none'}">Изученное слово</span>
  <span style="display:${isDifficult ? 'block' : 'none'}">Сложное слово</span>
  `
}