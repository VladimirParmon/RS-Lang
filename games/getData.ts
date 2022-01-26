import { getAllWords } from "../utils/api"
import { getRandomInt, shuffle } from "../utils/misc";
import { storage } from "../utils/storage";

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
  const randomNumber = getRandomInt(0, storage.totalPages * storage.pagesPerGroup)
  const theWord = storage.currentGameQueue.pop();
  const variants = storage.difficultyLevels[difficulty].slice(randomNumber, randomNumber + howManyVariants);

  if (theWord) {
    storage.rightAnswer = theWord;
    storage.workingArray = shuffle([theWord, ...variants]);
  }
}