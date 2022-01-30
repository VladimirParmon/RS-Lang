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

export function removeFooter() {
  const root = document.querySelector('body');
  const footer = document.querySelector('footer');
  if (root && footer) root.removeChild(footer);
}