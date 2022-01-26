import { storage } from "./storage";
import { runAudioAnimation } from "../games/audioChallenge";

export function checkKeys (code: string) {
  const wrapperGames = document.querySelector('.wrapperGames');
  const index = +code.slice(-1) - 1;
  if (wrapperGames && index < 5) {
    checkChoice(storage.currentOptions[index])
  }
}

export function checkChoice(id: string | null) {
  const buttonPressed = document.querySelector(`#audioGameOption-${id}`) as HTMLElement;
  const audioBite = new Audio;
  if (id === storage.rightAnswer.id) {
    audioBite.src = './assets/sounds/rightAnswer.mp3';
    buttonPressed.style.backgroundColor = 'var(--trio3)';
  } else {
    audioBite.src = './assets/sounds/wrongAnswer.mp3'
    buttonPressed.style.backgroundColor = 'var(--wrong)';
  }
  audioBite.play();

  if (id) runAudioAnimation(id);
}