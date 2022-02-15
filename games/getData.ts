import { getAllWords } from '../utils/api';
import { getRandomInt, shuffle } from '../utils/misc';
import { ReducedWordInfo, serverInfoObject, storage, storageT } from '../utils/storage';

export const getData = async () => {
  const difficulty = storageT.currentDifficulty;
  let info;
  if (!Object.keys(storage.difficultyLevels).includes(difficulty.toString())) {
    try {
      info = await getAllWords(difficulty);
    } finally {
      if (info) storage.difficultyLevels[difficulty] = shuffle(info);
    }
  }
  if (storageT.currentGameQueue.length <= storageT.itemsPerGroup) {
    storageT.currentGameQueue = [
      ...shuffle(storage.difficultyLevels[difficulty])
    ];
  }
  return true;
};

export const prepareData = () => {
  const howManyVariants = 4;
  const difficulty = storageT.currentDifficulty;
  const theWord = storageT.currentGameQueue.pop();
  let variants: ReducedWordInfo[] = [];
  for (let i = 0; i < howManyVariants; i++) {
    const num = getRandomInt(0, storageT.itemsPerGroup - 1);
    if (storageT.onlyOnePage) {
      if (
        storageT.onlyOnePageTemplate[num] !== theWord &&
        !variants.includes(storageT.onlyOnePageTemplate[num])
      ) {
        variants.push(storageT.onlyOnePageTemplate[num]);
      } else {
        i--;
      }
    } else {
      if (
        storage.difficultyLevels[difficulty][num] !== theWord &&
        !variants.includes(storage.difficultyLevels[difficulty][num])
      ) {
        variants.push(storage.difficultyLevels[difficulty][num]);
      } else {
        i--;
      }
    }
  }
  if (theWord) {
    storageT.rightAnswer = theWord;
    storageT.singleVariant = variants[0];
    storageT.workingArray = shuffle([theWord, ...variants]);
  }
};

export const getSinglePageData = async () => {
  const difficulty = storage.bookGroup;
  let info;
  try {
    info = await getAllWords(difficulty, 'single');
  } finally {
    if (info) {
      const infoWithoutDeleted = info.filter((el) => {
        if (!serverInfoObject.deleted[el.id] && !serverInfoObject.learnt[el.id]) {
          return el;
        }
      });
      storageT.onlyOnePageTemplate = info;
      storageT.currentGameQueue = [...shuffle(infoWithoutDeleted)];
    }
  }

  return true;
};
