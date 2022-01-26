import { filesUrl } from "../utils/api"
import { storage } from "../utils/storage";
import { capitalize } from "../utils/misc";
import { checkChoice } from "../utils/checks";
import { prepareData } from "./getData";
import { router } from "../navigation/router";

export function runAudioGame() {

  prepareData();

  storage.workingArray.forEach((el, i) => {
    storage.currentOptions.push(el.id);
    const optionsContainer = document.querySelector(`#audioGameOptions`);
    const option = document.createElement('div');
    option.id = `audioGameOption-${el.id}`;
    option!.innerHTML = capitalize(el.translate);
    option?.addEventListener('click', () => {
      checkChoice(el.id);
    })
    optionsContainer?.appendChild(option);
  }) 

  const audioBite = new Audio;
  audioBite.src = `${filesUrl}/${storage.rightAnswer.audio}`;
  audioBite.play();
}

export function runAudioAnimation(id: string) {
  const buttonsDiv = document.querySelector('#audioGameOptions') as HTMLElement;
  buttonsDiv.style.pointerEvents = 'none';
  const buttonPressed = document.querySelector(`#audioGameOption-${id}`) as HTMLElement;
  buttonPressed.style.transform = 'scale(1.07)';
  const roundButton = document.querySelector('#repeatAudio') as HTMLElement;
  setTimeout(() => {
    buttonsDiv.style.opacity = '0';
    roundButton.style.width = '500px'
    roundButton.style.height = '300px';
    roundButton.style.borderRadius = '0';
    roundButton.style.backgroundImage = `url(${filesUrl}/${storage.rightAnswer.image})`;

    const nextQuestionButton = document.createElement('div');
    nextQuestionButton.id = 'nextAudioQuestion';
    nextQuestionButton.innerHTML = '→';

    setTimeout(() => {
      buttonsDiv.innerHTML = `
        <div>${storage.rightAnswer.word}</div>
        <div>${storage.rightAnswer.transcription}</div>
        <div>${storage.rightAnswer.translate}</div>
      `;
      buttonsDiv.appendChild(nextQuestionButton);
      nextQuestionButton.addEventListener('click', () => {
        roundButton.style.width = '150px'
        roundButton.style.height = '150px';
        roundButton.style.borderRadius = '50%';
        setTimeout(() => {
          roundButton.style.backgroundImage = `url(assets/svg/sound.svg)`;
          buttonsDiv.innerHTML = ``;
          runAudioGame();
        }, 500);
      });
      buttonsDiv.style.opacity = '1';
      buttonsDiv.style.pointerEvents = 'all';
    }, 500)
  }, 2000)
} 
