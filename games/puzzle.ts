import { getSingleWord } from "../utils/api";
import { shuffleStrings } from "../utils/misc";
import { storageT } from "../utils/storage";
import { prepareData } from "./getData";

export async function runPuzzle() {
  const socketsWrapper = document.querySelector('#sockets') as HTMLElement;
  const blocksWrapper = document.querySelector('#blocks') as HTMLElement;

  // prepareData();
  // let response = await getSingleWord(storageT.rightAnswer.id);
  // let phraseArray = response.textExample.split(' ');
  // let mixedArray = shuffleStrings(phraseArray);
  const phraseArray = ['word1', 'another2', 'lorum3', 'ipum4', 'huilonossimo5']
  const mixedArray = ['lorum3', 'ipum4', 'huilonossimo5', 'word1', 'another2']

  phraseArray.forEach((word: string) => {
    const wordSocket = document.createElement('div');
    wordSocket.id = `socket-${word}`;
    wordSocket.classList.add('socketBox');
    wordSocket.addEventListener("dragenter", dragEnter);
    wordSocket.addEventListener("dragover", dragOver);
    wordSocket.addEventListener("dragleave", dragLeave);
    wordSocket.addEventListener("drop", dragDrop);
    socketsWrapper.appendChild(wordSocket);
  })

  mixedArray.forEach((word: string) => {
    const wordPiece = document.createElement('div');
    wordPiece.draggable = true;
    wordPiece.id = `piece-${word}`;
    wordPiece.classList.add('draggableBox');
    wordPiece.innerHTML = word;
    wordPiece.addEventListener("dragstart", dragStart);
    blocksWrapper.appendChild(wordPiece);
  });
}

function dragStart(this: HTMLElement, e: DragEvent) {
  if (e.dataTransfer) {
    e.dataTransfer.setData('text/plain', this.id);
  }
}

function dragOver(e: DragEvent) {
  e.preventDefault();
}
function dragEnter() {
  console.log('dragEnter')
}
function dragLeave() {
  console.log('dragLeave')
}
function dragDrop(this: HTMLElement, e: DragEvent) {
  console.log('dragDrop')
  if (e.dataTransfer) {
    const droppedElementId = e.dataTransfer.getData('text/plain');
    const droppedElement = document.getElementById(droppedElementId)!;
    if (this.id.split('-')[1] === droppedElementId.split('-')[1]) {
      this.appendChild(droppedElement)
    }
  }
}