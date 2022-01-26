import { storage, WordInfo, ReducedWordInfo } from "./storage";

const baseURL = 'https://rs-lang-redblooded.herokuapp.com';
export const filesUrl = 'https://raw.githubusercontent.com/vladimirparmon/react-rslang-be/master'

const words = `${baseURL}/words`;
const users = `${baseURL}/users`;

export const getWords = async (group: number, page: number) => {
  const response = await fetch(`${words}?group=${group}&page=${page}`);
  return await response.json();
}

export const getAllWords = async (group: number) => {
  let result: ReducedWordInfo[] = [];
  for (let i=0; i < storage.totalPages; i++) {
    const info = await getWords(group, i);
    const page = info.map((el: WordInfo) => {
      return {
        id: el.id,
        word: el.word,
        translate: el.wordTranslate,
        audio: el.audio,
        image: el.image
      }
    })
    result.push(...page)
  }
  return result;
}