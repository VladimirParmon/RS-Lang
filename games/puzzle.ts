import { getSingleWord } from "../utils/api";
import { endGame } from "../utils/endGame";
import { updateIndicator } from "../utils/indicator";
import { shuffleStrings } from "../utils/misc";
import { manageServerInfo, serverInfoObject, storageT } from "../utils/storage";
import { prepareData } from "./getData";

let counter: number;
let attempts: number;

export async function runPuzzle() {
  const wrapper = document.querySelector('#wrapper-puzzle') as HTMLElement;
  const socketsWrapper = document.querySelector('#sockets') as HTMLElement;
  const blocksWrapper = document.querySelector('#blocks') as HTMLElement;
  const attemptsWrapper = document.querySelector('#attempts') as HTMLElement;
  attemptsWrapper.innerHTML = `
  <div></div>
  <div></div>
  <div></div>
  `
  socketsWrapper.innerHTML = '';
  blocksWrapper.innerHTML = '';

  prepareData();
  let response = await getSingleWord(storageT.rightAnswer.id);
  let phraseArray = response.textExample.split(' ');
  let mixedArray = shuffleStrings(phraseArray);
  counter = mixedArray.length;
  attempts = 0;
  // const phraseArray = ['word1', 'another2', 'lorum3', 'ipum4', 'huilonossimo5']
  // const mixedArray = ['lorum3', 'ipum4', 'huilonossimo5', 'word1', 'another2']

  mixedArray.forEach((word: string) => {
    const wordPiece = document.createElement('div');
    wordPiece.draggable = true;
    wordPiece.id = `piece-${word}`;
    wordPiece.classList.add('draggableBox');
    wordPiece.innerHTML = word;
    wordPiece.addEventListener("dragstart", dragStart);
    wordPiece.addEventListener('click', () => {
      checkClick(wordPiece.id);
    });
    blocksWrapper.appendChild(wordPiece);
  });

  for (let i=0; i<counter; i++) {
    const wordSocket = document.createElement('div');
    wordSocket.id = `socket-${phraseArray[i]}`;
    wordSocket.classList.add('socketBox');
    wordSocket.addEventListener("dragenter", dragEnter);
    wordSocket.addEventListener("dragover", dragOver);
    wordSocket.addEventListener("dragleave", dragLeave);
    wordSocket.addEventListener("drop", dragDrop);
    const piece = document.getElementById(`piece-${phraseArray[i]}`) as HTMLElement;
    const width = piece.offsetWidth;
    wordSocket.style.width = `${width}px`;
    socketsWrapper.appendChild(wordSocket);
  }
  setTimeout(() => {
    wrapper.classList.remove('invisible');
  }, 300)
}

function dragStart(this: HTMLElement, e: DragEvent) {
  if (e.dataTransfer) {
    e.dataTransfer.setData('text/plain', this.id);
  }
}

function dragOver(this: HTMLElement, e: DragEvent) {
  e.preventDefault();
  console.log('dragover')
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = "move"
  }
}

function dragEnter(this: HTMLElement, e: DragEvent) {
  e.preventDefault();
  this.classList.add('dragHover');
}

function dragLeave(this: HTMLElement, e: DragEvent) {
  e.preventDefault();
  this.classList.remove('dragHover');
}

function dragDrop(this: HTMLElement, e: DragEvent) {
  if (e.dataTransfer) {
    const droppedElementId = e.dataTransfer.getData('text/plain');
    const droppedElement = document.getElementById(droppedElementId)!;
    if (this.id.split('-')[1] === droppedElementId.split('-')[1]) {
      this.appendChild(droppedElement);
      droppedElement.classList.add('dragSet');
      counter--;
      playSound(true);
    } else {
      updateAttemptsIndicator();
      playSound(false);
    }
    this.classList.remove('dragHover');
    if (counter === 0) {
      goNext();
    }
  }
}

function goNext() {
  if (storageT.onlyOnePage) updateIndicator();
  if (attempts < 3) {
    const inARowData = serverInfoObject.howManyInARow[storageT.rightAnswer.id];
    const inARow = inARowData ? inARowData : 0;
    manageServerInfo(storageT.rightAnswer.id, 'howManyInARow', 'raise', (inARow + 1).toString());
    const totalRightAnswersData = serverInfoObject.howManyRight[storageT.rightAnswer.id];
    const totalRightAnswers = totalRightAnswersData ? totalRightAnswersData : 0;
    manageServerInfo(storageT.rightAnswer.id, 'howManyRight', 'raise', (totalRightAnswers + 1).toString());
    storageT.endGameResults.right.push(storageT.rightAnswer);
  } else {
    manageServerInfo(storageT.rightAnswer.id, 'howManyInARow', 'lower', '0');
    const totalWrongAnswersData = serverInfoObject.howManyWrong[storageT.rightAnswer.id];
    const totalWrongAnswers = totalWrongAnswersData ? totalWrongAnswersData : 0;
    manageServerInfo(storageT.rightAnswer.id, 'howManyWrong', 'raise', (totalWrongAnswers + 1).toString());
    storageT.endGameResults.wrong.push(storageT.rightAnswer);
  }
  const socketsWrapper = document.querySelector('#sockets') as HTMLElement;
  socketsWrapper.classList.add('gameEnded');

  const wrapper = document.querySelector('#wrapper-puzzle') as HTMLElement;
  const button = document.createElement('div');
  button.classList.add('nextButton');
  button.style.cursor = 'pointer';
  button.innerHTML = '→';
  button.addEventListener('click', ()=> {
    wrapper.removeChild(button);
    wrapper.classList.add('invisible');
    socketsWrapper.classList.remove('gameEnded');
    setTimeout(() => {
      storageT.currentGameQueue.length === 0 ? endGame() : runPuzzle();
    }, 300);
  }, {
    once: true
  })
  wrapper.appendChild(button);
}

function checkClick(wordId: string) {
  const socketBoxes = document.querySelectorAll('.socketBox') as NodeListOf <HTMLElement>;
  const nextId = goThrough();

  function goThrough() {
    for (let element of socketBoxes) {
      if (element.innerHTML === '') {
        if (element.id.split('-')[1] === wordId.split('-')[1]) {
          return element.id;
        } return false;
      }
    }
    return false;
  }
  if (nextId) {
    const socket = document.getElementById(nextId)!;
    const word = document.getElementById(wordId)!;
    socket?.appendChild(word);
    word.classList.add('dragSet');
    counter--;
    playSound(true);
  } else {
    updateAttemptsIndicator();
    playSound(false);
  }
  if (counter === 0) {
    goNext();
  }
}

function playSound(state: boolean) {
  const audioBite = new Audio;
  if (state) {
    audioBite.src = 'assets/sounds/rightAnswer.mp3';
  } else {
    audioBite.src = 'assets/sounds/wrongAnswer.mp3';
  }
  audioBite.play();
}

function finishEarly() {
  const wordBoxes = document.querySelectorAll('.draggableBox') as NodeListOf <HTMLElement>;
  wordBoxes.forEach((el) => {
    const socket = document.getElementById(`socket-${el.id.split('-')[1]}`) as HTMLElement;
    socket.appendChild(el);
  })
  goNext();
}

function updateAttemptsIndicator() {
  attempts++;
  const attemptsWrapper = document.querySelector('#attempts')!;
  const children = attemptsWrapper.children as HTMLCollectionOf <HTMLElement>;
  console.log(children)
  for (let i=0; i<attempts; i++) {
    children[i].style.backgroundColor = 'var(--wrong)';
  }
  if (attempts >= 3) {
    finishEarly();
  }
}