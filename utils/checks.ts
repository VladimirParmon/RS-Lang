import { manageServerInfo, serverInfoObject, storage, storageT } from "./storage";
import { runAudioAnimation, runAudioGame } from "../games/audioChallenge";
import { checkFor } from "../utils/misc";

export function checkKeys (code: string) {
  const wrapperGames = document.querySelector('.wrapperGames');
  const index = +code.slice(-1) - 1;
  if (wrapperGames && index < 5) {
    window.removeEventListener('keyup', checkFor);
    checkChoice(storageT.currentOptions[index])
  }
}

export function checkChoice(id: string | null) {
  const buttonPressed = document.querySelector(`#audioGameOption-${id}`) as HTMLElement;
  const audioBite = new Audio;
  if (id === storageT.rightAnswer.id) {
    const inARowData = serverInfoObject.howManyInARow[storageT.rightAnswer.id];
    const inARow = inARowData ? inARowData : 0;
    manageServerInfo(storageT.rightAnswer.id, 'howManyInARow', 'raise', (inARow + 1).toString());

    const totalRightAnswersData = serverInfoObject.howManyRight[storageT.rightAnswer.id];
    const totalRightAnswers = totalRightAnswersData ? totalRightAnswersData : 0;
    manageServerInfo(storageT.rightAnswer.id, 'howManyRight', 'raise', (totalRightAnswers + 1).toString());

    storageT.endGameResults.right.push(storageT.rightAnswer);
    audioBite.src = './assets/sounds/rightAnswer.mp3';
    buttonPressed.style.backgroundColor = 'var(--trio3)';
  } else {
    manageServerInfo(storageT.rightAnswer.id, 'howManyInARow', 'lower', '0');

    const totalWrongAnswersData = serverInfoObject.howManyWrong[storageT.rightAnswer.id];
    const totalWrongAnswers = totalWrongAnswersData ? totalWrongAnswersData : 0;
    manageServerInfo(storageT.rightAnswer.id, 'howManyWrong', 'raise', (totalWrongAnswers + 1).toString());
    
    storageT.endGameResults.wrong.push(storageT.rightAnswer);
    audioBite.src = './assets/sounds/wrongAnswer.mp3'
    buttonPressed.style.backgroundColor = 'var(--wrong)';
  }
  audioBite.play();

  if (id) runAudioAnimation(id);
}