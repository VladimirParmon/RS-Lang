interface StorageObject {
  bookGroup: number,
  bookPage: number,
  totalPages: number,
  totalGroups: number,
  isPageListOpen: boolean,
  isMenuOpen: boolean
}

export let storage: StorageObject = {
  bookGroup: 0,
  bookPage: 0,
  totalPages: 29,
  totalGroups: 5,
  isPageListOpen: false,
  isMenuOpen: false
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