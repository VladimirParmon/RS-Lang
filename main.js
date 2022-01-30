/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./games/audioChallenge.ts":
/*!*********************************!*\
  !*** ./games/audioChallenge.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runAudioAnimation = exports.runAudioGame = void 0;
const api_1 = __webpack_require__(/*! ../utils/api */ "./utils/api.ts");
const storage_1 = __webpack_require__(/*! ../utils/storage */ "./utils/storage.ts");
const misc_1 = __webpack_require__(/*! ../utils/misc */ "./utils/misc.ts");
const checks_1 = __webpack_require__(/*! ../utils/checks */ "./utils/checks.ts");
const getData_1 = __webpack_require__(/*! ./getData */ "./games/getData.ts");
const misc_2 = __webpack_require__(/*! ../utils/misc */ "./utils/misc.ts");
function runAudioGame(instruction) {
    window.addEventListener('keyup', misc_2.checkFor);
    (0, getData_1.prepareData)();
    let intermediateArray = [];
    storage_1.storage.workingArray.forEach((el, i) => {
        intermediateArray.push(el.id);
        const optionsContainer = document.querySelector(`#audioGameOptions`);
        const option = document.createElement('div');
        const keyIcon = document.createElement('img');
        keyIcon.style.width = '30px';
        keyIcon.style.height = '30px';
        keyIcon.style.marginRight = '10px';
        keyIcon.src = `assets/svg/white/${i + 1}w.svg`;
        option.appendChild(keyIcon);
        option.id = `audioGameOption-${el.id}`;
        option.innerHTML += (0, misc_1.capitalize)(el.translate);
        option === null || option === void 0 ? void 0 : option.addEventListener('click', () => {
            (0, checks_1.checkChoice)(el.id);
        });
        optionsContainer === null || optionsContainer === void 0 ? void 0 : optionsContainer.appendChild(option);
    });
    storage_1.storage.currentOptions = intermediateArray;
    const audioBite = new Audio;
    audioBite.src = `${api_1.filesUrl}/${storage_1.storage.rightAnswer.audio}`;
    audioBite.play();
}
exports.runAudioGame = runAudioGame;
function runAudioAnimation(id) {
    const buttonsDiv = document.querySelector('#audioGameOptions');
    const buttonPressed = document.querySelector(`#audioGameOption-${id}`);
    const roundButton = document.querySelector('#repeatAudio');
    const roundButtonIcon = document.querySelector('#repeatAudioIcon');
    buttonsDiv.style.pointerEvents = 'none';
    buttonPressed.style.transform = 'scale(1.07)';
    const nextQuestionButton = document.createElement('div');
    nextQuestionButton.id = 'nextAudioQuestion';
    nextQuestionButton.innerHTML = '[space] →';
    setTimeout(() => {
        buttonsDiv.style.opacity = '0';
        roundButtonIcon.style.opacity = '0';
        setTimeout(() => {
            roundButton.style.backgroundImage = `url(${api_1.filesUrl}/${storage_1.storage.rightAnswer.image})`;
            roundButton.style.width = '500px';
            roundButton.style.height = '300px';
            roundButton.style.borderRadius = '0';
            buttonsDiv.innerHTML = `
        <div>${storage_1.storage.rightAnswer.word}</div>
        <div>${storage_1.storage.rightAnswer.transcription}</div>
        <div>${storage_1.storage.rightAnswer.translate}</div>
      `;
            buttonsDiv.appendChild(nextQuestionButton);
            nextQuestionButton.addEventListener('click', clicked);
            window.addEventListener('keyup', pressed);
            buttonsDiv.style.opacity = '1';
            buttonsDiv.style.pointerEvents = 'all';
        }, 500);
    }, 600);
    //=============================================================//
    function clicked() {
        nextQuestionButton.removeEventListener('click', clicked);
        window.removeEventListener('keyup', pressed);
        goNext();
    }
    ;
    function pressed(e) {
        if (e.code === 'Space') {
            window.removeEventListener('keyup', pressed);
            goNext();
        }
    }
    ;
    function goNext() {
        buttonsDiv.style.opacity = '0';
        roundButton.style.width = '140px';
        roundButton.style.height = '140px';
        roundButton.style.borderRadius = '50%';
        roundButton.style.backgroundImage = 'none';
        roundButtonIcon.style.opacity = '1';
        setTimeout(() => {
            buttonsDiv.style.opacity = '1';
            buttonsDiv.innerHTML = ``;
            storage_1.storage.currentGameQueue.length === 0 ? console.log('pishov nahui') : runAudioGame();
        }, 600);
    }
    //=============================================================//
}
exports.runAudioAnimation = runAudioAnimation;


/***/ }),

/***/ "./games/getData.ts":
/*!**************************!*\
  !*** ./games/getData.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSinglePageData = exports.prepareData = exports.getData = void 0;
const api_1 = __webpack_require__(/*! ../utils/api */ "./utils/api.ts");
const misc_1 = __webpack_require__(/*! ../utils/misc */ "./utils/misc.ts");
const storage_1 = __webpack_require__(/*! ../utils/storage */ "./utils/storage.ts");
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    const difficulty = storage_1.storage.currentDifficulty;
    let info;
    if (Object.keys(storage_1.storage.difficultyLevels).length === 0) {
        try {
            info = yield (0, api_1.getAllWords)(difficulty);
        }
        finally {
            if (info)
                storage_1.storage.difficultyLevels[difficulty] = (0, misc_1.shuffle)(info);
        }
    }
    if (storage_1.storage.currentGameQueue.length === 0) {
        storage_1.storage.currentGameQueue = [...(0, misc_1.shuffle)(storage_1.storage.difficultyLevels[difficulty])];
    }
    return true;
});
exports.getData = getData;
const prepareData = () => {
    const howManyVariants = 4;
    const difficulty = storage_1.storage.currentDifficulty;
    const theWord = storage_1.storage.currentGameQueue.pop();
    let variants = [];
    for (let i = 0; i < howManyVariants; i++) {
        const num = (0, misc_1.getRandomInt)(0, storage_1.storage.itemsPerGroup - 1);
        if (storage_1.storage.onlyOnePage) {
            if (storage_1.storage.onlyOnePageTemplate[num] !== theWord) {
                variants.push(storage_1.storage.onlyOnePageTemplate[num]);
            }
            else {
                i--;
            }
        }
        else {
            if (storage_1.storage.difficultyLevels[difficulty][num] !== theWord) {
                variants.push(storage_1.storage.difficultyLevels[difficulty][num]);
            }
            else {
                i--;
            }
        }
    }
    if (theWord) {
        storage_1.storage.rightAnswer = theWord;
        storage_1.storage.singleVariant = variants[0];
        storage_1.storage.workingArray = (0, misc_1.shuffle)([theWord, ...variants]);
    }
};
exports.prepareData = prepareData;
const getSinglePageData = () => __awaiter(void 0, void 0, void 0, function* () {
    const difficulty = storage_1.storage.bookGroup;
    let info;
    try {
        info = yield (0, api_1.getAllWords)(difficulty, 'single');
    }
    finally {
        if (info) {
            storage_1.storage.onlyOnePageTemplate = info;
            storage_1.storage.currentGameQueue = [...(0, misc_1.shuffle)(info)];
        }
    }
    return true;
});
exports.getSinglePageData = getSinglePageData;


/***/ }),

/***/ "./games/sprint.ts":
/*!*************************!*\
  !*** ./games/sprint.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.endSprint = exports.runSprint = void 0;
const misc_1 = __webpack_require__(/*! ../utils/misc */ "./utils/misc.ts");
const storage_1 = __webpack_require__(/*! ../utils/storage */ "./utils/storage.ts");
const getData_1 = __webpack_require__(/*! ./getData */ "./games/getData.ts");
const misc_2 = __webpack_require__(/*! ../utils/misc */ "./utils/misc.ts");
let endGameResults = {
    wrong: [],
    right: []
};
function runSprint() {
    const wordSpan = document.querySelector('#sprintWordSpan');
    const variantSpan = document.querySelector('#sprintVariantSpan');
    const sprintButtons = document.querySelector('#sprintButtons');
    sprintButtons.innerHTML = '';
    (0, getData_1.prepareData)();
    const coin = (0, misc_1.getRandomInt)(0, 1);
    if (wordSpan && variantSpan) {
        wordSpan.innerHTML = (0, misc_2.capitalize)(storage_1.storage.rightAnswer.word);
        variantSpan.innerHTML = coin === 1 ? (0, misc_2.capitalize)(storage_1.storage.rightAnswer.translate) : (0, misc_2.capitalize)(storage_1.storage.singleVariant.translate);
    }
    const buttonRight = document.createElement('button');
    buttonRight.id = 'sprintRight';
    buttonRight.textContent = 'Верно';
    const buttonWrong = document.createElement('button');
    buttonWrong.id = 'sprintWrong';
    buttonWrong.textContent = 'Неверно';
    sprintButtons === null || sprintButtons === void 0 ? void 0 : sprintButtons.appendChild(buttonWrong);
    sprintButtons === null || sprintButtons === void 0 ? void 0 : sprintButtons.appendChild(buttonRight);
    buttonRight.addEventListener('click', () => {
        console.log('next');
        coin === 1 ? goNext(true) : goNext(false);
    }, {
        once: true
    });
    buttonWrong.addEventListener('click', () => {
        coin === 0 ? goNext(true) : goNext(false);
    }, {
        once: true
    });
}
exports.runSprint = runSprint;
function goNext(command) {
    const audioBite = new Audio;
    if (command) {
        audioBite.src = './assets/sounds/rightAnswer.mp3';
        endGameResults.right.push(storage_1.storage.rightAnswer);
    }
    else {
        audioBite.src = './assets/sounds/wrongAnswer.mp3';
        endGameResults.wrong.push(storage_1.storage.singleVariant);
    }
    audioBite.play();
    runSprint();
}
function endSprint() {
    const root = document.querySelector('.wrapperGames');
    const results = document.createElement('div');
    results.id = 'resultsSprint';
    const rightOnes = document.createElement('div');
    const wrongOnes = document.createElement('div');
    const spanR = document.createElement('h2');
    const spanW = document.createElement('h2');
    spanR.textContent = 'Правильные ответы:';
    spanW.textContent = 'Неправильные ответы:';
    rightOnes.appendChild(spanR);
    wrongOnes.appendChild(spanW);
    endGameResults.right.forEach((el) => {
        const option = `
    <div class="sprintOption">
      <img src="assets/svg/sound.svg" alt="audio" id="playSound-${el.audio}">
      <span>${el.word} – ${el.translate}</span>
    </div>
    `;
        rightOnes.innerHTML += option;
    });
    endGameResults.wrong.forEach((el) => {
        const option = `
    <div class="sprintOption">
      <img src="assets/svg/sound.svg" alt="audio">
      <span>${el.word} – ${el.translate}</span>
    </div>
    `;
        wrongOnes.innerHTML += option;
    });
    results === null || results === void 0 ? void 0 : results.appendChild(rightOnes);
    results === null || results === void 0 ? void 0 : results.appendChild(wrongOnes);
    root === null || root === void 0 ? void 0 : root.appendChild(results);
}
exports.endSprint = endSprint;


/***/ }),

/***/ "./navigation/listener.ts":
/*!********************************!*\
  !*** ./navigation/listener.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.listener = void 0;
const storage_1 = __webpack_require__(/*! ../utils/storage */ "./utils/storage.ts");
const rollMenu_1 = __webpack_require__(/*! ./rollMenu */ "./navigation/rollMenu.ts");
const router_1 = __webpack_require__(/*! ./router */ "./navigation/router.ts");
const playSound_1 = __webpack_require__(/*! ../utils/playSound */ "./utils/playSound.ts");
const api_1 = __webpack_require__(/*! ../utils/api */ "./utils/api.ts");
const listener = () => {
    window.addEventListener('click', (e) => {
        let eventTarget = e.target;
        let id = eventTarget.id;
        if (id === 'goHome')
            (0, router_1.router)('home');
        if (id === 'goBook')
            (0, router_1.router)('book');
        if (id === 'goHistory')
            (0, router_1.router)('history');
        if (id === 'goGames')
            (0, router_1.router)('games');
        if (id === 'goStats')
            (0, router_1.router)('stats');
        if (id === 'goDev')
            (0, router_1.router)('dev');
        if (id === 'goComments')
            (0, router_1.router)('comments');
        if (id === 'goAudio')
            (0, router_1.router)('audio');
        if (id === 'goSprint')
            (0, router_1.router)('sprint');
        if (id === 'openMenuButton')
            (0, rollMenu_1.rollMenu)('open');
        if (id === 'closeMenuButton')
            (0, rollMenu_1.rollMenu)('close');
        if (id !== 'openMenuButton')
            (0, rollMenu_1.rollMenu)('close');
        if (id === 'page')
            (0, rollMenu_1.rollPageSelector)('open');
        if (id !== 'page')
            (0, rollMenu_1.rollPageSelector)('close');
        if (id === 'previousPage') {
            storage_1.storage.bookPage > 0 ? storage_1.storage.bookPage -= 1 : storage_1.storage.bookPage;
            (0, router_1.router)('book');
        }
        if (id === 'nextPage') {
            storage_1.storage.bookPage < storage_1.storage.totalPages ? storage_1.storage.bookPage += 1 : storage_1.storage.bookPage;
            (0, router_1.router)('book');
        }
        if (id.split('-')[0] === 'pageListOption') {
            storage_1.storage.bookPage = +id.split('-')[1];
            (0, router_1.router)('book');
        }
        if (id === 'section')
            (0, rollMenu_1.rollSectionSelector)('open');
        if (id !== 'section')
            (0, rollMenu_1.rollSectionSelector)('close');
        if (id.split('-')[0] === 'sectionListOption') {
            storage_1.storage.bookGroup = +id.split('-')[1];
            storage_1.storage.bookPage = 0;
            (0, router_1.router)('book');
        }
        if (id === 'games')
            (0, rollMenu_1.rollGamesSelector)('open');
        if (id !== 'games')
            (0, rollMenu_1.rollGamesSelector)('close');
        if (id.split('-')[0] === 'gamesListOption') {
            const gameToTravelTo = id.split('-')[1];
            switch (gameToTravelTo) {
                case 'audio':
                    (0, router_1.router)('audio', 'onlyOnePageRequired');
                    break;
                // case 'puzzle': router('puzzle', 'onlyOnePageRequired');
                // break;
                // case 'time': router('time', 'onlyOnePageRequired');
                // break;
                // case 'sprint': router('sprint', 'onlyOnePageRequired');
                // break;
            }
        }
        if (id.split('-')[0] === 'playSound')
            (0, playSound_1.playSound)(id.split('-')[1]);
        if (id === 'repeatAudio') {
            const audioBite = new Audio;
            audioBite.src = `${api_1.filesUrl}/${storage_1.storage.rightAnswer.audio}`;
            audioBite.play();
        }
    });
};
exports.listener = listener;


/***/ }),

/***/ "./navigation/pages/audioChallengePage.ts":
/*!************************************************!*\
  !*** ./navigation/pages/audioChallengePage.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.audioChallengePage = void 0;
const loader_1 = __webpack_require__(/*! ../../utils/loader */ "./utils/loader.ts");
const audioChallenge_1 = __webpack_require__(/*! ../../games/audioChallenge */ "./games/audioChallenge.ts");
const getData_1 = __webpack_require__(/*! ../../games/getData */ "./games/getData.ts");
const storage_1 = __webpack_require__(/*! ../../utils/storage */ "./utils/storage.ts");
exports.audioChallengePage = {
    render: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, loader_1.showLoader)();
            storage_1.storage.onlyOnePage ? yield (0, getData_1.getSinglePageData)() : yield (0, getData_1.getData)();
        }
        catch (_a) {
            console.log('Network error');
        }
        return `
    <div class="wrapperGames">
      <div id="wrapperAudioGame">
        <div id="repeatAudio">
          <img id="repeatAudioIcon" src="assets/svg/sound.svg" alt="icon">
        </div>
        <div id="audioGameOptions"></div>
      </div>
    </div>
    `;
    }),
    afterRender: () => {
        (0, audioChallenge_1.runAudioGame)();
    }
};


/***/ }),

/***/ "./navigation/pages/bookPage.ts":
/*!**************************************!*\
  !*** ./navigation/pages/bookPage.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bookPage = void 0;
const storage_1 = __webpack_require__(/*! ../../utils/storage */ "./utils/storage.ts");
const api_1 = __webpack_require__(/*! ../../utils/api */ "./utils/api.ts");
const loader_1 = __webpack_require__(/*! ../../utils/loader */ "./utils/loader.ts");
exports.bookPage = {
    render: () => __awaiter(void 0, void 0, void 0, function* () {
        const { bookGroup, bookPage } = storage_1.storage;
        let info;
        try {
            (0, loader_1.showLoader)();
            info = yield (0, api_1.getWords)(bookGroup, bookPage);
        }
        finally {
            (0, loader_1.hideLoader)();
        }
        let pageLayout = '';
        for (let i = 0; i < info.length; i++) {
            pageLayout += yield generateCard(i);
        }
        function capitalize(string) {
            return string[0].toUpperCase() + string.slice(1);
        }
        function generateCard(i) {
            return __awaiter(this, void 0, void 0, function* () {
                return `
        <div class="card">
          <img class="cardImg" src="${api_1.filesUrl}/${info[i].image}" alt="${info[i].word}">
          <div class="cardInfo">
            <h2>${capitalize(info[i].word)} - ${info[i].transcription}<img class="soundIcon" id="playSound-${info[i].audio}" src="assets/svg/sound.svg" alt="sound"></h2>
            <h3>${capitalize(info[i].wordTranslate)}</h3>
            <div style="margin-top: 20px">
              <img class="soundIcon2" id="playSound-${info[i].audioMeaning}" src="assets/svg/playButton.svg" alt="sound">
              <span>${info[i].textMeaning}</span>
            </div>
            <span>${info[i].textMeaningTranslate}</span><br>
            <div style="margin-top: 20px">
              <img class="soundIcon2" id="playSound-${info[i].audioExample}" src="assets/svg/playButton.svg" alt="sound">
              <span>${info[i].textExample}</span>
            </div>
            <span>${info[i].textExampleTranslate}</span>
          </div>
        </div>
      `;
            });
        }
        return `
    <div class="wrapper">
      <h1>Учебник</h1>
      <div class="pageControls">
        <div id="section">
          <img src="assets/svg/folder.svg" alt="folderIcon">
          <span>Раздел <span id="sectionCounter">${storage_1.storage.bookGroup + 1}/${storage_1.storage.totalGroups}</span></span>
        </div>
        <div id="page">
          <div id="previousPage">
            <img src="assets/svg/arrow.svg" alt="prev">
          </div>
          <span>Страница <span id="pageCounter">${storage_1.storage.bookPage + 1}/${storage_1.storage.totalPages}</span></span>
          <div id="nextPage">
            <img src="assets/svg/arrow.svg" alt="next">
          </div>
        </div>
        <div id="settings">
          <img src="assets/svg/settings.svg" alt="settingsIcon">
          <span>Настройки</span>
        </div>
        <div id="games">
          <img src="assets/svg/gamepad.svg" alt="gamesIcon">
          <span>Игры</span>
        </div>
      </div>
      ${pageLayout}
    </div>
    <div class="returnButton"></div>
    `;
    }),
    afterRender: () => {
    }
};


/***/ }),

/***/ "./navigation/pages/commentsPage.ts":
/*!******************************************!*\
  !*** ./navigation/pages/commentsPage.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.commentsPage = void 0;
exports.commentsPage = {
    render: () => (`
    <h1>Hello Comments blyad</h1>
  `),
    afterRender: () => {
    }
};


/***/ }),

/***/ "./navigation/pages/devPage.ts":
/*!*************************************!*\
  !*** ./navigation/pages/devPage.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.devPage = void 0;
exports.devPage = {
    render: () => (`
    <h1>Hello Dev blyad</h1>
  `),
    afterRender: () => {
    }
};


/***/ }),

/***/ "./navigation/pages/gamesPage.ts":
/*!***************************************!*\
  !*** ./navigation/pages/gamesPage.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.gamesPage = void 0;
exports.gamesPage = {
    render: () => (`
  <div class="wrapperGames">
    <div class="gameModeSelector">
      <span>Audio challenge</span>
      <div id="goAudio"></div>
    </div>
    <div class="gameModeSelector">
      <span>Sprint mode</span>
      <div id="goSprint"></div>
    </div>
    <div class="gameModeSelector">
      <span>Time game</span>
      <div id="goTime"></div>
    </div>
    <div class="gameModeSelector">
      <span>Puzzle game</span>
      <div id="goPuzzle"></div>
    </div>
  </div>
  `),
    afterRender: () => {
    }
};


/***/ }),

/***/ "./navigation/pages/historyPage.ts":
/*!*****************************************!*\
  !*** ./navigation/pages/historyPage.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.historyPage = void 0;
exports.historyPage = {
    render: () => (`
    <h1>Hello History blyad</h1>
  `),
    afterRender: () => {
    }
};


/***/ }),

/***/ "./navigation/pages/homePage.ts":
/*!**************************************!*\
  !*** ./navigation/pages/homePage.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.homePage = void 0;
exports.homePage = {
    render: () => (`
    <h1>HOME PAGE BLYAd</h1>
  `),
    afterRender: () => {
    }
};


/***/ }),

/***/ "./navigation/pages/sprintPage.ts":
/*!****************************************!*\
  !*** ./navigation/pages/sprintPage.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sprintPage = void 0;
const sprint_1 = __webpack_require__(/*! ../../games/sprint */ "./games/sprint.ts");
const getData_1 = __webpack_require__(/*! ../../games/getData */ "./games/getData.ts");
const storage_1 = __webpack_require__(/*! ../../utils/storage */ "./utils/storage.ts");
const loader_1 = __webpack_require__(/*! ../../utils/loader */ "./utils/loader.ts");
const timer_1 = __webpack_require__(/*! ../../utils/timer */ "./utils/timer.ts");
exports.sprintPage = {
    render: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, loader_1.showLoader)();
            storage_1.storage.onlyOnePage ? yield (0, getData_1.getSinglePageData)() : yield (0, getData_1.getData)();
        }
        catch (_a) {
            console.log('Network error');
        }
        return `
  <div class="wrapperGames">
    <div id="wrapperSprint">
      <div class="timerHolder">
        <canvas id="timeLeft" width="150" height="150"></canvas>
        <span id="timeLeftDigits"></span>
      </div>
      <span id="sprintWordSpan"></span>
      <span id="sprintVariantSpan"></span>
      <div id="sprintButtons"></div>
    </div>
  </div>
  `;
    }),
    afterRender: () => {
        (0, timer_1.timer)();
        (0, sprint_1.runSprint)();
    }
};


/***/ }),

/***/ "./navigation/pages/statsPage.ts":
/*!***************************************!*\
  !*** ./navigation/pages/statsPage.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.statsPage = void 0;
exports.statsPage = {
    render: () => (`
    <h1>Hello Stats blyad</h1>
  `),
    afterRender: () => {
    }
};


/***/ }),

/***/ "./navigation/rollMenu.ts":
/*!********************************!*\
  !*** ./navigation/rollMenu.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rollGamesSelector = exports.rollSectionSelector = exports.rollPageSelector = exports.rollMenu = void 0;
const storage_1 = __webpack_require__(/*! ../utils/storage */ "./utils/storage.ts");
function rollMenu(action) {
    const openMenuButton = document.querySelector('#openMenuButton');
    const navigationMenu = document.querySelector('#navigationMenu');
    const upperBar = document.querySelector('#upperBar');
    const logoMain = document.querySelector('#logoMain');
    if (action === 'open' && !storage_1.storage.isMenuOpen) {
        openMenuButton.style.transform = 'translateX(-100%)';
        upperBar.style.width = 'calc(100vw - 260px)';
        navigationMenu.style.width = '260px';
        logoMain.style.transform = 'translateX(-120%)';
        storage_1.storage.isMenuOpen = true;
    }
    else {
        openMenuButton.style.transform = 'translateX(0%)';
        upperBar.style.width = 'calc(100vw - 70px)';
        navigationMenu.style.width = '70px';
        logoMain.style.transform = 'translateX(0%)';
        storage_1.storage.isMenuOpen = false;
    }
}
exports.rollMenu = rollMenu;
function rollPageSelector(action) {
    const root = document.querySelector('.wrapper');
    if (!storage_1.storage.isPageListOpen && action === 'open') {
        const list = document.createElement('div');
        list.classList.add('pageList');
        for (let i = 0; i < storage_1.storage.totalPages; i++) {
            const option = document.createElement('div');
            option.classList.add('pageListOption');
            option.id = `pageListOption-${i}`;
            option.innerText = `Страница ${i + 1}`;
            list.appendChild(option);
        }
        root === null || root === void 0 ? void 0 : root.appendChild(list);
        storage_1.storage.isPageListOpen = true;
    }
    else if (storage_1.storage.isPageListOpen) {
        const list = document.querySelector('.pageList');
        root === null || root === void 0 ? void 0 : root.removeChild(list);
        storage_1.storage.isPageListOpen = false;
    }
}
exports.rollPageSelector = rollPageSelector;
function rollSectionSelector(action) {
    const root = document.querySelector('.wrapper');
    if (!storage_1.storage.isGroupListOpen && action === 'open') {
        const list = document.createElement('div');
        list.classList.add('sectionList');
        for (let i = 0; i < storage_1.storage.totalGroups; i++) {
            const option = document.createElement('div');
            option.classList.add('sectionListOption');
            option.id = `sectionListOption-${i}`;
            option.innerText = `Раздел ${i + 1}`;
            list.appendChild(option);
        }
        storage_1.storage.isGroupListOpen = true;
        root === null || root === void 0 ? void 0 : root.appendChild(list);
    }
    else if (storage_1.storage.isGroupListOpen) {
        const list = document.querySelector('.sectionList');
        root === null || root === void 0 ? void 0 : root.removeChild(list);
        storage_1.storage.isGroupListOpen = false;
    }
}
exports.rollSectionSelector = rollSectionSelector;
function rollGamesSelector(action) {
    const root = document.querySelector('.wrapper');
    if (!storage_1.storage.isGamesListOpen && action === 'open') {
        const list = document.createElement('div');
        list.classList.add('gamesList');
        let GamesRU;
        (function (GamesRU) {
            GamesRU[GamesRU["\u0410\u0443\u0434\u0438\u043E"] = 0] = "\u0410\u0443\u0434\u0438\u043E";
            GamesRU[GamesRU["\u0421\u043F\u0440\u0438\u043D\u0442"] = 1] = "\u0421\u043F\u0440\u0438\u043D\u0442";
            GamesRU[GamesRU["\u0418\u0433\u0440\u0430 \u043D\u0430 \u0432\u0440\u0435\u043C\u044F"] = 2] = "\u0418\u0433\u0440\u0430 \u043D\u0430 \u0432\u0440\u0435\u043C\u044F";
            GamesRU[GamesRU["\u041F\u0430\u0437\u043B"] = 3] = "\u041F\u0430\u0437\u043B";
        })(GamesRU || (GamesRU = {}));
        let Games;
        (function (Games) {
            Games[Games["audio"] = 0] = "audio";
            Games[Games["sprint"] = 1] = "sprint";
            Games[Games["time"] = 2] = "time";
            Games[Games["puzzle"] = 3] = "puzzle";
        })(Games || (Games = {}));
        for (let i = 0; i < storage_1.storage.totalGames; i++) {
            const option = document.createElement('div');
            option.classList.add('gamesListOption');
            option.id = `gamesListOption-${Games[i]}`;
            option.innerText = `${GamesRU[i]}`;
            list.appendChild(option);
        }
        storage_1.storage.isGamesListOpen = true;
        root === null || root === void 0 ? void 0 : root.appendChild(list);
    }
    else if (storage_1.storage.isGamesListOpen) {
        const list = document.querySelector('.gamesList');
        root === null || root === void 0 ? void 0 : root.removeChild(list);
        storage_1.storage.isGamesListOpen = false;
    }
}
exports.rollGamesSelector = rollGamesSelector;


/***/ }),

/***/ "./navigation/router.ts":
/*!******************************!*\
  !*** ./navigation/router.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.router = void 0;
const homePage_1 = __webpack_require__(/*! ./pages/homePage */ "./navigation/pages/homePage.ts");
const bookPage_1 = __webpack_require__(/*! ./pages/bookPage */ "./navigation/pages/bookPage.ts");
const historyPage_1 = __webpack_require__(/*! ./pages/historyPage */ "./navigation/pages/historyPage.ts");
const gamesPage_1 = __webpack_require__(/*! ./pages/gamesPage */ "./navigation/pages/gamesPage.ts");
const statsPage_1 = __webpack_require__(/*! ./pages/statsPage */ "./navigation/pages/statsPage.ts");
const devPage_1 = __webpack_require__(/*! ./pages/devPage */ "./navigation/pages/devPage.ts");
const commentsPage_1 = __webpack_require__(/*! ./pages/commentsPage */ "./navigation/pages/commentsPage.ts");
const audioChallengePage_1 = __webpack_require__(/*! ./pages/audioChallengePage */ "./navigation/pages/audioChallengePage.ts");
const storage_1 = __webpack_require__(/*! ../utils/storage */ "./utils/storage.ts");
const sprintPage_1 = __webpack_require__(/*! ./pages/sprintPage */ "./navigation/pages/sprintPage.ts");
const root = document.querySelector('#content');
const pages = {
    home: homePage_1.homePage,
    book: bookPage_1.bookPage,
    history: historyPage_1.historyPage,
    games: gamesPage_1.gamesPage,
    stats: statsPage_1.statsPage,
    dev: devPage_1.devPage,
    comments: commentsPage_1.commentsPage,
    audio: audioChallengePage_1.audioChallengePage,
    sprint: sprintPage_1.sprintPage
};
const getPageFromName = (pageName) => pages[pageName] || null;
const router = (pageName, instruction) => __awaiter(void 0, void 0, void 0, function* () {
    let page = getPageFromName(pageName);
    instruction ? storage_1.storage.onlyOnePage = true : storage_1.storage.onlyOnePage = false;
    if (page && root) {
        root.innerHTML = yield page.render();
        if (page.afterRender) {
            page.afterRender();
        }
    }
});
exports.router = router;
function additionalEvent() {
}


/***/ }),

/***/ "./utils/api.ts":
/*!**********************!*\
  !*** ./utils/api.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAllWords = exports.getWords = exports.filesUrl = void 0;
const storage_1 = __webpack_require__(/*! ./storage */ "./utils/storage.ts");
const baseURL = 'https://rs-lang-redblooded.herokuapp.com';
exports.filesUrl = 'https://raw.githubusercontent.com/vladimirparmon/react-rslang-be/master';
const words = `${baseURL}/words`;
const users = `${baseURL}/users`;
const getWords = (group, page) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${words}?group=${group}&page=${page}`);
    return yield response.json();
});
exports.getWords = getWords;
const getAllWords = (group, single) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    if (!single) {
        for (let i = 0; i < storage_1.storage.totalPages; i++) {
            const info = yield (0, exports.getWords)(group, i);
            const page = info.map((el) => {
                return {
                    id: el.id,
                    word: el.word,
                    translate: el.wordTranslate,
                    audio: el.audio,
                    image: el.image,
                    transcription: el.transcription
                };
            });
            result.push(...page);
        }
    }
    else {
        const info = yield (0, exports.getWords)(group, storage_1.storage.bookPage);
        const page = info.map((el) => {
            return {
                id: el.id,
                word: el.word,
                translate: el.wordTranslate,
                audio: el.audio,
                image: el.image,
                transcription: el.transcription
            };
        });
        result.push(...page);
    }
    return result;
});
exports.getAllWords = getAllWords;


/***/ }),

/***/ "./utils/checks.ts":
/*!*************************!*\
  !*** ./utils/checks.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkChoice = exports.checkKeys = void 0;
const storage_1 = __webpack_require__(/*! ./storage */ "./utils/storage.ts");
const audioChallenge_1 = __webpack_require__(/*! ../games/audioChallenge */ "./games/audioChallenge.ts");
const misc_1 = __webpack_require__(/*! ../utils/misc */ "./utils/misc.ts");
function checkKeys(code) {
    const wrapperGames = document.querySelector('.wrapperGames');
    const index = +code.slice(-1) - 1;
    if (wrapperGames && index < 5) {
        window.removeEventListener('keyup', misc_1.checkFor);
        checkChoice(storage_1.storage.currentOptions[index]);
    }
}
exports.checkKeys = checkKeys;
function checkChoice(id) {
    const buttonPressed = document.querySelector(`#audioGameOption-${id}`);
    const audioBite = new Audio;
    if (id === storage_1.storage.rightAnswer.id) {
        audioBite.src = './assets/sounds/rightAnswer.mp3';
        buttonPressed.style.backgroundColor = 'var(--trio3)';
    }
    else {
        audioBite.src = './assets/sounds/wrongAnswer.mp3';
        buttonPressed.style.backgroundColor = 'var(--wrong)';
    }
    audioBite.play();
    if (id)
        (0, audioChallenge_1.runAudioAnimation)(id);
}
exports.checkChoice = checkChoice;


/***/ }),

/***/ "./utils/loader.ts":
/*!*************************!*\
  !*** ./utils/loader.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hideLoader = exports.showLoader = void 0;
function showLoader() {
    const root = document.querySelector('#content');
    const loader = document.createElement('div');
    loader.classList.add('loader');
    root === null || root === void 0 ? void 0 : root.appendChild(loader);
}
exports.showLoader = showLoader;
function hideLoader() {
    const root = document.querySelector('#content');
    const loader = document.querySelector('.loader');
    root === null || root === void 0 ? void 0 : root.removeChild(loader);
}
exports.hideLoader = hideLoader;


/***/ }),

/***/ "./utils/misc.ts":
/*!***********************!*\
  !*** ./utils/misc.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkFor = exports.shuffle = exports.capitalize = exports.getRandomInt = void 0;
const checks_1 = __webpack_require__(/*! ./checks */ "./utils/checks.ts");
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandomInt = getRandomInt;
function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}
exports.capitalize = capitalize;
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
exports.shuffle = shuffle;
function checkFor(el) {
    (0, checks_1.checkKeys)(el.code);
}
exports.checkFor = checkFor;


/***/ }),

/***/ "./utils/playSound.ts":
/*!****************************!*\
  !*** ./utils/playSound.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.playSound = void 0;
const api_1 = __webpack_require__(/*! ./api */ "./utils/api.ts");
function playSound(address) {
    const sound = new Audio;
    sound.src = `${api_1.filesUrl}/${address}`;
    sound.play();
}
exports.playSound = playSound;


/***/ }),

/***/ "./utils/storage.ts":
/*!**************************!*\
  !*** ./utils/storage.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.storage = void 0;
exports.storage = {
    bookGroup: 0,
    bookPage: 0,
    totalGroups: 6,
    totalGames: 4,
    totalPages: 30,
    itemsPerGroup: 20,
    timeLimit: 5,
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
};


/***/ }),

/***/ "./utils/timer.ts":
/*!************************!*\
  !*** ./utils/timer.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.timer = void 0;
const sprint_1 = __webpack_require__(/*! ../games/sprint */ "./games/sprint.ts");
const storage_1 = __webpack_require__(/*! ./storage */ "./utils/storage.ts");
function timer() {
    const canvas = document.querySelector('#timeLeft');
    const context = canvas.getContext('2d');
    const digits = document.querySelector('#timeLeftDigits');
    context.lineCap = 'round';
    const diameter = 150;
    const radius = diameter / 2;
    const indicatorWidth = 8;
    const trackWidth = 1;
    const circle = radius - indicatorWidth / 2;
    const track = radius - indicatorWidth / 2;
    clear();
    const timeLimit = storage_1.storage.timeLimit * 1000;
    let timeLeft = timeLimit;
    let secondsLeft = storage_1.storage.timeLimit;
    digits.innerHTML = secondsLeft.toString();
    storage_1.storage.secondsInterval = setInterval(() => {
        if (timeLeft >= 0) {
            secondsLeft--;
            digits.innerHTML = secondsLeft.toString();
        }
        else {
            if (storage_1.storage.secondsInterval)
                clearInterval(storage_1.storage.secondsInterval);
            (0, sprint_1.endSprint)();
        }
    }, 1000);
    storage_1.storage.msInterval = setInterval(() => {
        if (timeLeft >= 0) {
            clear();
            setTrack();
            setIndicator();
            timeLeft -= 10;
        }
        else {
            if (storage_1.storage.msInterval)
                clearInterval(storage_1.storage.msInterval);
        }
    }, 10);
    function clear() {
        context.clearRect(0, 0, diameter, diameter);
    }
    function setTrack() {
        context.strokeStyle = '#474554';
        context.lineWidth = trackWidth;
        context.beginPath();
        context.arc(radius, radius, track, 0, Math.PI * 2);
        context.stroke();
    }
    function setIndicator() {
        context.strokeStyle = '#474554';
        context.lineWidth = indicatorWidth;
        context.beginPath();
        context.arc(radius, radius, circle, Math.PI / -2, ((Math.PI * 2) / timeLimit) * timeLeft + Math.PI / -2, false);
        context.stroke();
    }
}
exports.timer = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*******************!*\
  !*** ./master.ts ***!
  \*******************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const listener_1 = __webpack_require__(/*! ./navigation/listener */ "./navigation/listener.ts");
const router_1 = __webpack_require__(/*! ./navigation/router */ "./navigation/router.ts");
(0, listener_1.listener)();
(0, router_1.router)('sprint');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7Ozs7Ozs7VUM5RGI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBbUIsbUJBQU8sQ0FBQyx1REFBdUI7QUFDbEQsaUJBQWlCLG1CQUFPLENBQUMsbURBQXFCO0FBQzlDO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ycy1sYW5nLy4vZ2FtZXMvYXVkaW9DaGFsbGVuZ2UudHMiLCJ3ZWJwYWNrOi8vcnMtbGFuZy8uL2dhbWVzL2dldERhdGEudHMiLCJ3ZWJwYWNrOi8vcnMtbGFuZy8uL2dhbWVzL3NwcmludC50cyIsIndlYnBhY2s6Ly9ycy1sYW5nLy4vbmF2aWdhdGlvbi9saXN0ZW5lci50cyIsIndlYnBhY2s6Ly9ycy1sYW5nLy4vbmF2aWdhdGlvbi9wYWdlcy9hdWRpb0NoYWxsZW5nZVBhZ2UudHMiLCJ3ZWJwYWNrOi8vcnMtbGFuZy8uL25hdmlnYXRpb24vcGFnZXMvYm9va1BhZ2UudHMiLCJ3ZWJwYWNrOi8vcnMtbGFuZy8uL25hdmlnYXRpb24vcGFnZXMvY29tbWVudHNQYWdlLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi9uYXZpZ2F0aW9uL3BhZ2VzL2RldlBhZ2UudHMiLCJ3ZWJwYWNrOi8vcnMtbGFuZy8uL25hdmlnYXRpb24vcGFnZXMvZ2FtZXNQYWdlLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi9uYXZpZ2F0aW9uL3BhZ2VzL2hpc3RvcnlQYWdlLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi9uYXZpZ2F0aW9uL3BhZ2VzL2hvbWVQYWdlLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi9uYXZpZ2F0aW9uL3BhZ2VzL3NwcmludFBhZ2UudHMiLCJ3ZWJwYWNrOi8vcnMtbGFuZy8uL25hdmlnYXRpb24vcGFnZXMvc3RhdHNQYWdlLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi9uYXZpZ2F0aW9uL3JvbGxNZW51LnRzIiwid2VicGFjazovL3JzLWxhbmcvLi9uYXZpZ2F0aW9uL3JvdXRlci50cyIsIndlYnBhY2s6Ly9ycy1sYW5nLy4vdXRpbHMvYXBpLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi91dGlscy9jaGVja3MudHMiLCJ3ZWJwYWNrOi8vcnMtbGFuZy8uL3V0aWxzL2xvYWRlci50cyIsIndlYnBhY2s6Ly9ycy1sYW5nLy4vdXRpbHMvbWlzYy50cyIsIndlYnBhY2s6Ly9ycy1sYW5nLy4vdXRpbHMvcGxheVNvdW5kLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi91dGlscy9zdG9yYWdlLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi91dGlscy90aW1lci50cyIsIndlYnBhY2s6Ly9ycy1sYW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JzLWxhbmcvLi9tYXN0ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5ydW5BdWRpb0FuaW1hdGlvbiA9IGV4cG9ydHMucnVuQXVkaW9HYW1lID0gdm9pZCAwO1xyXG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9hcGlcIik7XHJcbmNvbnN0IHN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9zdG9yYWdlXCIpO1xyXG5jb25zdCBtaXNjXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvbWlzY1wiKTtcclxuY29uc3QgY2hlY2tzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvY2hlY2tzXCIpO1xyXG5jb25zdCBnZXREYXRhXzEgPSByZXF1aXJlKFwiLi9nZXREYXRhXCIpO1xyXG5jb25zdCBtaXNjXzIgPSByZXF1aXJlKFwiLi4vdXRpbHMvbWlzY1wiKTtcclxuZnVuY3Rpb24gcnVuQXVkaW9HYW1lKGluc3RydWN0aW9uKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBtaXNjXzIuY2hlY2tGb3IpO1xyXG4gICAgKDAsIGdldERhdGFfMS5wcmVwYXJlRGF0YSkoKTtcclxuICAgIGxldCBpbnRlcm1lZGlhdGVBcnJheSA9IFtdO1xyXG4gICAgc3RvcmFnZV8xLnN0b3JhZ2Uud29ya2luZ0FycmF5LmZvckVhY2goKGVsLCBpKSA9PiB7XHJcbiAgICAgICAgaW50ZXJtZWRpYXRlQXJyYXkucHVzaChlbC5pZCk7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNhdWRpb0dhbWVPcHRpb25zYCk7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29uc3Qga2V5SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgIGtleUljb24uc3R5bGUud2lkdGggPSAnMzBweCc7XHJcbiAgICAgICAga2V5SWNvbi5zdHlsZS5oZWlnaHQgPSAnMzBweCc7XHJcbiAgICAgICAga2V5SWNvbi5zdHlsZS5tYXJnaW5SaWdodCA9ICcxMHB4JztcclxuICAgICAgICBrZXlJY29uLnNyYyA9IGBhc3NldHMvc3ZnL3doaXRlLyR7aSArIDF9dy5zdmdgO1xyXG4gICAgICAgIG9wdGlvbi5hcHBlbmRDaGlsZChrZXlJY29uKTtcclxuICAgICAgICBvcHRpb24uaWQgPSBgYXVkaW9HYW1lT3B0aW9uLSR7ZWwuaWR9YDtcclxuICAgICAgICBvcHRpb24uaW5uZXJIVE1MICs9ICgwLCBtaXNjXzEuY2FwaXRhbGl6ZSkoZWwudHJhbnNsYXRlKTtcclxuICAgICAgICBvcHRpb24gPT09IG51bGwgfHwgb3B0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICgwLCBjaGVja3NfMS5jaGVja0Nob2ljZSkoZWwuaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG9wdGlvbnNDb250YWluZXIgPT09IG51bGwgfHwgb3B0aW9uc0NvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgfSk7XHJcbiAgICBzdG9yYWdlXzEuc3RvcmFnZS5jdXJyZW50T3B0aW9ucyA9IGludGVybWVkaWF0ZUFycmF5O1xyXG4gICAgY29uc3QgYXVkaW9CaXRlID0gbmV3IEF1ZGlvO1xyXG4gICAgYXVkaW9CaXRlLnNyYyA9IGAke2FwaV8xLmZpbGVzVXJsfS8ke3N0b3JhZ2VfMS5zdG9yYWdlLnJpZ2h0QW5zd2VyLmF1ZGlvfWA7XHJcbiAgICBhdWRpb0JpdGUucGxheSgpO1xyXG59XHJcbmV4cG9ydHMucnVuQXVkaW9HYW1lID0gcnVuQXVkaW9HYW1lO1xyXG5mdW5jdGlvbiBydW5BdWRpb0FuaW1hdGlvbihpZCkge1xyXG4gICAgY29uc3QgYnV0dG9uc0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhdWRpb0dhbWVPcHRpb25zJyk7XHJcbiAgICBjb25zdCBidXR0b25QcmVzc2VkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2F1ZGlvR2FtZU9wdGlvbi0ke2lkfWApO1xyXG4gICAgY29uc3Qgcm91bmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVwZWF0QXVkaW8nKTtcclxuICAgIGNvbnN0IHJvdW5kQnV0dG9uSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXBlYXRBdWRpb0ljb24nKTtcclxuICAgIGJ1dHRvbnNEaXYuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxuICAgIGJ1dHRvblByZXNzZWQuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEuMDcpJztcclxuICAgIGNvbnN0IG5leHRRdWVzdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbmV4dFF1ZXN0aW9uQnV0dG9uLmlkID0gJ25leHRBdWRpb1F1ZXN0aW9uJztcclxuICAgIG5leHRRdWVzdGlvbkJ1dHRvbi5pbm5lckhUTUwgPSAnW3NwYWNlXSDihpInO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgYnV0dG9uc0Rpdi5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgICAgIHJvdW5kQnV0dG9uSWNvbi5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICByb3VuZEJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7YXBpXzEuZmlsZXNVcmx9LyR7c3RvcmFnZV8xLnN0b3JhZ2UucmlnaHRBbnN3ZXIuaW1hZ2V9KWA7XHJcbiAgICAgICAgICAgIHJvdW5kQnV0dG9uLnN0eWxlLndpZHRoID0gJzUwMHB4JztcclxuICAgICAgICAgICAgcm91bmRCdXR0b24uc3R5bGUuaGVpZ2h0ID0gJzMwMHB4JztcclxuICAgICAgICAgICAgcm91bmRCdXR0b24uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzAnO1xyXG4gICAgICAgICAgICBidXR0b25zRGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICA8ZGl2PiR7c3RvcmFnZV8xLnN0b3JhZ2UucmlnaHRBbnN3ZXIud29yZH08L2Rpdj5cclxuICAgICAgICA8ZGl2PiR7c3RvcmFnZV8xLnN0b3JhZ2UucmlnaHRBbnN3ZXIudHJhbnNjcmlwdGlvbn08L2Rpdj5cclxuICAgICAgICA8ZGl2PiR7c3RvcmFnZV8xLnN0b3JhZ2UucmlnaHRBbnN3ZXIudHJhbnNsYXRlfTwvZGl2PlxyXG4gICAgICBgO1xyXG4gICAgICAgICAgICBidXR0b25zRGl2LmFwcGVuZENoaWxkKG5leHRRdWVzdGlvbkJ1dHRvbik7XHJcbiAgICAgICAgICAgIG5leHRRdWVzdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrZWQpO1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBwcmVzc2VkKTtcclxuICAgICAgICAgICAgYnV0dG9uc0Rpdi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICBidXR0b25zRGl2LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYWxsJztcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfSwgNjAwKTtcclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PS8vXHJcbiAgICBmdW5jdGlvbiBjbGlja2VkKCkge1xyXG4gICAgICAgIG5leHRRdWVzdGlvbkJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrZWQpO1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHByZXNzZWQpO1xyXG4gICAgICAgIGdvTmV4dCgpO1xyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgZnVuY3Rpb24gcHJlc3NlZChlKSB7XHJcbiAgICAgICAgaWYgKGUuY29kZSA9PT0gJ1NwYWNlJykge1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBwcmVzc2VkKTtcclxuICAgICAgICAgICAgZ29OZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgZnVuY3Rpb24gZ29OZXh0KCkge1xyXG4gICAgICAgIGJ1dHRvbnNEaXYuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICByb3VuZEJ1dHRvbi5zdHlsZS53aWR0aCA9ICcxNDBweCc7XHJcbiAgICAgICAgcm91bmRCdXR0b24uc3R5bGUuaGVpZ2h0ID0gJzE0MHB4JztcclxuICAgICAgICByb3VuZEJ1dHRvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJztcclxuICAgICAgICByb3VuZEJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAnbm9uZSc7XHJcbiAgICAgICAgcm91bmRCdXR0b25JY29uLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGJ1dHRvbnNEaXYuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgYnV0dG9uc0Rpdi5pbm5lckhUTUwgPSBgYDtcclxuICAgICAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UuY3VycmVudEdhbWVRdWV1ZS5sZW5ndGggPT09IDAgPyBjb25zb2xlLmxvZygncGlzaG92IG5haHVpJykgOiBydW5BdWRpb0dhbWUoKTtcclxuICAgICAgICB9LCA2MDApO1xyXG4gICAgfVxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ly9cclxufVxyXG5leHBvcnRzLnJ1bkF1ZGlvQW5pbWF0aW9uID0gcnVuQXVkaW9BbmltYXRpb247XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZXRTaW5nbGVQYWdlRGF0YSA9IGV4cG9ydHMucHJlcGFyZURhdGEgPSBleHBvcnRzLmdldERhdGEgPSB2b2lkIDA7XHJcbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4uL3V0aWxzL2FwaVwiKTtcclxuY29uc3QgbWlzY18xID0gcmVxdWlyZShcIi4uL3V0aWxzL21pc2NcIik7XHJcbmNvbnN0IHN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9zdG9yYWdlXCIpO1xyXG5jb25zdCBnZXREYXRhID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBjb25zdCBkaWZmaWN1bHR5ID0gc3RvcmFnZV8xLnN0b3JhZ2UuY3VycmVudERpZmZpY3VsdHk7XHJcbiAgICBsZXQgaW5mbztcclxuICAgIGlmIChPYmplY3Qua2V5cyhzdG9yYWdlXzEuc3RvcmFnZS5kaWZmaWN1bHR5TGV2ZWxzKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpbmZvID0geWllbGQgKDAsIGFwaV8xLmdldEFsbFdvcmRzKShkaWZmaWN1bHR5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgIGlmIChpbmZvKVxyXG4gICAgICAgICAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UuZGlmZmljdWx0eUxldmVsc1tkaWZmaWN1bHR5XSA9ICgwLCBtaXNjXzEuc2h1ZmZsZSkoaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHN0b3JhZ2VfMS5zdG9yYWdlLmN1cnJlbnRHYW1lUXVldWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UuY3VycmVudEdhbWVRdWV1ZSA9IFsuLi4oMCwgbWlzY18xLnNodWZmbGUpKHN0b3JhZ2VfMS5zdG9yYWdlLmRpZmZpY3VsdHlMZXZlbHNbZGlmZmljdWx0eV0pXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59KTtcclxuZXhwb3J0cy5nZXREYXRhID0gZ2V0RGF0YTtcclxuY29uc3QgcHJlcGFyZURhdGEgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBob3dNYW55VmFyaWFudHMgPSA0O1xyXG4gICAgY29uc3QgZGlmZmljdWx0eSA9IHN0b3JhZ2VfMS5zdG9yYWdlLmN1cnJlbnREaWZmaWN1bHR5O1xyXG4gICAgY29uc3QgdGhlV29yZCA9IHN0b3JhZ2VfMS5zdG9yYWdlLmN1cnJlbnRHYW1lUXVldWUucG9wKCk7XHJcbiAgICBsZXQgdmFyaWFudHMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG93TWFueVZhcmlhbnRzOyBpKyspIHtcclxuICAgICAgICBjb25zdCBudW0gPSAoMCwgbWlzY18xLmdldFJhbmRvbUludCkoMCwgc3RvcmFnZV8xLnN0b3JhZ2UuaXRlbXNQZXJHcm91cCAtIDEpO1xyXG4gICAgICAgIGlmIChzdG9yYWdlXzEuc3RvcmFnZS5vbmx5T25lUGFnZSkge1xyXG4gICAgICAgICAgICBpZiAoc3RvcmFnZV8xLnN0b3JhZ2Uub25seU9uZVBhZ2VUZW1wbGF0ZVtudW1dICE9PSB0aGVXb3JkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXJpYW50cy5wdXNoKHN0b3JhZ2VfMS5zdG9yYWdlLm9ubHlPbmVQYWdlVGVtcGxhdGVbbnVtXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChzdG9yYWdlXzEuc3RvcmFnZS5kaWZmaWN1bHR5TGV2ZWxzW2RpZmZpY3VsdHldW251bV0gIT09IHRoZVdvcmQpIHtcclxuICAgICAgICAgICAgICAgIHZhcmlhbnRzLnB1c2goc3RvcmFnZV8xLnN0b3JhZ2UuZGlmZmljdWx0eUxldmVsc1tkaWZmaWN1bHR5XVtudW1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGVXb3JkKSB7XHJcbiAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UucmlnaHRBbnN3ZXIgPSB0aGVXb3JkO1xyXG4gICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLnNpbmdsZVZhcmlhbnQgPSB2YXJpYW50c1swXTtcclxuICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS53b3JraW5nQXJyYXkgPSAoMCwgbWlzY18xLnNodWZmbGUpKFt0aGVXb3JkLCAuLi52YXJpYW50c10pO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLnByZXBhcmVEYXRhID0gcHJlcGFyZURhdGE7XHJcbmNvbnN0IGdldFNpbmdsZVBhZ2VEYXRhID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBjb25zdCBkaWZmaWN1bHR5ID0gc3RvcmFnZV8xLnN0b3JhZ2UuYm9va0dyb3VwO1xyXG4gICAgbGV0IGluZm87XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGluZm8gPSB5aWVsZCAoMCwgYXBpXzEuZ2V0QWxsV29yZHMpKGRpZmZpY3VsdHksICdzaW5nbGUnKTtcclxuICAgIH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIGlmIChpbmZvKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLm9ubHlPbmVQYWdlVGVtcGxhdGUgPSBpbmZvO1xyXG4gICAgICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5jdXJyZW50R2FtZVF1ZXVlID0gWy4uLigwLCBtaXNjXzEuc2h1ZmZsZSkoaW5mbyldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59KTtcclxuZXhwb3J0cy5nZXRTaW5nbGVQYWdlRGF0YSA9IGdldFNpbmdsZVBhZ2VEYXRhO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmVuZFNwcmludCA9IGV4cG9ydHMucnVuU3ByaW50ID0gdm9pZCAwO1xyXG5jb25zdCBtaXNjXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvbWlzY1wiKTtcclxuY29uc3Qgc3RvcmFnZV8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3N0b3JhZ2VcIik7XHJcbmNvbnN0IGdldERhdGFfMSA9IHJlcXVpcmUoXCIuL2dldERhdGFcIik7XHJcbmNvbnN0IG1pc2NfMiA9IHJlcXVpcmUoXCIuLi91dGlscy9taXNjXCIpO1xyXG5sZXQgZW5kR2FtZVJlc3VsdHMgPSB7XHJcbiAgICB3cm9uZzogW10sXHJcbiAgICByaWdodDogW11cclxufTtcclxuZnVuY3Rpb24gcnVuU3ByaW50KCkge1xyXG4gICAgY29uc3Qgd29yZFNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3ByaW50V29yZFNwYW4nKTtcclxuICAgIGNvbnN0IHZhcmlhbnRTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NwcmludFZhcmlhbnRTcGFuJyk7XHJcbiAgICBjb25zdCBzcHJpbnRCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NwcmludEJ1dHRvbnMnKTtcclxuICAgIHNwcmludEJ1dHRvbnMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAoMCwgZ2V0RGF0YV8xLnByZXBhcmVEYXRhKSgpO1xyXG4gICAgY29uc3QgY29pbiA9ICgwLCBtaXNjXzEuZ2V0UmFuZG9tSW50KSgwLCAxKTtcclxuICAgIGlmICh3b3JkU3BhbiAmJiB2YXJpYW50U3Bhbikge1xyXG4gICAgICAgIHdvcmRTcGFuLmlubmVySFRNTCA9ICgwLCBtaXNjXzIuY2FwaXRhbGl6ZSkoc3RvcmFnZV8xLnN0b3JhZ2UucmlnaHRBbnN3ZXIud29yZCk7XHJcbiAgICAgICAgdmFyaWFudFNwYW4uaW5uZXJIVE1MID0gY29pbiA9PT0gMSA/ICgwLCBtaXNjXzIuY2FwaXRhbGl6ZSkoc3RvcmFnZV8xLnN0b3JhZ2UucmlnaHRBbnN3ZXIudHJhbnNsYXRlKSA6ICgwLCBtaXNjXzIuY2FwaXRhbGl6ZSkoc3RvcmFnZV8xLnN0b3JhZ2Uuc2luZ2xlVmFyaWFudC50cmFuc2xhdGUpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYnV0dG9uUmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGJ1dHRvblJpZ2h0LmlkID0gJ3NwcmludFJpZ2h0JztcclxuICAgIGJ1dHRvblJpZ2h0LnRleHRDb250ZW50ID0gJ9CS0LXRgNC90L4nO1xyXG4gICAgY29uc3QgYnV0dG9uV3JvbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGJ1dHRvbldyb25nLmlkID0gJ3NwcmludFdyb25nJztcclxuICAgIGJ1dHRvbldyb25nLnRleHRDb250ZW50ID0gJ9Cd0LXQstC10YDQvdC+JztcclxuICAgIHNwcmludEJ1dHRvbnMgPT09IG51bGwgfHwgc3ByaW50QnV0dG9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3ByaW50QnV0dG9ucy5hcHBlbmRDaGlsZChidXR0b25Xcm9uZyk7XHJcbiAgICBzcHJpbnRCdXR0b25zID09PSBudWxsIHx8IHNwcmludEJ1dHRvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNwcmludEJ1dHRvbnMuYXBwZW5kQ2hpbGQoYnV0dG9uUmlnaHQpO1xyXG4gICAgYnV0dG9uUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ25leHQnKTtcclxuICAgICAgICBjb2luID09PSAxID8gZ29OZXh0KHRydWUpIDogZ29OZXh0KGZhbHNlKTtcclxuICAgIH0sIHtcclxuICAgICAgICBvbmNlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIGJ1dHRvbldyb25nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNvaW4gPT09IDAgPyBnb05leHQodHJ1ZSkgOiBnb05leHQoZmFsc2UpO1xyXG4gICAgfSwge1xyXG4gICAgICAgIG9uY2U6IHRydWVcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMucnVuU3ByaW50ID0gcnVuU3ByaW50O1xyXG5mdW5jdGlvbiBnb05leHQoY29tbWFuZCkge1xyXG4gICAgY29uc3QgYXVkaW9CaXRlID0gbmV3IEF1ZGlvO1xyXG4gICAgaWYgKGNvbW1hbmQpIHtcclxuICAgICAgICBhdWRpb0JpdGUuc3JjID0gJy4vYXNzZXRzL3NvdW5kcy9yaWdodEFuc3dlci5tcDMnO1xyXG4gICAgICAgIGVuZEdhbWVSZXN1bHRzLnJpZ2h0LnB1c2goc3RvcmFnZV8xLnN0b3JhZ2UucmlnaHRBbnN3ZXIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgYXVkaW9CaXRlLnNyYyA9ICcuL2Fzc2V0cy9zb3VuZHMvd3JvbmdBbnN3ZXIubXAzJztcclxuICAgICAgICBlbmRHYW1lUmVzdWx0cy53cm9uZy5wdXNoKHN0b3JhZ2VfMS5zdG9yYWdlLnNpbmdsZVZhcmlhbnQpO1xyXG4gICAgfVxyXG4gICAgYXVkaW9CaXRlLnBsYXkoKTtcclxuICAgIHJ1blNwcmludCgpO1xyXG59XHJcbmZ1bmN0aW9uIGVuZFNwcmludCgpIHtcclxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlckdhbWVzJyk7XHJcbiAgICBjb25zdCByZXN1bHRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICByZXN1bHRzLmlkID0gJ3Jlc3VsdHNTcHJpbnQnO1xyXG4gICAgY29uc3QgcmlnaHRPbmVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCB3cm9uZ09uZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHNwYW5SID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgIGNvbnN0IHNwYW5XID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgIHNwYW5SLnRleHRDb250ZW50ID0gJ9Cf0YDQsNCy0LjQu9GM0L3Ri9C1INC+0YLQstC10YLRizonO1xyXG4gICAgc3BhblcudGV4dENvbnRlbnQgPSAn0J3QtdC/0YDQsNCy0LjQu9GM0L3Ri9C1INC+0YLQstC10YLRizonO1xyXG4gICAgcmlnaHRPbmVzLmFwcGVuZENoaWxkKHNwYW5SKTtcclxuICAgIHdyb25nT25lcy5hcHBlbmRDaGlsZChzcGFuVyk7XHJcbiAgICBlbmRHYW1lUmVzdWx0cy5yaWdodC5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGBcclxuICAgIDxkaXYgY2xhc3M9XCJzcHJpbnRPcHRpb25cIj5cclxuICAgICAgPGltZyBzcmM9XCJhc3NldHMvc3ZnL3NvdW5kLnN2Z1wiIGFsdD1cImF1ZGlvXCIgaWQ9XCJwbGF5U291bmQtJHtlbC5hdWRpb31cIj5cclxuICAgICAgPHNwYW4+JHtlbC53b3JkfSDigJMgJHtlbC50cmFuc2xhdGV9PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgICBgO1xyXG4gICAgICAgIHJpZ2h0T25lcy5pbm5lckhUTUwgKz0gb3B0aW9uO1xyXG4gICAgfSk7XHJcbiAgICBlbmRHYW1lUmVzdWx0cy53cm9uZy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGBcclxuICAgIDxkaXYgY2xhc3M9XCJzcHJpbnRPcHRpb25cIj5cclxuICAgICAgPGltZyBzcmM9XCJhc3NldHMvc3ZnL3NvdW5kLnN2Z1wiIGFsdD1cImF1ZGlvXCI+XHJcbiAgICAgIDxzcGFuPiR7ZWwud29yZH0g4oCTICR7ZWwudHJhbnNsYXRlfTwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gICAgYDtcclxuICAgICAgICB3cm9uZ09uZXMuaW5uZXJIVE1MICs9IG9wdGlvbjtcclxuICAgIH0pO1xyXG4gICAgcmVzdWx0cyA9PT0gbnVsbCB8fCByZXN1bHRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXN1bHRzLmFwcGVuZENoaWxkKHJpZ2h0T25lcyk7XHJcbiAgICByZXN1bHRzID09PSBudWxsIHx8IHJlc3VsdHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc3VsdHMuYXBwZW5kQ2hpbGQod3JvbmdPbmVzKTtcclxuICAgIHJvb3QgPT09IG51bGwgfHwgcm9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcm9vdC5hcHBlbmRDaGlsZChyZXN1bHRzKTtcclxufVxyXG5leHBvcnRzLmVuZFNwcmludCA9IGVuZFNwcmludDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5saXN0ZW5lciA9IHZvaWQgMDtcclxuY29uc3Qgc3RvcmFnZV8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3N0b3JhZ2VcIik7XHJcbmNvbnN0IHJvbGxNZW51XzEgPSByZXF1aXJlKFwiLi9yb2xsTWVudVwiKTtcclxuY29uc3Qgcm91dGVyXzEgPSByZXF1aXJlKFwiLi9yb3V0ZXJcIik7XHJcbmNvbnN0IHBsYXlTb3VuZF8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3BsYXlTb3VuZFwiKTtcclxuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvYXBpXCIpO1xyXG5jb25zdCBsaXN0ZW5lciA9ICgpID0+IHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgbGV0IGV2ZW50VGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgbGV0IGlkID0gZXZlbnRUYXJnZXQuaWQ7XHJcbiAgICAgICAgaWYgKGlkID09PSAnZ29Ib21lJylcclxuICAgICAgICAgICAgKDAsIHJvdXRlcl8xLnJvdXRlcikoJ2hvbWUnKTtcclxuICAgICAgICBpZiAoaWQgPT09ICdnb0Jvb2snKVxyXG4gICAgICAgICAgICAoMCwgcm91dGVyXzEucm91dGVyKSgnYm9vaycpO1xyXG4gICAgICAgIGlmIChpZCA9PT0gJ2dvSGlzdG9yeScpXHJcbiAgICAgICAgICAgICgwLCByb3V0ZXJfMS5yb3V0ZXIpKCdoaXN0b3J5Jyk7XHJcbiAgICAgICAgaWYgKGlkID09PSAnZ29HYW1lcycpXHJcbiAgICAgICAgICAgICgwLCByb3V0ZXJfMS5yb3V0ZXIpKCdnYW1lcycpO1xyXG4gICAgICAgIGlmIChpZCA9PT0gJ2dvU3RhdHMnKVxyXG4gICAgICAgICAgICAoMCwgcm91dGVyXzEucm91dGVyKSgnc3RhdHMnKTtcclxuICAgICAgICBpZiAoaWQgPT09ICdnb0RldicpXHJcbiAgICAgICAgICAgICgwLCByb3V0ZXJfMS5yb3V0ZXIpKCdkZXYnKTtcclxuICAgICAgICBpZiAoaWQgPT09ICdnb0NvbW1lbnRzJylcclxuICAgICAgICAgICAgKDAsIHJvdXRlcl8xLnJvdXRlcikoJ2NvbW1lbnRzJyk7XHJcbiAgICAgICAgaWYgKGlkID09PSAnZ29BdWRpbycpXHJcbiAgICAgICAgICAgICgwLCByb3V0ZXJfMS5yb3V0ZXIpKCdhdWRpbycpO1xyXG4gICAgICAgIGlmIChpZCA9PT0gJ2dvU3ByaW50JylcclxuICAgICAgICAgICAgKDAsIHJvdXRlcl8xLnJvdXRlcikoJ3NwcmludCcpO1xyXG4gICAgICAgIGlmIChpZCA9PT0gJ29wZW5NZW51QnV0dG9uJylcclxuICAgICAgICAgICAgKDAsIHJvbGxNZW51XzEucm9sbE1lbnUpKCdvcGVuJyk7XHJcbiAgICAgICAgaWYgKGlkID09PSAnY2xvc2VNZW51QnV0dG9uJylcclxuICAgICAgICAgICAgKDAsIHJvbGxNZW51XzEucm9sbE1lbnUpKCdjbG9zZScpO1xyXG4gICAgICAgIGlmIChpZCAhPT0gJ29wZW5NZW51QnV0dG9uJylcclxuICAgICAgICAgICAgKDAsIHJvbGxNZW51XzEucm9sbE1lbnUpKCdjbG9zZScpO1xyXG4gICAgICAgIGlmIChpZCA9PT0gJ3BhZ2UnKVxyXG4gICAgICAgICAgICAoMCwgcm9sbE1lbnVfMS5yb2xsUGFnZVNlbGVjdG9yKSgnb3BlbicpO1xyXG4gICAgICAgIGlmIChpZCAhPT0gJ3BhZ2UnKVxyXG4gICAgICAgICAgICAoMCwgcm9sbE1lbnVfMS5yb2xsUGFnZVNlbGVjdG9yKSgnY2xvc2UnKTtcclxuICAgICAgICBpZiAoaWQgPT09ICdwcmV2aW91c1BhZ2UnKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmJvb2tQYWdlID4gMCA/IHN0b3JhZ2VfMS5zdG9yYWdlLmJvb2tQYWdlIC09IDEgOiBzdG9yYWdlXzEuc3RvcmFnZS5ib29rUGFnZTtcclxuICAgICAgICAgICAgKDAsIHJvdXRlcl8xLnJvdXRlcikoJ2Jvb2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlkID09PSAnbmV4dFBhZ2UnKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmJvb2tQYWdlIDwgc3RvcmFnZV8xLnN0b3JhZ2UudG90YWxQYWdlcyA/IHN0b3JhZ2VfMS5zdG9yYWdlLmJvb2tQYWdlICs9IDEgOiBzdG9yYWdlXzEuc3RvcmFnZS5ib29rUGFnZTtcclxuICAgICAgICAgICAgKDAsIHJvdXRlcl8xLnJvdXRlcikoJ2Jvb2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlkLnNwbGl0KCctJylbMF0gPT09ICdwYWdlTGlzdE9wdGlvbicpIHtcclxuICAgICAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UuYm9va1BhZ2UgPSAraWQuc3BsaXQoJy0nKVsxXTtcclxuICAgICAgICAgICAgKDAsIHJvdXRlcl8xLnJvdXRlcikoJ2Jvb2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlkID09PSAnc2VjdGlvbicpXHJcbiAgICAgICAgICAgICgwLCByb2xsTWVudV8xLnJvbGxTZWN0aW9uU2VsZWN0b3IpKCdvcGVuJyk7XHJcbiAgICAgICAgaWYgKGlkICE9PSAnc2VjdGlvbicpXHJcbiAgICAgICAgICAgICgwLCByb2xsTWVudV8xLnJvbGxTZWN0aW9uU2VsZWN0b3IpKCdjbG9zZScpO1xyXG4gICAgICAgIGlmIChpZC5zcGxpdCgnLScpWzBdID09PSAnc2VjdGlvbkxpc3RPcHRpb24nKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmJvb2tHcm91cCA9ICtpZC5zcGxpdCgnLScpWzFdO1xyXG4gICAgICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5ib29rUGFnZSA9IDA7XHJcbiAgICAgICAgICAgICgwLCByb3V0ZXJfMS5yb3V0ZXIpKCdib29rJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpZCA9PT0gJ2dhbWVzJylcclxuICAgICAgICAgICAgKDAsIHJvbGxNZW51XzEucm9sbEdhbWVzU2VsZWN0b3IpKCdvcGVuJyk7XHJcbiAgICAgICAgaWYgKGlkICE9PSAnZ2FtZXMnKVxyXG4gICAgICAgICAgICAoMCwgcm9sbE1lbnVfMS5yb2xsR2FtZXNTZWxlY3RvcikoJ2Nsb3NlJyk7XHJcbiAgICAgICAgaWYgKGlkLnNwbGl0KCctJylbMF0gPT09ICdnYW1lc0xpc3RPcHRpb24nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhbWVUb1RyYXZlbFRvID0gaWQuc3BsaXQoJy0nKVsxXTtcclxuICAgICAgICAgICAgc3dpdGNoIChnYW1lVG9UcmF2ZWxUbykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnYXVkaW8nOlxyXG4gICAgICAgICAgICAgICAgICAgICgwLCByb3V0ZXJfMS5yb3V0ZXIpKCdhdWRpbycsICdvbmx5T25lUGFnZVJlcXVpcmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyBjYXNlICdwdXp6bGUnOiByb3V0ZXIoJ3B1enpsZScsICdvbmx5T25lUGFnZVJlcXVpcmVkJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vIGNhc2UgJ3RpbWUnOiByb3V0ZXIoJ3RpbWUnLCAnb25seU9uZVBhZ2VSZXF1aXJlZCcpO1xyXG4gICAgICAgICAgICAgICAgLy8gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyBjYXNlICdzcHJpbnQnOiByb3V0ZXIoJ3NwcmludCcsICdvbmx5T25lUGFnZVJlcXVpcmVkJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaWQuc3BsaXQoJy0nKVswXSA9PT0gJ3BsYXlTb3VuZCcpXHJcbiAgICAgICAgICAgICgwLCBwbGF5U291bmRfMS5wbGF5U291bmQpKGlkLnNwbGl0KCctJylbMV0pO1xyXG4gICAgICAgIGlmIChpZCA9PT0gJ3JlcGVhdEF1ZGlvJykge1xyXG4gICAgICAgICAgICBjb25zdCBhdWRpb0JpdGUgPSBuZXcgQXVkaW87XHJcbiAgICAgICAgICAgIGF1ZGlvQml0ZS5zcmMgPSBgJHthcGlfMS5maWxlc1VybH0vJHtzdG9yYWdlXzEuc3RvcmFnZS5yaWdodEFuc3dlci5hdWRpb31gO1xyXG4gICAgICAgICAgICBhdWRpb0JpdGUucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5leHBvcnRzLmxpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5hdWRpb0NoYWxsZW5nZVBhZ2UgPSB2b2lkIDA7XHJcbmNvbnN0IGxvYWRlcl8xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL2xvYWRlclwiKTtcclxuY29uc3QgYXVkaW9DaGFsbGVuZ2VfMSA9IHJlcXVpcmUoXCIuLi8uLi9nYW1lcy9hdWRpb0NoYWxsZW5nZVwiKTtcclxuY29uc3QgZ2V0RGF0YV8xID0gcmVxdWlyZShcIi4uLy4uL2dhbWVzL2dldERhdGFcIik7XHJcbmNvbnN0IHN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9zdG9yYWdlXCIpO1xyXG5leHBvcnRzLmF1ZGlvQ2hhbGxlbmdlUGFnZSA9IHtcclxuICAgIHJlbmRlcjogKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgKDAsIGxvYWRlcl8xLnNob3dMb2FkZXIpKCk7XHJcbiAgICAgICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLm9ubHlPbmVQYWdlID8geWllbGQgKDAsIGdldERhdGFfMS5nZXRTaW5nbGVQYWdlRGF0YSkoKSA6IHlpZWxkICgwLCBnZXREYXRhXzEuZ2V0RGF0YSkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKF9hKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwid3JhcHBlckdhbWVzXCI+XHJcbiAgICAgIDxkaXYgaWQ9XCJ3cmFwcGVyQXVkaW9HYW1lXCI+XHJcbiAgICAgICAgPGRpdiBpZD1cInJlcGVhdEF1ZGlvXCI+XHJcbiAgICAgICAgICA8aW1nIGlkPVwicmVwZWF0QXVkaW9JY29uXCIgc3JjPVwiYXNzZXRzL3N2Zy9zb3VuZC5zdmdcIiBhbHQ9XCJpY29uXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBpZD1cImF1ZGlvR2FtZU9wdGlvbnNcIj48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgICB9KSxcclxuICAgIGFmdGVyUmVuZGVyOiAoKSA9PiB7XHJcbiAgICAgICAgKDAsIGF1ZGlvQ2hhbGxlbmdlXzEucnVuQXVkaW9HYW1lKSgpO1xyXG4gICAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuYm9va1BhZ2UgPSB2b2lkIDA7XHJcbmNvbnN0IHN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9zdG9yYWdlXCIpO1xyXG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9hcGlcIik7XHJcbmNvbnN0IGxvYWRlcl8xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL2xvYWRlclwiKTtcclxuZXhwb3J0cy5ib29rUGFnZSA9IHtcclxuICAgIHJlbmRlcjogKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBib29rR3JvdXAsIGJvb2tQYWdlIH0gPSBzdG9yYWdlXzEuc3RvcmFnZTtcclxuICAgICAgICBsZXQgaW5mbztcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAoMCwgbG9hZGVyXzEuc2hvd0xvYWRlcikoKTtcclxuICAgICAgICAgICAgaW5mbyA9IHlpZWxkICgwLCBhcGlfMS5nZXRXb3JkcykoYm9va0dyb3VwLCBib29rUGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAoMCwgbG9hZGVyXzEuaGlkZUxvYWRlcikoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBhZ2VMYXlvdXQgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZm8ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcGFnZUxheW91dCArPSB5aWVsZCBnZW5lcmF0ZUNhcmQoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdbMF0udG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVDYXJkKGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cclxuICAgICAgICAgIDxpbWcgY2xhc3M9XCJjYXJkSW1nXCIgc3JjPVwiJHthcGlfMS5maWxlc1VybH0vJHtpbmZvW2ldLmltYWdlfVwiIGFsdD1cIiR7aW5mb1tpXS53b3JkfVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRJbmZvXCI+XHJcbiAgICAgICAgICAgIDxoMj4ke2NhcGl0YWxpemUoaW5mb1tpXS53b3JkKX0gLSAke2luZm9baV0udHJhbnNjcmlwdGlvbn08aW1nIGNsYXNzPVwic291bmRJY29uXCIgaWQ9XCJwbGF5U291bmQtJHtpbmZvW2ldLmF1ZGlvfVwiIHNyYz1cImFzc2V0cy9zdmcvc291bmQuc3ZnXCIgYWx0PVwic291bmRcIj48L2gyPlxyXG4gICAgICAgICAgICA8aDM+JHtjYXBpdGFsaXplKGluZm9baV0ud29yZFRyYW5zbGF0ZSl9PC9oMz5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbi10b3A6IDIwcHhcIj5cclxuICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwic291bmRJY29uMlwiIGlkPVwicGxheVNvdW5kLSR7aW5mb1tpXS5hdWRpb01lYW5pbmd9XCIgc3JjPVwiYXNzZXRzL3N2Zy9wbGF5QnV0dG9uLnN2Z1wiIGFsdD1cInNvdW5kXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4+JHtpbmZvW2ldLnRleHRNZWFuaW5nfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxzcGFuPiR7aW5mb1tpXS50ZXh0TWVhbmluZ1RyYW5zbGF0ZX08L3NwYW4+PGJyPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLXRvcDogMjBweFwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJzb3VuZEljb24yXCIgaWQ9XCJwbGF5U291bmQtJHtpbmZvW2ldLmF1ZGlvRXhhbXBsZX1cIiBzcmM9XCJhc3NldHMvc3ZnL3BsYXlCdXR0b24uc3ZnXCIgYWx0PVwic291bmRcIj5cclxuICAgICAgICAgICAgICA8c3Bhbj4ke2luZm9baV0udGV4dEV4YW1wbGV9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPHNwYW4+JHtpbmZvW2ldLnRleHRFeGFtcGxlVHJhbnNsYXRlfTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XHJcbiAgICAgIDxoMT7Qo9GH0LXQsdC90LjQujwvaDE+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwYWdlQ29udHJvbHNcIj5cclxuICAgICAgICA8ZGl2IGlkPVwic2VjdGlvblwiPlxyXG4gICAgICAgICAgPGltZyBzcmM9XCJhc3NldHMvc3ZnL2ZvbGRlci5zdmdcIiBhbHQ9XCJmb2xkZXJJY29uXCI+XHJcbiAgICAgICAgICA8c3Bhbj7QoNCw0LfQtNC10LsgPHNwYW4gaWQ9XCJzZWN0aW9uQ291bnRlclwiPiR7c3RvcmFnZV8xLnN0b3JhZ2UuYm9va0dyb3VwICsgMX0vJHtzdG9yYWdlXzEuc3RvcmFnZS50b3RhbEdyb3Vwc308L3NwYW4+PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJwYWdlXCI+XHJcbiAgICAgICAgICA8ZGl2IGlkPVwicHJldmlvdXNQYWdlXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiYXNzZXRzL3N2Zy9hcnJvdy5zdmdcIiBhbHQ9XCJwcmV2XCI+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxzcGFuPtCh0YLRgNCw0L3QuNGG0LAgPHNwYW4gaWQ9XCJwYWdlQ291bnRlclwiPiR7c3RvcmFnZV8xLnN0b3JhZ2UuYm9va1BhZ2UgKyAxfS8ke3N0b3JhZ2VfMS5zdG9yYWdlLnRvdGFsUGFnZXN9PC9zcGFuPjwvc3Bhbj5cclxuICAgICAgICAgIDxkaXYgaWQ9XCJuZXh0UGFnZVwiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9zdmcvYXJyb3cuc3ZnXCIgYWx0PVwibmV4dFwiPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBpZD1cInNldHRpbmdzXCI+XHJcbiAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9zdmcvc2V0dGluZ3Muc3ZnXCIgYWx0PVwic2V0dGluZ3NJY29uXCI+XHJcbiAgICAgICAgICA8c3Bhbj7QndCw0YHRgtGA0L7QudC60Lg8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBpZD1cImdhbWVzXCI+XHJcbiAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9zdmcvZ2FtZXBhZC5zdmdcIiBhbHQ9XCJnYW1lc0ljb25cIj5cclxuICAgICAgICAgIDxzcGFuPtCY0LPRgNGLPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgJHtwYWdlTGF5b3V0fVxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicmV0dXJuQnV0dG9uXCI+PC9kaXY+XHJcbiAgICBgO1xyXG4gICAgfSksXHJcbiAgICBhZnRlclJlbmRlcjogKCkgPT4ge1xyXG4gICAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmNvbW1lbnRzUGFnZSA9IHZvaWQgMDtcclxuZXhwb3J0cy5jb21tZW50c1BhZ2UgPSB7XHJcbiAgICByZW5kZXI6ICgpID0+IChgXHJcbiAgICA8aDE+SGVsbG8gQ29tbWVudHMgYmx5YWQ8L2gxPlxyXG4gIGApLFxyXG4gICAgYWZ0ZXJSZW5kZXI6ICgpID0+IHtcclxuICAgIH1cclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZXZQYWdlID0gdm9pZCAwO1xyXG5leHBvcnRzLmRldlBhZ2UgPSB7XHJcbiAgICByZW5kZXI6ICgpID0+IChgXHJcbiAgICA8aDE+SGVsbG8gRGV2IGJseWFkPC9oMT5cclxuICBgKSxcclxuICAgIGFmdGVyUmVuZGVyOiAoKSA9PiB7XHJcbiAgICB9XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZ2FtZXNQYWdlID0gdm9pZCAwO1xyXG5leHBvcnRzLmdhbWVzUGFnZSA9IHtcclxuICAgIHJlbmRlcjogKCkgPT4gKGBcclxuICA8ZGl2IGNsYXNzPVwid3JhcHBlckdhbWVzXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZ2FtZU1vZGVTZWxlY3RvclwiPlxyXG4gICAgICA8c3Bhbj5BdWRpbyBjaGFsbGVuZ2U8L3NwYW4+XHJcbiAgICAgIDxkaXYgaWQ9XCJnb0F1ZGlvXCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJnYW1lTW9kZVNlbGVjdG9yXCI+XHJcbiAgICAgIDxzcGFuPlNwcmludCBtb2RlPC9zcGFuPlxyXG4gICAgICA8ZGl2IGlkPVwiZ29TcHJpbnRcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImdhbWVNb2RlU2VsZWN0b3JcIj5cclxuICAgICAgPHNwYW4+VGltZSBnYW1lPC9zcGFuPlxyXG4gICAgICA8ZGl2IGlkPVwiZ29UaW1lXCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJnYW1lTW9kZVNlbGVjdG9yXCI+XHJcbiAgICAgIDxzcGFuPlB1enpsZSBnYW1lPC9zcGFuPlxyXG4gICAgICA8ZGl2IGlkPVwiZ29QdXp6bGVcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIGApLFxyXG4gICAgYWZ0ZXJSZW5kZXI6ICgpID0+IHtcclxuICAgIH1cclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5oaXN0b3J5UGFnZSA9IHZvaWQgMDtcclxuZXhwb3J0cy5oaXN0b3J5UGFnZSA9IHtcclxuICAgIHJlbmRlcjogKCkgPT4gKGBcclxuICAgIDxoMT5IZWxsbyBIaXN0b3J5IGJseWFkPC9oMT5cclxuICBgKSxcclxuICAgIGFmdGVyUmVuZGVyOiAoKSA9PiB7XHJcbiAgICB9XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuaG9tZVBhZ2UgPSB2b2lkIDA7XHJcbmV4cG9ydHMuaG9tZVBhZ2UgPSB7XHJcbiAgICByZW5kZXI6ICgpID0+IChgXHJcbiAgICA8aDE+SE9NRSBQQUdFIEJMWUFkPC9oMT5cclxuICBgKSxcclxuICAgIGFmdGVyUmVuZGVyOiAoKSA9PiB7XHJcbiAgICB9XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5zcHJpbnRQYWdlID0gdm9pZCAwO1xyXG5jb25zdCBzcHJpbnRfMSA9IHJlcXVpcmUoXCIuLi8uLi9nYW1lcy9zcHJpbnRcIik7XHJcbmNvbnN0IGdldERhdGFfMSA9IHJlcXVpcmUoXCIuLi8uLi9nYW1lcy9nZXREYXRhXCIpO1xyXG5jb25zdCBzdG9yYWdlXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvc3RvcmFnZVwiKTtcclxuY29uc3QgbG9hZGVyXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvbG9hZGVyXCIpO1xyXG5jb25zdCB0aW1lcl8xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL3RpbWVyXCIpO1xyXG5leHBvcnRzLnNwcmludFBhZ2UgPSB7XHJcbiAgICByZW5kZXI6ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICgwLCBsb2FkZXJfMS5zaG93TG9hZGVyKSgpO1xyXG4gICAgICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5vbmx5T25lUGFnZSA/IHlpZWxkICgwLCBnZXREYXRhXzEuZ2V0U2luZ2xlUGFnZURhdGEpKCkgOiB5aWVsZCAoMCwgZ2V0RGF0YV8xLmdldERhdGEpKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChfYSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYFxyXG4gIDxkaXYgY2xhc3M9XCJ3cmFwcGVyR2FtZXNcIj5cclxuICAgIDxkaXYgaWQ9XCJ3cmFwcGVyU3ByaW50XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lckhvbGRlclwiPlxyXG4gICAgICAgIDxjYW52YXMgaWQ9XCJ0aW1lTGVmdFwiIHdpZHRoPVwiMTUwXCIgaGVpZ2h0PVwiMTUwXCI+PC9jYW52YXM+XHJcbiAgICAgICAgPHNwYW4gaWQ9XCJ0aW1lTGVmdERpZ2l0c1wiPjwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxzcGFuIGlkPVwic3ByaW50V29yZFNwYW5cIj48L3NwYW4+XHJcbiAgICAgIDxzcGFuIGlkPVwic3ByaW50VmFyaWFudFNwYW5cIj48L3NwYW4+XHJcbiAgICAgIDxkaXYgaWQ9XCJzcHJpbnRCdXR0b25zXCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICBgO1xyXG4gICAgfSksXHJcbiAgICBhZnRlclJlbmRlcjogKCkgPT4ge1xyXG4gICAgICAgICgwLCB0aW1lcl8xLnRpbWVyKSgpO1xyXG4gICAgICAgICgwLCBzcHJpbnRfMS5ydW5TcHJpbnQpKCk7XHJcbiAgICB9XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuc3RhdHNQYWdlID0gdm9pZCAwO1xyXG5leHBvcnRzLnN0YXRzUGFnZSA9IHtcclxuICAgIHJlbmRlcjogKCkgPT4gKGBcclxuICAgIDxoMT5IZWxsbyBTdGF0cyBibHlhZDwvaDE+XHJcbiAgYCksXHJcbiAgICBhZnRlclJlbmRlcjogKCkgPT4ge1xyXG4gICAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnJvbGxHYW1lc1NlbGVjdG9yID0gZXhwb3J0cy5yb2xsU2VjdGlvblNlbGVjdG9yID0gZXhwb3J0cy5yb2xsUGFnZVNlbGVjdG9yID0gZXhwb3J0cy5yb2xsTWVudSA9IHZvaWQgMDtcclxuY29uc3Qgc3RvcmFnZV8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3N0b3JhZ2VcIik7XHJcbmZ1bmN0aW9uIHJvbGxNZW51KGFjdGlvbikge1xyXG4gICAgY29uc3Qgb3Blbk1lbnVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3Blbk1lbnVCdXR0b24nKTtcclxuICAgIGNvbnN0IG5hdmlnYXRpb25NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hdmlnYXRpb25NZW51Jyk7XHJcbiAgICBjb25zdCB1cHBlckJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cHBlckJhcicpO1xyXG4gICAgY29uc3QgbG9nb01haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9nb01haW4nKTtcclxuICAgIGlmIChhY3Rpb24gPT09ICdvcGVuJyAmJiAhc3RvcmFnZV8xLnN0b3JhZ2UuaXNNZW51T3Blbikge1xyXG4gICAgICAgIG9wZW5NZW51QnV0dG9uLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0xMDAlKSc7XHJcbiAgICAgICAgdXBwZXJCYXIuc3R5bGUud2lkdGggPSAnY2FsYygxMDB2dyAtIDI2MHB4KSc7XHJcbiAgICAgICAgbmF2aWdhdGlvbk1lbnUuc3R5bGUud2lkdGggPSAnMjYwcHgnO1xyXG4gICAgICAgIGxvZ29NYWluLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0xMjAlKSc7XHJcbiAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UuaXNNZW51T3BlbiA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBvcGVuTWVudUJ1dHRvbi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgwJSknO1xyXG4gICAgICAgIHVwcGVyQmFyLnN0eWxlLndpZHRoID0gJ2NhbGMoMTAwdncgLSA3MHB4KSc7XHJcbiAgICAgICAgbmF2aWdhdGlvbk1lbnUuc3R5bGUud2lkdGggPSAnNzBweCc7XHJcbiAgICAgICAgbG9nb01haW4uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoMCUpJztcclxuICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5pc01lbnVPcGVuID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5yb2xsTWVudSA9IHJvbGxNZW51O1xyXG5mdW5jdGlvbiByb2xsUGFnZVNlbGVjdG9yKGFjdGlvbikge1xyXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cmFwcGVyJyk7XHJcbiAgICBpZiAoIXN0b3JhZ2VfMS5zdG9yYWdlLmlzUGFnZUxpc3RPcGVuICYmIGFjdGlvbiA9PT0gJ29wZW4nKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZCgncGFnZUxpc3QnKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3JhZ2VfMS5zdG9yYWdlLnRvdGFsUGFnZXM7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQoJ3BhZ2VMaXN0T3B0aW9uJyk7XHJcbiAgICAgICAgICAgIG9wdGlvbi5pZCA9IGBwYWdlTGlzdE9wdGlvbi0ke2l9YDtcclxuICAgICAgICAgICAgb3B0aW9uLmlubmVyVGV4dCA9IGDQodGC0YDQsNC90LjRhtCwICR7aSArIDF9YDtcclxuICAgICAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByb290ID09PSBudWxsIHx8IHJvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJvb3QuYXBwZW5kQ2hpbGQobGlzdCk7XHJcbiAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UuaXNQYWdlTGlzdE9wZW4gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3RvcmFnZV8xLnN0b3JhZ2UuaXNQYWdlTGlzdE9wZW4pIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2VMaXN0Jyk7XHJcbiAgICAgICAgcm9vdCA9PT0gbnVsbCB8fCByb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiByb290LnJlbW92ZUNoaWxkKGxpc3QpO1xyXG4gICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmlzUGFnZUxpc3RPcGVuID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5yb2xsUGFnZVNlbGVjdG9yID0gcm9sbFBhZ2VTZWxlY3RvcjtcclxuZnVuY3Rpb24gcm9sbFNlY3Rpb25TZWxlY3RvcihhY3Rpb24pIHtcclxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpO1xyXG4gICAgaWYgKCFzdG9yYWdlXzEuc3RvcmFnZS5pc0dyb3VwTGlzdE9wZW4gJiYgYWN0aW9uID09PSAnb3BlbicpIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uTGlzdCcpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcmFnZV8xLnN0b3JhZ2UudG90YWxHcm91cHM7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb25MaXN0T3B0aW9uJyk7XHJcbiAgICAgICAgICAgIG9wdGlvbi5pZCA9IGBzZWN0aW9uTGlzdE9wdGlvbi0ke2l9YDtcclxuICAgICAgICAgICAgb3B0aW9uLmlubmVyVGV4dCA9IGDQoNCw0LfQtNC10LsgJHtpICsgMX1gO1xyXG4gICAgICAgICAgICBsaXN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmlzR3JvdXBMaXN0T3BlbiA9IHRydWU7XHJcbiAgICAgICAgcm9vdCA9PT0gbnVsbCB8fCByb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiByb290LmFwcGVuZENoaWxkKGxpc3QpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3RvcmFnZV8xLnN0b3JhZ2UuaXNHcm91cExpc3RPcGVuKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uTGlzdCcpO1xyXG4gICAgICAgIHJvb3QgPT09IG51bGwgfHwgcm9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcm9vdC5yZW1vdmVDaGlsZChsaXN0KTtcclxuICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5pc0dyb3VwTGlzdE9wZW4gPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnJvbGxTZWN0aW9uU2VsZWN0b3IgPSByb2xsU2VjdGlvblNlbGVjdG9yO1xyXG5mdW5jdGlvbiByb2xsR2FtZXNTZWxlY3RvcihhY3Rpb24pIHtcclxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpO1xyXG4gICAgaWYgKCFzdG9yYWdlXzEuc3RvcmFnZS5pc0dhbWVzTGlzdE9wZW4gJiYgYWN0aW9uID09PSAnb3BlbicpIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKCdnYW1lc0xpc3QnKTtcclxuICAgICAgICBsZXQgR2FtZXNSVTtcclxuICAgICAgICAoZnVuY3Rpb24gKEdhbWVzUlUpIHtcclxuICAgICAgICAgICAgR2FtZXNSVVtHYW1lc1JVW1wiXFx1MDQxMFxcdTA0NDNcXHUwNDM0XFx1MDQzOFxcdTA0M0VcIl0gPSAwXSA9IFwiXFx1MDQxMFxcdTA0NDNcXHUwNDM0XFx1MDQzOFxcdTA0M0VcIjtcclxuICAgICAgICAgICAgR2FtZXNSVVtHYW1lc1JVW1wiXFx1MDQyMVxcdTA0M0ZcXHUwNDQwXFx1MDQzOFxcdTA0M0RcXHUwNDQyXCJdID0gMV0gPSBcIlxcdTA0MjFcXHUwNDNGXFx1MDQ0MFxcdTA0MzhcXHUwNDNEXFx1MDQ0MlwiO1xyXG4gICAgICAgICAgICBHYW1lc1JVW0dhbWVzUlVbXCJcXHUwNDE4XFx1MDQzM1xcdTA0NDBcXHUwNDMwIFxcdTA0M0RcXHUwNDMwIFxcdTA0MzJcXHUwNDQwXFx1MDQzNVxcdTA0M0NcXHUwNDRGXCJdID0gMl0gPSBcIlxcdTA0MThcXHUwNDMzXFx1MDQ0MFxcdTA0MzAgXFx1MDQzRFxcdTA0MzAgXFx1MDQzMlxcdTA0NDBcXHUwNDM1XFx1MDQzQ1xcdTA0NEZcIjtcclxuICAgICAgICAgICAgR2FtZXNSVVtHYW1lc1JVW1wiXFx1MDQxRlxcdTA0MzBcXHUwNDM3XFx1MDQzQlwiXSA9IDNdID0gXCJcXHUwNDFGXFx1MDQzMFxcdTA0MzdcXHUwNDNCXCI7XHJcbiAgICAgICAgfSkoR2FtZXNSVSB8fCAoR2FtZXNSVSA9IHt9KSk7XHJcbiAgICAgICAgbGV0IEdhbWVzO1xyXG4gICAgICAgIChmdW5jdGlvbiAoR2FtZXMpIHtcclxuICAgICAgICAgICAgR2FtZXNbR2FtZXNbXCJhdWRpb1wiXSA9IDBdID0gXCJhdWRpb1wiO1xyXG4gICAgICAgICAgICBHYW1lc1tHYW1lc1tcInNwcmludFwiXSA9IDFdID0gXCJzcHJpbnRcIjtcclxuICAgICAgICAgICAgR2FtZXNbR2FtZXNbXCJ0aW1lXCJdID0gMl0gPSBcInRpbWVcIjtcclxuICAgICAgICAgICAgR2FtZXNbR2FtZXNbXCJwdXp6bGVcIl0gPSAzXSA9IFwicHV6emxlXCI7XHJcbiAgICAgICAgfSkoR2FtZXMgfHwgKEdhbWVzID0ge30pKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3JhZ2VfMS5zdG9yYWdlLnRvdGFsR2FtZXM7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQoJ2dhbWVzTGlzdE9wdGlvbicpO1xyXG4gICAgICAgICAgICBvcHRpb24uaWQgPSBgZ2FtZXNMaXN0T3B0aW9uLSR7R2FtZXNbaV19YDtcclxuICAgICAgICAgICAgb3B0aW9uLmlubmVyVGV4dCA9IGAke0dhbWVzUlVbaV19YDtcclxuICAgICAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5pc0dhbWVzTGlzdE9wZW4gPSB0cnVlO1xyXG4gICAgICAgIHJvb3QgPT09IG51bGwgfHwgcm9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcm9vdC5hcHBlbmRDaGlsZChsaXN0KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHN0b3JhZ2VfMS5zdG9yYWdlLmlzR2FtZXNMaXN0T3Blbikge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZXNMaXN0Jyk7XHJcbiAgICAgICAgcm9vdCA9PT0gbnVsbCB8fCByb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiByb290LnJlbW92ZUNoaWxkKGxpc3QpO1xyXG4gICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmlzR2FtZXNMaXN0T3BlbiA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMucm9sbEdhbWVzU2VsZWN0b3IgPSByb2xsR2FtZXNTZWxlY3RvcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnJvdXRlciA9IHZvaWQgMDtcclxuY29uc3QgaG9tZVBhZ2VfMSA9IHJlcXVpcmUoXCIuL3BhZ2VzL2hvbWVQYWdlXCIpO1xyXG5jb25zdCBib29rUGFnZV8xID0gcmVxdWlyZShcIi4vcGFnZXMvYm9va1BhZ2VcIik7XHJcbmNvbnN0IGhpc3RvcnlQYWdlXzEgPSByZXF1aXJlKFwiLi9wYWdlcy9oaXN0b3J5UGFnZVwiKTtcclxuY29uc3QgZ2FtZXNQYWdlXzEgPSByZXF1aXJlKFwiLi9wYWdlcy9nYW1lc1BhZ2VcIik7XHJcbmNvbnN0IHN0YXRzUGFnZV8xID0gcmVxdWlyZShcIi4vcGFnZXMvc3RhdHNQYWdlXCIpO1xyXG5jb25zdCBkZXZQYWdlXzEgPSByZXF1aXJlKFwiLi9wYWdlcy9kZXZQYWdlXCIpO1xyXG5jb25zdCBjb21tZW50c1BhZ2VfMSA9IHJlcXVpcmUoXCIuL3BhZ2VzL2NvbW1lbnRzUGFnZVwiKTtcclxuY29uc3QgYXVkaW9DaGFsbGVuZ2VQYWdlXzEgPSByZXF1aXJlKFwiLi9wYWdlcy9hdWRpb0NoYWxsZW5nZVBhZ2VcIik7XHJcbmNvbnN0IHN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9zdG9yYWdlXCIpO1xyXG5jb25zdCBzcHJpbnRQYWdlXzEgPSByZXF1aXJlKFwiLi9wYWdlcy9zcHJpbnRQYWdlXCIpO1xyXG5jb25zdCByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQnKTtcclxuY29uc3QgcGFnZXMgPSB7XHJcbiAgICBob21lOiBob21lUGFnZV8xLmhvbWVQYWdlLFxyXG4gICAgYm9vazogYm9va1BhZ2VfMS5ib29rUGFnZSxcclxuICAgIGhpc3Rvcnk6IGhpc3RvcnlQYWdlXzEuaGlzdG9yeVBhZ2UsXHJcbiAgICBnYW1lczogZ2FtZXNQYWdlXzEuZ2FtZXNQYWdlLFxyXG4gICAgc3RhdHM6IHN0YXRzUGFnZV8xLnN0YXRzUGFnZSxcclxuICAgIGRldjogZGV2UGFnZV8xLmRldlBhZ2UsXHJcbiAgICBjb21tZW50czogY29tbWVudHNQYWdlXzEuY29tbWVudHNQYWdlLFxyXG4gICAgYXVkaW86IGF1ZGlvQ2hhbGxlbmdlUGFnZV8xLmF1ZGlvQ2hhbGxlbmdlUGFnZSxcclxuICAgIHNwcmludDogc3ByaW50UGFnZV8xLnNwcmludFBhZ2VcclxufTtcclxuY29uc3QgZ2V0UGFnZUZyb21OYW1lID0gKHBhZ2VOYW1lKSA9PiBwYWdlc1twYWdlTmFtZV0gfHwgbnVsbDtcclxuY29uc3Qgcm91dGVyID0gKHBhZ2VOYW1lLCBpbnN0cnVjdGlvbikgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBsZXQgcGFnZSA9IGdldFBhZ2VGcm9tTmFtZShwYWdlTmFtZSk7XHJcbiAgICBpbnN0cnVjdGlvbiA/IHN0b3JhZ2VfMS5zdG9yYWdlLm9ubHlPbmVQYWdlID0gdHJ1ZSA6IHN0b3JhZ2VfMS5zdG9yYWdlLm9ubHlPbmVQYWdlID0gZmFsc2U7XHJcbiAgICBpZiAocGFnZSAmJiByb290KSB7XHJcbiAgICAgICAgcm9vdC5pbm5lckhUTUwgPSB5aWVsZCBwYWdlLnJlbmRlcigpO1xyXG4gICAgICAgIGlmIChwYWdlLmFmdGVyUmVuZGVyKSB7XHJcbiAgICAgICAgICAgIHBhZ2UuYWZ0ZXJSZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5leHBvcnRzLnJvdXRlciA9IHJvdXRlcjtcclxuZnVuY3Rpb24gYWRkaXRpb25hbEV2ZW50KCkge1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZXRBbGxXb3JkcyA9IGV4cG9ydHMuZ2V0V29yZHMgPSBleHBvcnRzLmZpbGVzVXJsID0gdm9pZCAwO1xyXG5jb25zdCBzdG9yYWdlXzEgPSByZXF1aXJlKFwiLi9zdG9yYWdlXCIpO1xyXG5jb25zdCBiYXNlVVJMID0gJ2h0dHBzOi8vcnMtbGFuZy1yZWRibG9vZGVkLmhlcm9rdWFwcC5jb20nO1xyXG5leHBvcnRzLmZpbGVzVXJsID0gJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS92bGFkaW1pcnBhcm1vbi9yZWFjdC1yc2xhbmctYmUvbWFzdGVyJztcclxuY29uc3Qgd29yZHMgPSBgJHtiYXNlVVJMfS93b3Jkc2A7XHJcbmNvbnN0IHVzZXJzID0gYCR7YmFzZVVSTH0vdXNlcnNgO1xyXG5jb25zdCBnZXRXb3JkcyA9IChncm91cCwgcGFnZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAke3dvcmRzfT9ncm91cD0ke2dyb3VwfSZwYWdlPSR7cGFnZX1gKTtcclxuICAgIHJldHVybiB5aWVsZCByZXNwb25zZS5qc29uKCk7XHJcbn0pO1xyXG5leHBvcnRzLmdldFdvcmRzID0gZ2V0V29yZHM7XHJcbmNvbnN0IGdldEFsbFdvcmRzID0gKGdyb3VwLCBzaW5nbGUpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgaWYgKCFzaW5nbGUpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3JhZ2VfMS5zdG9yYWdlLnRvdGFsUGFnZXM7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBpbmZvID0geWllbGQgKDAsIGV4cG9ydHMuZ2V0V29yZHMpKGdyb3VwLCBpKTtcclxuICAgICAgICAgICAgY29uc3QgcGFnZSA9IGluZm8ubWFwKChlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogZWwuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgd29yZDogZWwud29yZCxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGU6IGVsLndvcmRUcmFuc2xhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXVkaW86IGVsLmF1ZGlvLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBlbC5pbWFnZSxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2NyaXB0aW9uOiBlbC50cmFuc2NyaXB0aW9uXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goLi4ucGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3QgaW5mbyA9IHlpZWxkICgwLCBleHBvcnRzLmdldFdvcmRzKShncm91cCwgc3RvcmFnZV8xLnN0b3JhZ2UuYm9va1BhZ2UpO1xyXG4gICAgICAgIGNvbnN0IHBhZ2UgPSBpbmZvLm1hcCgoZWwpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGlkOiBlbC5pZCxcclxuICAgICAgICAgICAgICAgIHdvcmQ6IGVsLndvcmQsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGU6IGVsLndvcmRUcmFuc2xhdGUsXHJcbiAgICAgICAgICAgICAgICBhdWRpbzogZWwuYXVkaW8sXHJcbiAgICAgICAgICAgICAgICBpbWFnZTogZWwuaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2NyaXB0aW9uOiBlbC50cmFuc2NyaXB0aW9uXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVzdWx0LnB1c2goLi4ucGFnZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59KTtcclxuZXhwb3J0cy5nZXRBbGxXb3JkcyA9IGdldEFsbFdvcmRzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmNoZWNrQ2hvaWNlID0gZXhwb3J0cy5jaGVja0tleXMgPSB2b2lkIDA7XHJcbmNvbnN0IHN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuL3N0b3JhZ2VcIik7XHJcbmNvbnN0IGF1ZGlvQ2hhbGxlbmdlXzEgPSByZXF1aXJlKFwiLi4vZ2FtZXMvYXVkaW9DaGFsbGVuZ2VcIik7XHJcbmNvbnN0IG1pc2NfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9taXNjXCIpO1xyXG5mdW5jdGlvbiBjaGVja0tleXMoY29kZSkge1xyXG4gICAgY29uc3Qgd3JhcHBlckdhbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXJHYW1lcycpO1xyXG4gICAgY29uc3QgaW5kZXggPSArY29kZS5zbGljZSgtMSkgLSAxO1xyXG4gICAgaWYgKHdyYXBwZXJHYW1lcyAmJiBpbmRleCA8IDUpIHtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBtaXNjXzEuY2hlY2tGb3IpO1xyXG4gICAgICAgIGNoZWNrQ2hvaWNlKHN0b3JhZ2VfMS5zdG9yYWdlLmN1cnJlbnRPcHRpb25zW2luZGV4XSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5jaGVja0tleXMgPSBjaGVja0tleXM7XHJcbmZ1bmN0aW9uIGNoZWNrQ2hvaWNlKGlkKSB7XHJcbiAgICBjb25zdCBidXR0b25QcmVzc2VkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2F1ZGlvR2FtZU9wdGlvbi0ke2lkfWApO1xyXG4gICAgY29uc3QgYXVkaW9CaXRlID0gbmV3IEF1ZGlvO1xyXG4gICAgaWYgKGlkID09PSBzdG9yYWdlXzEuc3RvcmFnZS5yaWdodEFuc3dlci5pZCkge1xyXG4gICAgICAgIGF1ZGlvQml0ZS5zcmMgPSAnLi9hc3NldHMvc291bmRzL3JpZ2h0QW5zd2VyLm1wMyc7XHJcbiAgICAgICAgYnV0dG9uUHJlc3NlZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAndmFyKC0tdHJpbzMpJztcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGF1ZGlvQml0ZS5zcmMgPSAnLi9hc3NldHMvc291bmRzL3dyb25nQW5zd2VyLm1wMyc7XHJcbiAgICAgICAgYnV0dG9uUHJlc3NlZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAndmFyKC0td3JvbmcpJztcclxuICAgIH1cclxuICAgIGF1ZGlvQml0ZS5wbGF5KCk7XHJcbiAgICBpZiAoaWQpXHJcbiAgICAgICAgKDAsIGF1ZGlvQ2hhbGxlbmdlXzEucnVuQXVkaW9BbmltYXRpb24pKGlkKTtcclxufVxyXG5leHBvcnRzLmNoZWNrQ2hvaWNlID0gY2hlY2tDaG9pY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuaGlkZUxvYWRlciA9IGV4cG9ydHMuc2hvd0xvYWRlciA9IHZvaWQgMDtcclxuZnVuY3Rpb24gc2hvd0xvYWRlcigpIHtcclxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudCcpO1xyXG4gICAgY29uc3QgbG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBsb2FkZXIuY2xhc3NMaXN0LmFkZCgnbG9hZGVyJyk7XHJcbiAgICByb290ID09PSBudWxsIHx8IHJvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJvb3QuYXBwZW5kQ2hpbGQobG9hZGVyKTtcclxufVxyXG5leHBvcnRzLnNob3dMb2FkZXIgPSBzaG93TG9hZGVyO1xyXG5mdW5jdGlvbiBoaWRlTG9hZGVyKCkge1xyXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50Jyk7XHJcbiAgICBjb25zdCBsb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGVyJyk7XHJcbiAgICByb290ID09PSBudWxsIHx8IHJvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJvb3QucmVtb3ZlQ2hpbGQobG9hZGVyKTtcclxufVxyXG5leHBvcnRzLmhpZGVMb2FkZXIgPSBoaWRlTG9hZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmNoZWNrRm9yID0gZXhwb3J0cy5zaHVmZmxlID0gZXhwb3J0cy5jYXBpdGFsaXplID0gZXhwb3J0cy5nZXRSYW5kb21JbnQgPSB2b2lkIDA7XHJcbmNvbnN0IGNoZWNrc18xID0gcmVxdWlyZShcIi4vY2hlY2tzXCIpO1xyXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWluLCBtYXgpIHtcclxuICAgIG1pbiA9IE1hdGguY2VpbChtaW4pO1xyXG4gICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbn1cclxuZXhwb3J0cy5nZXRSYW5kb21JbnQgPSBnZXRSYW5kb21JbnQ7XHJcbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc3RyaW5nWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XHJcbn1cclxuZXhwb3J0cy5jYXBpdGFsaXplID0gY2FwaXRhbGl6ZTtcclxuZnVuY3Rpb24gc2h1ZmZsZShhcnJheSkge1xyXG4gICAgZm9yIChsZXQgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgICBsZXQgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG4gICAgICAgIFthcnJheVtpXSwgYXJyYXlbal1dID0gW2FycmF5W2pdLCBhcnJheVtpXV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbn1cclxuZXhwb3J0cy5zaHVmZmxlID0gc2h1ZmZsZTtcclxuZnVuY3Rpb24gY2hlY2tGb3IoZWwpIHtcclxuICAgICgwLCBjaGVja3NfMS5jaGVja0tleXMpKGVsLmNvZGUpO1xyXG59XHJcbmV4cG9ydHMuY2hlY2tGb3IgPSBjaGVja0ZvcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5wbGF5U291bmQgPSB2b2lkIDA7XHJcbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4vYXBpXCIpO1xyXG5mdW5jdGlvbiBwbGF5U291bmQoYWRkcmVzcykge1xyXG4gICAgY29uc3Qgc291bmQgPSBuZXcgQXVkaW87XHJcbiAgICBzb3VuZC5zcmMgPSBgJHthcGlfMS5maWxlc1VybH0vJHthZGRyZXNzfWA7XHJcbiAgICBzb3VuZC5wbGF5KCk7XHJcbn1cclxuZXhwb3J0cy5wbGF5U291bmQgPSBwbGF5U291bmQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuc3RvcmFnZSA9IHZvaWQgMDtcclxuZXhwb3J0cy5zdG9yYWdlID0ge1xyXG4gICAgYm9va0dyb3VwOiAwLFxyXG4gICAgYm9va1BhZ2U6IDAsXHJcbiAgICB0b3RhbEdyb3VwczogNixcclxuICAgIHRvdGFsR2FtZXM6IDQsXHJcbiAgICB0b3RhbFBhZ2VzOiAzMCxcclxuICAgIGl0ZW1zUGVyR3JvdXA6IDIwLFxyXG4gICAgdGltZUxpbWl0OiA1LFxyXG4gICAgaXNQYWdlTGlzdE9wZW46IGZhbHNlLFxyXG4gICAgaXNHcm91cExpc3RPcGVuOiBmYWxzZSxcclxuICAgIGlzR2FtZXNMaXN0T3BlbjogZmFsc2UsXHJcbiAgICBpc01lbnVPcGVuOiBmYWxzZSxcclxuICAgIGRpZmZpY3VsdHlMZXZlbHM6IHt9LFxyXG4gICAgY3VycmVudEdhbWVRdWV1ZTogW10sXHJcbiAgICBjdXJyZW50RGlmZmljdWx0eTogMCxcclxuICAgIGN1cnJlbnRPcHRpb25zOiBbXSxcclxuICAgIHdvcmtpbmdBcnJheTogW10sXHJcbiAgICBvbmx5T25lUGFnZTogZmFsc2UsXHJcbiAgICBvbmx5T25lUGFnZVRlbXBsYXRlOiBbXSxcclxuICAgIHNpbmdsZVZhcmlhbnQ6IHtcclxuICAgICAgICBpZDogJycsXHJcbiAgICAgICAgd29yZDogJycsXHJcbiAgICAgICAgdHJhbnNsYXRlOiAnJyxcclxuICAgICAgICBpbWFnZTogJycsXHJcbiAgICAgICAgYXVkaW86ICcnLFxyXG4gICAgICAgIHRyYW5zY3JpcHRpb246ICcnXHJcbiAgICB9LFxyXG4gICAgcmlnaHRBbnN3ZXI6IHtcclxuICAgICAgICBpZDogJycsXHJcbiAgICAgICAgd29yZDogJycsXHJcbiAgICAgICAgdHJhbnNsYXRlOiAnJyxcclxuICAgICAgICBpbWFnZTogJycsXHJcbiAgICAgICAgYXVkaW86ICcnLFxyXG4gICAgICAgIHRyYW5zY3JpcHRpb246ICcnXHJcbiAgICB9LFxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnRpbWVyID0gdm9pZCAwO1xyXG5jb25zdCBzcHJpbnRfMSA9IHJlcXVpcmUoXCIuLi9nYW1lcy9zcHJpbnRcIik7XHJcbmNvbnN0IHN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuL3N0b3JhZ2VcIik7XHJcbmZ1bmN0aW9uIHRpbWVyKCkge1xyXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpbWVMZWZ0Jyk7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICBjb25zdCBkaWdpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGltZUxlZnREaWdpdHMnKTtcclxuICAgIGNvbnRleHQubGluZUNhcCA9ICdyb3VuZCc7XHJcbiAgICBjb25zdCBkaWFtZXRlciA9IDE1MDtcclxuICAgIGNvbnN0IHJhZGl1cyA9IGRpYW1ldGVyIC8gMjtcclxuICAgIGNvbnN0IGluZGljYXRvcldpZHRoID0gODtcclxuICAgIGNvbnN0IHRyYWNrV2lkdGggPSAxO1xyXG4gICAgY29uc3QgY2lyY2xlID0gcmFkaXVzIC0gaW5kaWNhdG9yV2lkdGggLyAyO1xyXG4gICAgY29uc3QgdHJhY2sgPSByYWRpdXMgLSBpbmRpY2F0b3JXaWR0aCAvIDI7XHJcbiAgICBjbGVhcigpO1xyXG4gICAgY29uc3QgdGltZUxpbWl0ID0gc3RvcmFnZV8xLnN0b3JhZ2UudGltZUxpbWl0ICogMTAwMDtcclxuICAgIGxldCB0aW1lTGVmdCA9IHRpbWVMaW1pdDtcclxuICAgIGxldCBzZWNvbmRzTGVmdCA9IHN0b3JhZ2VfMS5zdG9yYWdlLnRpbWVMaW1pdDtcclxuICAgIGRpZ2l0cy5pbm5lckhUTUwgPSBzZWNvbmRzTGVmdC50b1N0cmluZygpO1xyXG4gICAgc3RvcmFnZV8xLnN0b3JhZ2Uuc2Vjb25kc0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aW1lTGVmdCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHNlY29uZHNMZWZ0LS07XHJcbiAgICAgICAgICAgIGRpZ2l0cy5pbm5lckhUTUwgPSBzZWNvbmRzTGVmdC50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHN0b3JhZ2VfMS5zdG9yYWdlLnNlY29uZHNJbnRlcnZhbClcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc3RvcmFnZV8xLnN0b3JhZ2Uuc2Vjb25kc0ludGVydmFsKTtcclxuICAgICAgICAgICAgKDAsIHNwcmludF8xLmVuZFNwcmludCkoKTtcclxuICAgICAgICB9XHJcbiAgICB9LCAxMDAwKTtcclxuICAgIHN0b3JhZ2VfMS5zdG9yYWdlLm1zSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRpbWVMZWZ0ID49IDApIHtcclxuICAgICAgICAgICAgY2xlYXIoKTtcclxuICAgICAgICAgICAgc2V0VHJhY2soKTtcclxuICAgICAgICAgICAgc2V0SW5kaWNhdG9yKCk7XHJcbiAgICAgICAgICAgIHRpbWVMZWZ0IC09IDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHN0b3JhZ2VfMS5zdG9yYWdlLm1zSW50ZXJ2YWwpXHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHN0b3JhZ2VfMS5zdG9yYWdlLm1zSW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICAgIGZ1bmN0aW9uIGNsZWFyKCkge1xyXG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGRpYW1ldGVyLCBkaWFtZXRlcik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXRUcmFjaygpIHtcclxuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyM0NzQ1NTQnO1xyXG4gICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gdHJhY2tXaWR0aDtcclxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGNvbnRleHQuYXJjKHJhZGl1cywgcmFkaXVzLCB0cmFjaywgMCwgTWF0aC5QSSAqIDIpO1xyXG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXRJbmRpY2F0b3IoKSB7XHJcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICcjNDc0NTU0JztcclxuICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGluZGljYXRvcldpZHRoO1xyXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY29udGV4dC5hcmMocmFkaXVzLCByYWRpdXMsIGNpcmNsZSwgTWF0aC5QSSAvIC0yLCAoKE1hdGguUEkgKiAyKSAvIHRpbWVMaW1pdCkgKiB0aW1lTGVmdCArIE1hdGguUEkgLyAtMiwgZmFsc2UpO1xyXG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy50aW1lciA9IHRpbWVyO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgbGlzdGVuZXJfMSA9IHJlcXVpcmUoXCIuL25hdmlnYXRpb24vbGlzdGVuZXJcIik7XHJcbmNvbnN0IHJvdXRlcl8xID0gcmVxdWlyZShcIi4vbmF2aWdhdGlvbi9yb3V0ZXJcIik7XHJcbigwLCBsaXN0ZW5lcl8xLmxpc3RlbmVyKSgpO1xyXG4oMCwgcm91dGVyXzEucm91dGVyKSgnc3ByaW50Jyk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==