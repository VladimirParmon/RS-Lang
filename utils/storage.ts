interface StorageObject {
  bookGroup: number;
  bookPage: number;
  totalPages: number;
  totalGroups: number;
  totalGames: number;
  itemsPerGroup: number;
  timeLimit: number;
  isPageListOpen?: boolean;
  isGroupListOpen?: boolean;
  isGamesListOpen?: boolean;
  isMenuOpen?: boolean;
  difficultyLevels: DifficultyLevels;
  currentGameQueue: ReducedWordInfo[];
  currentDifficulty: number;
  currentOptions: string[];
  currentPage: string;
  workingArray: ReducedWordInfo[];
  singleVariant: ReducedWordInfo;
  rightAnswer: ReducedWordInfo;
  onlyOnePage?: boolean;
  onlyOnePageTemplate: ReducedWordInfo[];
  secondsInterval?: NodeJS.Timeout;
  msInterval?: NodeJS.Timeout;
  endGameResults: {
    right: ReducedWordInfo[];
    wrong: ReducedWordInfo[];
  };
  currentGameMode?: string;
  abortController?: AbortController;
  isAuthorized?: boolean;
  isAuthMenuOpen?: boolean;
  userId?: string;
  token?: string;
  userName?: string;
  currentMainSlide: number;
  markedDifficult: string[];
  markedDeleted: string[];
  initialGameQueueLength?: number
}

let storageObject: StorageObject = {
  bookGroup: 0,
  bookPage: 0,
  totalGroups: 6,
  totalGames: 4,
  totalPages: 30,
  itemsPerGroup: 20,
  timeLimit: 30,
  difficultyLevels: {},
  currentGameQueue: [],
  currentDifficulty: 0,
  currentOptions: [],
  currentPage: 'home',
  workingArray: [],
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
  markedDifficult: [],
  markedDeleted: [],
  endGameResults: {
    right: [],
    wrong: []
  },
  onlyOnePageTemplate: [],
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
      key === 'currentDifficulty' ||
      key === 'currentMainSlide' ||
      key === 'initialGameQueueLength'
    ) {
      target[key] = value;
    }
    if ( //boolean
      key === 'isPageListOpen' ||
      key === 'isGroupListOpen' ||
      key === 'isGamesListOpen' ||
      key === 'isMenuOpen' ||
      key === 'onlyOnePage' ||
      key === 'isAuthorized' ||
      key === 'isAuthMenuOpen'
    ) {
      target[key] = value;
    }
    if ( //string or string[]
      key === 'currentGameMode' ||
      key === 'userId' ||
      key === 'token' ||
      key === 'userName' ||
      key === 'markedDifficult' ||
      key === 'markedDeleted' ||
      key === 'currentOptions' ||
      key === 'currentPage'
    ) {
      target[key] = value;
    }
    if ( //ReducedWordInfo or ReducedWordInfo[]
      key === 'currentGameQueue' ||
      key === 'workingArray' ||
      key === 'singleVariant' ||
      key === 'rightAnswer' ||
      key === 'onlyOnePageTemplate' ||
      key === 'endGameResults'
    ) {
      target[key] = value;
    }
    if ( //Abort controller
      key === 'abortController'
    ) {
      target[key] = value;
    }
    if ( //NodeJS.Timeout
      key === 'secondsInterval' ||
      key === 'msInterval'
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
  // storage.isAuthorized = local.isAuthorized;
  // storage.bookPage = local.bookPage;
  const entries = Object.entries(local);
  for (let i = 0; i < entries.length; i++) {
    const key = entries[i][0] as keyof StorageObject;
    const value = entries[i][1];
    if (
      (key === 'bookGroup' ||
      key === 'bookPage' ||
      key === 'currentDifficulty' ||
      key === 'currentMainSlide' ||
      key === 'initialGameQueueLength') && typeof value === 'number'
    ) {
      storage[key] = value;
    } else if (
      (key === 'isPageListOpen' ||
      key === 'isGroupListOpen' ||
      key === 'isGamesListOpen' ||
      key === 'isMenuOpen' ||
      key === 'onlyOnePage' ||
      key === 'isAuthorized' ||
      key === 'isAuthMenuOpen') && typeof value === 'boolean'
      ) {
        storage[key] = value;
      } else if (
        (key === 'currentGameMode' ||
        key === 'userId' ||
        key === 'token' ||
        key === 'userName' || 
        key === 'currentPage') && typeof value === 'string'
      ) {
        storage[key] = value;
      } else if (
        (key === 'markedDifficult' ||
        key === 'markedDeleted' ||
        key === 'currentOptions') && (Array.isArray(value) && value.every((el) => typeof el === 'string'))
      ) {
        storage[key] = value;
      } else if (
        (key === 'singleVariant' ||
        key === 'rightAnswer') && isX(value)
      ) {
        storage[key] = value;
      } else if (
        (key === 'currentGameQueue' ||
        key === 'workingArray' ||
        key === 'onlyOnePageTemplate' ||
        key === 'endGameResults') && isY(value)
      ) {
        storage[key] = value;
      } else if (key === 'abortController' && isZ(value)) {
        storage[key] = value;
      } else if (
        (key === 'secondsInterval' || 
        key === 'msInterval') && isH(value)
        ) {
          storage[key] = value;
        }
    function isX(x: any): x is ReducedWordInfo {
      return true;
    }
    function isY(y: any): y is ReducedWordInfo[] & { right: ReducedWordInfo[]; wrong: ReducedWordInfo[] }{
      return true;
    }
    function isZ(z: any): z is AbortController {
      return true
    }
    function isH(h: any): h is NodeJS.Timeout {
      return true
    }
  }
  storageObject = JSON.parse(localStorageInit);
}

// export let storageObject: StorageObject = {
//   bookGroup: 0,
//   bookPage: 0,
//   totalGroups: 6,
//   totalGames: 4,
//   totalPages: 30,
//   itemsPerGroup: 20,
//   timeLimit: 30,
//   isPageListOpen: false,
//   isGroupListOpen: false,
//   isGamesListOpen: false,
//   isMenuOpen: false,
//   difficultyLevels: {},
//   currentGameQueue: [],
//   currentDifficulty: 0,
//   currentOptions: [],
//   workingArray: [],
//   onlyOnePage: false,
//   onlyOnePageTemplate: [],
//   singleVariant: {
//     id: '',
//     word: '',
//     translate: '',
//     image: '',
//     audio: '',
//     transcription: ''
//   },
//   rightAnswer: {
//     id: '',
//     word: '',
//     translate: '',
//     image: '',
//     audio: '',
//     transcription: ''
//   },
//   endGameResults: {
//     right: [],
//     wrong: []
//   },
//   currentGameMode: '',
//   isAuthorized: false,
//   isAuthMenuOpen: false,
//   currentMainSlide: 1,
//   markedDifficult: [],
//   markedDeleted: []
// }