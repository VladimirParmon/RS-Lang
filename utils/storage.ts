

interface StorageObject {
  bookGroup: number,
  bookPage: number,
  totalPages: number,
  totalGroups: number,
  totalGames: number,
  itemsPerGroup: number,
  timeLimit: number,
  isPageListOpen: boolean,
  isGroupListOpen: boolean,
  isGamesListOpen: boolean,
  isMenuOpen: boolean
  difficultyLevels: DifficultyLevels,
  currentGameQueue: ReducedWordInfo[],
  currentDifficulty: number,
  currentOptions: string[],
  workingArray: ReducedWordInfo[],
  singleVariant: ReducedWordInfo,
  rightAnswer: ReducedWordInfo,
  onlyOnePage: boolean,
  onlyOnePageTemplate: ReducedWordInfo[],
  secondsInterval?: NodeJS.Timeout,
  msInterval?: NodeJS.Timeout,
  endGameResults: {
    right: ReducedWordInfo[],
    wrong: ReducedWordInfo[]
  },
  currentGameMode: string,
  abortController?: AbortController,
  isAuthorized: boolean,
  isAuthMenuOpen: boolean,
  userId?: string,
  token?: string,
  userName?: string,
  currentMainSlide: number,
}

export let storage: StorageObject = {
  bookGroup: 0,
  bookPage: 0,
  totalGroups: 6,
  totalGames: 4,
  totalPages: 30,
  itemsPerGroup: 20,
  timeLimit: 30,
  isPageListOpen: false,
  isGroupListOpen: false,
  isGamesListOpen: false,
  isMenuOpen: false,
  difficultyLevels: {},
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
  isAuthorized: false,
  isAuthMenuOpen: false,
  currentMainSlide: 1
}

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