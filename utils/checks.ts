import { manageServerInfo, serverInfoObject, storage, storageT } from "./storage";
import { runAudioAnimation, runAudioGame } from "../games/audioChallenge";
import { checkFor } from "../utils/misc";
import { runSniper, startSniperAnimation } from "../games/sniper";
import { updateIndicator } from "./indicator";

export function checkKeys (code: string) {
  const wrapperGames = document.querySelector('.wrapperGames');
  const index = +code.slice(-1) - 1;
  if (wrapperGames && index < 5) {
    window.removeEventListener('keyup', checkFor);
    checkChoice(storageT.currentOptions[index])
  }
}

export function checkChoice(id: string | null) {
  const buttonPressed = document.querySelector(`#gameOption-${id}`) as HTMLElement;
  const audioBite = new Audio;
  const wrapper = document.querySelector(`#wrapper-${storageT.currentGameMode}`)
  if (wrapper) {
    if (id === storageT.rightAnswer.id) {
      if (storageT.currentGameMode === 'sniper') storageT.currentBirdStatus = 'dead';
      const inARowData = serverInfoObject.howManyInARow[storageT.rightAnswer.id];
      const inARow = inARowData ? inARowData : 0;
      manageServerInfo(storageT.rightAnswer.id, 'howManyInARow', 'raise', (inARow + 1).toString());
  
      const totalRightAnswersData = serverInfoObject.howManyRight[storageT.rightAnswer.id];
      const totalRightAnswers = totalRightAnswersData ? totalRightAnswersData : 0;
      manageServerInfo(storageT.rightAnswer.id, 'howManyRight', 'raise', (totalRightAnswers + 1).toString());
  
      storageT.endGameResults.right.push(storageT.rightAnswer);
      audioBite.src = './assets/sounds/rightAnswer.mp3';
      if (buttonPressed) buttonPressed.style.backgroundColor = 'var(--trio3)';
    } else {
      if (storageT.currentGameMode === 'sniper') storageT.currentBirdStatus = 'escaped';
      manageServerInfo(storageT.rightAnswer.id, 'howManyInARow', 'lower', '0');
  
      const totalWrongAnswersData = serverInfoObject.howManyWrong[storageT.rightAnswer.id];
      const totalWrongAnswers = totalWrongAnswersData ? totalWrongAnswersData : 0;
      manageServerInfo(storageT.rightAnswer.id, 'howManyWrong', 'raise', (totalWrongAnswers + 1).toString());
      
      storageT.endGameResults.wrong.push(storageT.rightAnswer);
      audioBite.src = './assets/sounds/wrongAnswer.mp3'
      if (buttonPressed) buttonPressed.style.backgroundColor = 'var(--wrong)';
    }
    audioBite.play();
  
    if (id) {
      switch(storageT.currentGameMode) {
        case 'audio': runAudioAnimation(id);
        break;
        // case 'sniper': {
        //   if (storageT.onlyOnePage) updateIndicator();
        // }
      }
    }
  }
}