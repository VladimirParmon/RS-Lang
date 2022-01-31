import { ReducedWordInfo } from "./storage";
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
  const footer = document.createElement('footer');
  footer.innerHTML = `
  <span onclick="window.open('https://ru.wikipedia.org/wiki/2022_%D0%B3%D0%BE%D0%B4','mywindow')">2022</span> 
  <span onclick="window.open('https://github.com/VladimirParmon','mywindow')">Vladimir Parmon</span>
  <img onclick="window.open('https://rs.school/js/','mywindow')" src="assets/svg/rs_school_js.svg" alt="rsSchool">
  `
  if(!footer && root) root.appendChild(footer);
}

export function removeFooter() {
  const root = document.querySelector('body');
  const footer = document.querySelector('footer');
  if (root && footer) root.removeChild(footer);
}