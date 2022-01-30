import { getAllWords } from "../utils/api"
import { getRandomInt, shuffle } from "../utils/misc";
import { ReducedWordInfo, storage } from "../utils/storage";

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
  if (storage.currentGameQueue.length <= storage.itemsPerGroup) {
    storage.currentGameQueue = [...shuffle(storage.difficultyLevels[difficulty])];
  }
  return true
}

export const prepareData = () => {
  const howManyVariants = 4;
  const difficulty = storage.currentDifficulty;
  const theWord = storage.currentGameQueue.pop();
  let variants: ReducedWordInfo[] = [];
  for (let i = 0; i < howManyVariants; i++) {
    const num = getRandomInt(0, storage.itemsPerGroup - 1);
    if (storage.onlyOnePage) {
      if (storage.onlyOnePageTemplate[num] !== theWord && 
        !variants.includes(storage.onlyOnePageTemplate[num])) {
        variants.push(storage.onlyOnePageTemplate[num])
      } else {
        i--;
      }
    } else {
      if (storage.difficultyLevels[difficulty][num] !== theWord && 
        !variants.includes(storage.difficultyLevels[difficulty][num])) {
        variants.push(storage.difficultyLevels[difficulty][num])
      } else {
        i--;
      }
    }
  }
  if (theWord) {
    storage.rightAnswer = theWord;
    storage.singleVariant = variants[0];
    storage.workingArray = shuffle([theWord, ...variants]);
  }
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