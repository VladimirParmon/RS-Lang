import { ReducedWordInfo, serverInfoObject, storageT } from "./storage";
import { checkKeys } from "./checks";
import { handleLogin } from "./api";

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

export function shuffleStrings (array: string[]) {
  let newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
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
  <span class="inGameStatsSpanDifficult" style="opacity:${isDifficult ? '1' : '0'}">Сложное слово</span>
  <span class="inGameStatsSpanLearnt" style="opacity:${isLearnt ? '1' : '0'}">Изученное слово</span>
  `
}

export function getDate() {
  const today = new Date();
  today.setDate(today.getDate());
  const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  return date;
}

export function adjustStatsButton(command: boolean) {
  const statsButton = document.querySelector('#goStats') as HTMLElement;
  const historyButton = document.querySelector('#goHistory') as HTMLElement;
  if (command) {
    statsButton.style.pointerEvents = 'all';
    statsButton.style.opacity = '1';
    historyButton.style.pointerEvents = 'all';
    historyButton.style.opacity = '1';
  } else {
    statsButton.style.pointerEvents = 'none';
    statsButton.style.opacity = '0.4';
    historyButton.style.pointerEvents = 'none';
    historyButton.style.opacity = '0.4';
  }
}

export function setEnter() {
  const button = document.querySelector('#login') as HTMLElement;
  document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
      if (button.style.display !== 'none') {
        handleLogin('login');
      } else {
        handleLogin('register');
      }
    }
  })
}