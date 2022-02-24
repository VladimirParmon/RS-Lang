import { getUserSettings, putUserSettings, putUserStatistics, putUserStatisticsInit } from "./api"
import { getDate } from "./misc";

interface StorageObject {
  bookGroup: number;
  bookPage: number;
  difficultyLevels: DifficultyLevels;
  currentPage: string;
  isAuthorized?: boolean;
  userId?: string;
  token?: string;
  userName?: string;
  currentMainSlide: number;
  markedDifficult: string[];
  markedDeleted: string[];
}

interface DoesNotNeedToBeStoredLocally {
  totalPages: number;
  totalGroups: number;
  totalGames: number;
  itemsPerGroup: number;
  timeLimit: number;
  isPageListOpen: boolean;
  isGroupListOpen: boolean;
  isGamesListOpen: boolean;
  isMenuOpen: boolean;
  currentGameQueue: ReducedWordInfo[];
  currentDifficulty: number;
  currentOptions: string[];
  workingArray: ReducedWordInfo[];
  singleVariant: ReducedWordInfo;
  rightAnswer: ReducedWordInfo;
  onlyOnePage: boolean;
  onlyOnePageTemplate: ReducedWordInfo[];
  secondsInterval?: NodeJS.Timeout;
  msInterval?: NodeJS.Timeout;
  endGameResults: {
    right: ReducedWordInfo[];
    wrong: ReducedWordInfo[];
  };
  abortController?: AbortController;
  initialGameQueueLength: number;
  currentGameMode: string;
  animation: number,
  currentBirdStatus: string
}

interface ServerInfoObject {
  deleted: List,
  difficult: List,
  howManyInARow: HowMany,
  howManyWrong: HowMany,
  howManyRight: HowMany,
  learnt: List
}

export interface StatisticsInfo {
  [key: string]: Statistics
}

export interface Statistics {
  totalRight: number,
  totalWrong: number,
  inARowMax: number,
  learnt: number,
  new: number
}

interface List {
  [key: string]: boolean | number
}

interface HowMany {
  [key: string]: number
}

export let serverInfoObject: ServerInfoObject = {
  deleted: {
    '': true
  },
  difficult: {
    '': true
  },
  learnt: {
    '': true
  },
  howManyInARow: {
    '': 0
  },
  howManyRight: {
    '':0
  },
  howManyWrong: {
    '': 0  
  }
}

export function manageServerInfo(wordId: string, whatToChange: keyof ServerInfoObject, whatToDo: string, num?: string) {
  function newWordCheck() {
    const allFields = Object.keys(serverInfoObject).length
    let acc = 0;
    for (let key in serverInfoObject) {
      const x = key as keyof ServerInfoObject;
      if (!Object.keys(serverInfoObject[x]).includes(wordId)) {
        acc++;
      }
    }
    if (allFields === acc) return true;
    return false;
  }
  const check = newWordCheck();
  if (check) {
    statistics.new = statistics.new + 1
  }
  if (whatToDo === 'add') {
    if (whatToChange === "learnt" && !Object.keys(serverInfoObject[whatToChange]).includes(wordId)) {
      statistics.learnt = statistics.learnt + 1
    }
    serverInfoObject[whatToChange][wordId] = true;
  } else if (whatToDo === 'remove') {
    serverInfoObject[whatToChange][wordId] = false;
  } else if (num) {
    if (whatToDo === 'raise') {
      if (whatToChange === 'howManyRight') {
        statistics.totalRight = statistics.totalRight + 1
      } else if (whatToChange === 'howManyWrong') {
        statistics.totalWrong = statistics.totalWrong + 1
      }
    }
    serverInfoObject[whatToChange][wordId] = Number(num);
    // if (whatToDo === 'raise' && whatToChange === 'howManyInARow') {
    //   const currentHighest = statistics.inARowMax
    //   console.log(currentHighest, num)
    //   if (currentHighest < Number(num)) {
    //     statistics.inARowMax = Number(num);
    //   }
    // }
    if (whatToDo === 'raise' && whatToChange === 'howManyInARow') {
      statistics.inARowMax = statistics.inARowMax + 1
    }
    if (whatToDo === 'raise' && whatToChange === 'howManyInARow' && ((+num >= 3 && !serverInfoObject.difficult[wordId]) || +num >= 5)) {
      serverInfoObject.learnt[wordId] = true;
    } else if (whatToDo === 'lower') {
      if (Object.keys(serverInfoObject.learnt).includes(wordId)) serverInfoObject.learnt[wordId] = false;
      serverInfoObject.howManyInARow[wordId] = 0;
      statistics.inARowMax = 0;
    }
  }
  rewriteWholePackage();
  putUserSettings();
  putUserStatistics();
}

export function rewriteServerInfo(info: ServerInfoObject) {
  serverInfoObject = info
}

// let prevDaysKeys: string[] = [];
// let prevDaysValues: Statistics[] = [];
export let wholePackage: StatisticsInfo = {}

export function rewriteWholePackage() {
  const date = getDate();
  wholePackage[date] = statistics;
}

export function rewriteStatistics(info: StatisticsInfo) {
  let prevDaysKeys = Object.keys(info);
  let prevDaysValues = Object.values(info);
  const date = getDate();
  prevDaysKeys.forEach((key, i) => {
    wholePackage[key] = prevDaysValues[i]
  })
  wholePackage[date] = statistics;
  // if (!info[date]) {
  //   putUserStatistics(info);
  // } else {
  //   statistics = info[date];
  // }
  if (info[date]) statistics = info[date];
}

export let statistics: Statistics = {
  totalRight: 0,
  totalWrong: 0,
  inARowMax: 0,
  learnt: 0,
  new: 0
}

export let storageT: DoesNotNeedToBeStoredLocally = {
  totalGroups: 6,
  totalGames: 4,
  totalPages: 30,
  itemsPerGroup: 20,
  timeLimit: 30,
  isPageListOpen: false,
  isGroupListOpen: false,
  isGamesListOpen: false,
  isMenuOpen: false,
  currentGameQueue: [],
  currentDifficulty: 0,
  currentOptions: [],
  workingArray: [],
  onlyOnePage: false,
  onlyOnePageTemplate: [],
  singleVariant: {
    id: '',
    word: '',
    translate: '',
    image: '',
    audio: '',
    transcription: ''
  },
  rightAnswer: {
    id: '',
    word: '',
    translate: '',
    image: '',
    audio: '',
    transcription: ''
  },
  endGameResults: {
    right: [],
    wrong: []
  },
  currentGameMode: '',
  initialGameQueueLength: 0,
  animation: 0,
  currentBirdStatus: 'flies'
}

export let storageObject: StorageObject = {
  bookGroup: 0,
  bookPage: 0,
  difficultyLevels: {},
  currentPage: 'home',
  markedDifficult: [],
  markedDeleted: [],
  currentMainSlide: 1
};

export let storage = new Proxy(storageObject, {
  set: function (
    target: StorageObject,
    key: keyof StorageObject,
    value
  ) {
    if ( //number
      key === 'bookGroup' ||
      key === 'bookPage' ||
      key === 'currentMainSlide'
    ) {
      target[key] = value;
    }
    if ( //boolean
      key === 'isAuthorized'
    ) {
      target[key] = value;
    }
    if ( //string or string[]
      key === 'userId' ||
      key === 'token' ||
      key === 'userName' ||
      key === 'markedDifficult' ||
      key === 'markedDeleted' ||
      key === 'currentPage'
    ) {
      target[key] = value;
    }
    localStorage.setItem('myStorage', JSON.stringify(target));
    return true;
  }
});

export interface WordInfo {
  id: string,
  group: 0,
  page: 0,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
}

interface DifficultyLevels {
  [key: number]: ReducedWordInfo[]
}

export interface ReducedWordInfo {
  id: string,
  word: string,
  translate: string,
  image: string,
  audio: string,
  transcription: string
}

export interface LoginResponse {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string
}

export interface RegistrationResponse {
  email: string,
  id: string,
  name: string
}

export interface UserInfo {
  name?: string,
  email: string,
  password: string
}

const localStorageInit = localStorage.getItem('myStorage');
if (localStorageInit !== null) {
  const local = JSON.parse(localStorageInit);
  const entries = Object.entries(local);
  for (let i = 0; i < entries.length; i++) {
    const key = entries[i][0] as keyof StorageObject;
    const value = entries[i][1];
    if (
      (key === 'bookGroup' ||
      key === 'bookPage' ||
      key === 'currentMainSlide') && typeof value === 'number'
    ) {
      storage[key] = value;
    } else if (
      (key === 'isAuthorized') && typeof value === 'boolean'
      ) {
        storage[key] = value;
      } else if (
        (key === 'userId' ||
        key === 'token' ||
        key === 'userName' || 
        key === 'currentPage') && typeof value === 'string'
      ) {
        storage[key] = value;
      } else if (
        (key === 'markedDifficult' ||
        key === 'markedDeleted') && (Array.isArray(value) && value.every((el) => typeof el === 'string'))
      ) {
        storage[key] = value;
      }
  }
}

//putUserSettings();
//putUserStatisticsInit();
  
