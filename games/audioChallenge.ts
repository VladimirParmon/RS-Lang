import { filesUrl } from "../utils/api"
import { storage } from "../utils/storage";
import { capitalize } from "../utils/misc";
import { checkChoice } from "../utils/checks";
import { prepareData } from "./getData";
import { checkFor } from "../utils/misc";

  // window.addEventListener('keydown', (el) => {
  //   checkKeys(el.code);
  // });

export function runAudioGame() {
  window.addEventListener('keyup', checkFor)

  prepareData();
  let intermediateArray: string[] = [];

  storage.workingArray.forEach((el, i) => {
    intermediateArray.push(el.id);
    const optionsContainer = document.querySelector(`#audioGameOptions`);
    const option = document.createElement('div');
    option.id = `audioGameOption-${el.id}`;
    option!.innerHTML = capitalize(el.translate);
    option?.addEventListener('click', () => {
      checkChoice(el.id);
    })
    optionsContainer?.appendChild(option);
  }) 
  storage.currentOptions = intermediateArray;

  const audioBite = new Audio;
  audioBite.src = `${filesUrl}/${storage.rightAnswer.audio}`;
  audioBite.play();
}

export function runAudioAnimation(id: string) {
  const buttonsDiv = document.querySelector('#audioGameOptions') as HTMLElement;
  const buttonPressed = document.querySelector(`#audioGameOption-${id}`) as HTMLElement;
  const roundButton = document.querySelector('#repeatAudio') as HTMLElement;

  buttonsDiv.style.pointerEvents = 'none';
  buttonPressed.style.transform = 'scale(1.07)';

  setTimeout(() => { // initial animation delay
    buttonsDiv.style.opacity = '0';
    roundButton.style.width = '500px'
    roundButton.style.height = '300px';
    roundButton.style.borderRadius = '0';
    roundButton.style.backgroundImage = `url(${filesUrl}/${storage.rightAnswer.image})`;

    const nextQuestionButton = document.createElement('div');
    nextQuestionButton.id = 'nextAudioQuestion';
    nextQuestionButton.innerHTML = '→';

    setTimeout(() => { //description reveal delay
      buttonsDiv.innerHTML = `
        <div>${storage.rightAnswer.word}</div>
        <div>${storage.rightAnswer.transcription}</div>
        <div>${storage.rightAnswer.translate}</div>
      `;
      buttonsDiv.appendChild(nextQuestionButton);

      nextQuestionButton.addEventListener('click', clicked);
      window.addEventListener('keyup', pressed);

      buttonsDiv.style.opacity = '1';
      buttonsDiv.style.pointerEvents = 'all';
    }, 500)

    function clicked() {
      nextQuestionButton.removeEventListener('click', clicked);
      goNext();
    };

    function pressed(e: KeyboardEvent) {
      if (e.code === 'Space') {
        window.removeEventListener('keyup', pressed)
        goNext()
      }
    };

    function goNext() { //to the next question delay
      roundButton.style.width = '150px'
      roundButton.style.height = '150px';
      roundButton.style.borderRadius = '50%';
      setTimeout(() => {
        roundButton.style.backgroundImage = `url(assets/svg/sound.svg)`;
        buttonsDiv.innerHTML = ``;
        runAudioGame();
      }, 200);
      }
  }, 600)
} 

