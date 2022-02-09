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
  initialGameQueueLength: number,
  currentGameMode: string;
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
  initialGameQueueLength: 0
}

let storageObject: StorageObject = {
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