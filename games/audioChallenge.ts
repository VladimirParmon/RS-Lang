import { getAllWords, filesUrl } from "../utils/api"
import { hideLoader, showLoader } from "../utils/loader";
import { storage, ReducedWordInfo } from "../utils/storage";

function shuffle (array: ReducedWordInfo[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalize (string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export const audioGame = async () => {
  const difficulty = storage.currentDifficulty;
  let info;
  if (Object.keys(storage.difficultyLevels).length === 0) {
    try {
      info = await getAllWords(difficulty);
    } finally {
      if (info) storage.difficultyLevels[difficulty] = shuffle(info);
    }
  } 
  if (storage.currentGameQueue.length === 0) {
    storage.currentGameQueue = [...shuffle(storage.difficultyLevels[difficulty])];
    //runAudioGame();
  }
  return true
}

export function runAudioGame() {
  const howManyVariants = 4;
  const difficulty = storage.currentDifficulty;
  const randomNumber = getRandomInt(0, storage.totalPages * storage.pagesPerGroup)
  const theWord = storage.currentGameQueue.pop();
  const variants = storage.difficultyLevels[difficulty].slice(randomNumber, randomNumber + howManyVariants);
  let workingArray: ReducedWordInfo[] = [];
  if (theWord) {
    storage.rightAnswer = theWord;
    workingArray = shuffle([theWord, ...variants]);
  }
    
  workingArray.forEach((el, i) => {
    const option = document.querySelector(`#audioGameOption-${i}`);
    option!.innerHTML = capitalize(el.translate);
  })

  const audioBite = new Audio;
  audioBite.src = `${filesUrl}/${theWord?.audio}`;
  audioBite.play();
}

export function checkChoice(content: string | null) {
  const audioBite = new Audio;
  if (content?.toUpperCase() === storage.rightAnswer.translate.toUpperCase()) {
    audioBite.src = './assets/sounds/rightAnswer.mp3'
  } else {
    audioBite.src = './assets/sounds/wrongAnswer.mp3'
  }
  audioBite.play();
}