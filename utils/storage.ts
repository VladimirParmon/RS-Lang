

interface StorageObject {
  bookGroup: number,
  bookPage: number,
  totalPages: number,
  totalGroups: number,
  totalGames: number,
  itemsPerGroup: number,
  isPageListOpen: boolean,
  isGroupListOpen: boolean,
  isGamesListOpen: boolean,
  isMenuOpen: boolean
  difficultyLevels: DifficultyLevels,
  currentGameQueue: ReducedWordInfo[],
  currentDifficulty: number,
  currentOptions: string[],
  workingArray: ReducedWordInfo[],
  rightAnswer: ReducedWordInfo,
  onlyOnePage: boolean,
  onlyOnePageTemplate: ReducedWordInfo[]
}

export let storage: StorageObject = {
  bookGroup: 0,
  bookPage: 0,
  totalGroups: 6,
  totalGames: 4,
  totalPages: 30,
  itemsPerGroup: 20,
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
  rightAnswer: {
    id: '',
    word: '',
    translate: '',
    image: '',
    audio: '',
    transcription: ''
  }
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