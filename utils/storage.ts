interface StorageObject {
  bookGroup: number,
  bookPage: number,
  totalPages: number,
  totalGroups: number,
  pagesPerGroup: number,
  isPageListOpen: boolean,
  isGroupListOpen: boolean,
  isMenuOpen: boolean
  difficultyLevels: DifficultyLevels,
  currentGameQueue: ReducedWordInfo[],
  currentDifficulty: number,
  currentOptions: string[],
  workingArray: ReducedWordInfo[],
  rightAnswer: ReducedWordInfo,
}

export let storage: StorageObject = {
  bookGroup: 0,
  bookPage: 0,
  totalPages: 30,
  totalGroups: 6,
  pagesPerGroup: 20,
  isPageListOpen: false,
  isGroupListOpen: false,
  isMenuOpen: false,
  difficultyLevels: {},
  currentGameQueue: [],
  currentDifficulty: 0,
  currentOptions: [],
  workingArray: [],
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