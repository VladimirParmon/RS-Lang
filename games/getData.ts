import { getAllWords, getWords } from "../utils/api"
import { getRandomInt, shuffle } from "../utils/misc";
import { ReducedWordInfo, storage } from "../utils/storage";
import { runAudioGame } from "./audioChallenge";

export const getData = async () => {
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
  }
  return true
}

export const prepareData = () => {
  const howManyVariants = 4;
  const difficulty = storage.currentDifficulty;
  const theWord = storage.currentGameQueue.pop();
  let variants = []
  for (let i = 0; i < howManyVariants; i++) {
    const num = getRandomInt(0, storage.itemsPerGroup - 1);
    if (storage.onlyOnePage) {
      if (storage.onlyOnePageTemplate[num] !== theWord) {
        variants.push(storage.onlyOnePageTemplate[num])
      } else {
        i--;
      }
    } else {
      if (storage.difficultyLevels[difficulty][num] !== theWord) {
        variants.push(storage.difficultyLevels[difficulty][num])
      } else {
        i--;
      }
    }
  }
    //const randomNumber = storage.onlyOnePage ? getRandomInt(0, storage.itemsPerGroup) : getRandomInt(0, storage.totalPages * storage.itemsPerGroup);
    
    //const variants = storage.onlyOnePage ? storage.onlyOnePageTemplate.slice(randomNumber, randomNumber + howManyVariants) : storage.difficultyLevels[difficulty].slice(randomNumber, randomNumber + howManyVariants);
  
    if (theWord) {
      storage.rightAnswer = theWord;
      storage.workingArray = shuffle([theWord, ...variants]);
    }
  // }
}

export const getSinglePageData = async () => {
  const difficulty = storage.bookGroup;
  let info;
    try {
      info = await getAllWords(difficulty, 'single');
    } finally {
      if (info) {
        storage.onlyOnePageTemplate = info;
        storage.currentGameQueue = [...shuffle(info)];
      }
    }
  return true
}