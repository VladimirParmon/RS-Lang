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
const endGame_1 = __webpack_require__(/*! ../utils/endGame */ "./utils/endGame.ts");
function runAudioGame() {
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
            storage_1.storage.currentGameQueue.length === 0 ? (0, endGame_1.endGame)() : runAudioGame();
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
    if (storage_1.storage.currentGameQueue.length <= storage_1.storage.itemsPerGroup) {
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
            if (storage_1.storage.onlyOnePageTemplate[num] !== theWord &&
                !variants.includes(storage_1.storage.onlyOnePageTemplate[num])) {
                variants.push(storage_1.storage.onlyOnePageTemplate[num]);
            }
            else {
                i--;
            }
        }
        else {
            if (storage_1.storage.difficultyLevels[difficulty][num] !== theWord &&
                !variants.includes(storage_1.storage.difficultyLevels[difficulty][num])) {
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
exports.runSprint = void 0;
const misc_1 = __webpack_require__(/*! ../utils/misc */ "./utils/misc.ts");
const storage_1 = __webpack_require__(/*! ../utils/storage */ "./utils/storage.ts");
const getData_1 = __webpack_require__(/*! ./getData */ "./games/getData.ts");
const misc_2 = __webpack_require__(/*! ../utils/misc */ "./utils/misc.ts");
const endGame_1 = __webpack_require__(/*! ../utils/endGame */ "./utils/endGame.ts");
function runSprint() {
    const wordSpan = document.querySelector('#sprintWordSpan');
    const variantSpan = document.querySelector('#sprintVariantSpan');
    const sprintButtons = document.querySelector('#sprintButtons');
    const wrapper = document.querySelector('#wrapperSprint');
    wrapper.style.pointerEvents = 'all';
    wrapper.style.opacity = '1';
    sprintButtons.innerHTML = '';
    (0, getData_1.prepareData)();
    const coin = (0, misc_1.getRandomInt)(0, 1);
    if (wordSpan && variantSpan) {
        wordSpan.innerHTML = (0, misc_2.capitalize)(storage_1.storage.rightAnswer.word);
        variantSpan.innerHTML = coin === 1 ? (0, misc_2.capitalize)(storage_1.storage.rightAnswer.translate) : (0, misc_2.capitalize)(storage_1.storage.singleVariant.translate);
    }
    const buttonRight = document.createElement('button');
    buttonRight.id = 'sprintRight';
    buttonRight.textContent = 'Верно →';
    const buttonWrong = document.createElement('button');
    buttonWrong.id = 'sprintWrong';
    buttonWrong.textContent = '← Неверно';
    sprintButtons === null || sprintButtons === void 0 ? void 0 : sprintButtons.appendChild(buttonWrong);
    sprintButtons === null || sprintButtons === void 0 ? void 0 : sprintButtons.appendChild(buttonRight);
    storage_1.storage.abortController = new AbortController();
    buttonRight.addEventListener('click', () => {
        coin === 1 ? goNext(true) : goNext(false);
    }, {
        once: true,
        signal: storage_1.storage.abortController.signal
    });
    buttonWrong.addEventListener('click', () => {
        coin === 0 ? goNext(true) : goNext(false);
    }, {
        once: true,
        signal: storage_1.storage.abortController.signal
    });
    window.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowRight') {
            coin === 1 ? goNext(true) : goNext(false);
        }
        else if (e.code === 'ArrowLeft') {
            coin === 0 ? goNext(true) : goNext(false);
        }
    }, {
        once: true,
        signal: storage_1.storage.abortController.signal
    });
    if (storage_1.storage.currentGameQueue.length === 0) {
        (0, endGame_1.endGame)();
    }
    ;
}
exports.runSprint = runSprint;
function goNext(command) {
    var _a;
    const audioBite = new Audio;
    if (command) {
        audioBite.src = './assets/sounds/rightAnswer.mp3';
        storage_1.storage.endGameResults.right.push(storage_1.storage.rightAnswer);
    }
    else {
        audioBite.src = './assets/sounds/wrongAnswer.mp3';
        storage_1.storage.endGameResults.wrong.push(storage_1.storage.singleVariant);
    }
    audioBite.play();
    (_a = storage_1.storage.abortController) === null || _a === void 0 ? void 0 : _a.abort();
    runSprint();
}


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
        if (id === 'goBook' || id === 'learnWords')
            (0, router_1.router)('book');
        if (id === 'goHistory')
            (0, router_1.router)('history');
        if (id === 'goGames' || id === 'playGames')
            (0, router_1.router)('games');
        if (id === 'goStats' || id === 'yourStats')
            (0, router_1.router)('stats');
        if (id === 'goDev')
            window.open('https://rolling-scopes-school.github.io/vladimirparmon-JSFE2021Q3/CV/index.html', 'mywindow');
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
                // case 'sniper': router('sniper', 'onlyOnePageRequired');
                // break;
                case 'sprint':
                    (0, router_1.router)('sprint', 'onlyOnePageRequired');
                    break;
            }
        }
        if (id.split('-')[0] === 'playSound')
            (0, playSound_1.playSound)(id.split('-')[1]);
        if (id === 'repeatAudio') {
            const audioBite = new Audio;
            audioBite.src = `${api_1.filesUrl}/${storage_1.storage.rightAnswer.audio}`;
            audioBite.play();
        }
        if (id === 'login')
            (0, api_1.handleLogin)('login');
        if (id === 'send')
            (0, api_1.handleLogin)('send');
        if (id === 'passwordReveal')
            (0, rollMenu_1.passwordReveal)();
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
const misc_1 = __webpack_require__(/*! ../../utils/misc */ "./utils/misc.ts");
exports.audioChallengePage = {
    render: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, loader_1.showLoader)();
            storage_1.storage.onlyOnePage ? yield (0, getData_1.getSinglePageData)() : yield (0, getData_1.getData)();
        }
        catch (_a) {
            console.log('Network error');
        }
        finally {
            (0, loader_1.hideLoader)();
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
        storage_1.storage.currentGameMode = 'AudioGame';
        storage_1.storage.endGameResults.right = [];
        storage_1.storage.endGameResults.wrong = [];
        (0, misc_1.removeFooter)();
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
const misc_1 = __webpack_require__(/*! ../../utils/misc */ "./utils/misc.ts");
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
        (0, misc_1.addFooter)();
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

  `),
    afterRender: () => {
    }
};


/***/ }),

/***/ "./navigation/pages/devPage.ts":
/*!*************************************!*\
  !*** ./navigation/pages/devPage.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.devPage = void 0;
const misc_1 = __webpack_require__(/*! ../../utils/misc */ "./utils/misc.ts");
exports.devPage = {
    render: () => (`
    <h1>Hello Dev blyad</h1>
  `),
    afterRender: () => {
        (0, misc_1.addFooter)();
    }
};


/***/ }),

/***/ "./navigation/pages/gamesPage.ts":
/*!***************************************!*\
  !*** ./navigation/pages/gamesPage.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.gamesPage = void 0;
const misc_1 = __webpack_require__(/*! ../../utils/misc */ "./utils/misc.ts");
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
      <span>Sniper</span>
      <div id="goSniper"></div>
    </div>
    <div class="gameModeSelector">
      <span>Puzzle game</span>
      <div id="goPuzzle"></div>
    </div>
  </div>
  `),
    afterRender: () => {
        (0, misc_1.addFooter)();
    }
};


/***/ }),

/***/ "./navigation/pages/historyPage.ts":
/*!*****************************************!*\
  !*** ./navigation/pages/historyPage.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.historyPage = void 0;
const misc_1 = __webpack_require__(/*! ../../utils/misc */ "./utils/misc.ts");
exports.historyPage = {
    render: () => (`
    <h1>Hello History blyad</h1>
  `),
    afterRender: () => {
        (0, misc_1.addFooter)();
    }
};


/***/ }),

/***/ "./navigation/pages/homePage.ts":
/*!**************************************!*\
  !*** ./navigation/pages/homePage.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.homePage = void 0;
const misc_1 = __webpack_require__(/*! ../../utils/misc */ "./utils/misc.ts");
const slider_1 = __webpack_require__(/*! ../../utils/slider */ "./utils/slider.ts");
const storage_1 = __webpack_require__(/*! ../../utils/storage */ "./utils/storage.ts");
exports.homePage = {
    render: () => (`
  <div id="slider">
    <div id="wrapperAusweis">
      <div id="wrapperAusweisInner">
        <a href="#register" id="register">Еще не зарегистрированы?</a>
        <a href="#whatever" class="undoer">У меня уже есть аккаунт!</a>
        <div id="nameWrapper" class="inputWrapper">
          <input type="text" id="name" autocomplete="off" placeholder="Введите имя" required>
          <div class="validation">Имя обязательно</div>
        </div>
        <div class="inputWrapper">
          <input type="text" id="mail" placeholder="Введите адрес эл. почты" required>
          <div class="validation">Адрес должен быть валидным</div>
        </div>
        <div class="inputWrapper">
          <img id="passwordReveal" src="assets/svg/eye-hide.svg" alt="password reveal">
          <input type="password" id="password" placeholder="Введите пароль" required minlength="8">
          <div class="validation">Минимум 8 символов</div>
        </div>
        <button id="login">Войти</button>
        <button id="send">Зарегистрироваться</button>
      </div>
      <div id="returnFromAusweis"></div>
    </div>
    <div id="wrapperHomeAuth" ${storage_1.storage.isAuthorized ? 'style="display: flex"' : 'style="display: none"'}>
      <h1 id="greeting">Привет, ${storage_1.storage.userName}</h1>
      <div class="activitySelector">
        <div id="learnWords"></div>
        <span>Учить слова</span>
      </div>
        <div class="activitySelector">
        <div id="playGames"></div>
      <span>Играть в игры</span>
      </div>
      <div class="activitySelector">
        <div id="yourStats"></div>
        <span>Статистика</span>
      </div>
      <div class="activitySelector">
        <div id="aboutTheProject"></div>
        <span>о проекте</span>
      </div>
    </div>
    <div id="wrapperHome" ${storage_1.storage.isAuthorized ? 'style="display: none"' : 'style="display: flex"'}>
        <h1 id="logo"><span>R</span><span>S</span><span> Lang</span></h1>
      <div id="homeButtonsWrapper">
        <button id="homeToRegistration">Регистрация / Вход</button>
        <button id="homeToAboutPage">О проекте</button>
      </div>
    </div>
    <div id="wrapperAbout">
      <div id="returnFromAbout"></div>
      <div id="video">
        <div id="videoItself">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="YouTube video player" 
            frameborder="0" allow="accelerometer; autoplay; 
            clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
        <h2>Теперь учить английский язык легко и увлекательно!</h2>
        <span>
          Учите и запоминайте слова<br>
          Закрепляйте успех повторением, играя в мини-игры<br>
          Повторение каждый день для достижения потрясающего результата!
        </span>
      </div>
      <div id="additionalInfo">
        <h2><img icon2 src="assets/svg/book.svg" alt="book">Учебник</h2>
        <span>Более 3500 слов, разитых по сложности на разделы с удобной навигацией</span>
        <h2><img icon2 src="assets/svg/history.svg" alt="history">История</h2>
        <span>Раздел, содеражащий персональный словарь для повторения именно тех слов, которые являются проблемными
        и все слова, которые раньше встречались в играх</span>
        <h2><img icon2 src="assets/svg/gamepad.svg" alt="gamepad">Игры</h2>
        <span>4 увлекательных игры, которые помогут расширить вокабуляр, улучшить навыки правописания и восприятия  речи на слух</span>
        <h2><img icon2 src="assets/svg/chart.svg" alt="chart">Статистика</h2>
        <span>ПОка не сделано и хуй знает добурусь ли))000!001))адын</span>
      </div>
    </div>
  </div>
  `),
    afterRender: () => {
        (0, misc_1.addFooter)();
        (0, slider_1.slider)();
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
const misc_1 = __webpack_require__(/*! ../../utils/misc */ "./utils/misc.ts");
exports.sprintPage = {
    render: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, loader_1.showLoader)();
            storage_1.storage.onlyOnePage ? yield (0, getData_1.getSinglePageData)() : yield (0, getData_1.getData)();
        }
        catch (_a) {
            console.log('Network error');
        }
        finally {
            (0, loader_1.hideLoader)();
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
        if (storage_1.storage.secondsInterval)
            clearInterval(storage_1.storage.secondsInterval);
        if (storage_1.storage.msInterval)
            clearInterval(storage_1.storage.msInterval);
        storage_1.storage.currentGameMode = 'Sprint';
        storage_1.storage.endGameResults.right = [];
        storage_1.storage.endGameResults.wrong = [];
        (0, misc_1.removeFooter)();
        (0, timer_1.timer)();
        (0, sprint_1.runSprint)();
    }
};


/***/ }),

/***/ "./navigation/pages/statsPage.ts":
/*!***************************************!*\
  !*** ./navigation/pages/statsPage.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.statsPage = void 0;
const misc_1 = __webpack_require__(/*! ../../utils/misc */ "./utils/misc.ts");
exports.statsPage = {
    render: () => (`
    <h1>Hello Stats blyad</h1>
  `),
    afterRender: () => {
        (0, misc_1.addFooter)();
    }
};


/***/ }),

/***/ "./navigation/rollMenu.ts":
/*!********************************!*\
  !*** ./navigation/rollMenu.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.passwordReveal = exports.rollGamesSelector = exports.rollSectionSelector = exports.rollPageSelector = exports.rollMenu = void 0;
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
            GamesRU[GamesRU["\u0421\u043D\u0430\u0439\u043F\u0435\u0440"] = 2] = "\u0421\u043D\u0430\u0439\u043F\u0435\u0440";
            GamesRU[GamesRU["\u041F\u0430\u0437\u043B"] = 3] = "\u041F\u0430\u0437\u043B";
        })(GamesRU || (GamesRU = {}));
        let Games;
        (function (Games) {
            Games[Games["audio"] = 0] = "audio";
            Games[Games["sprint"] = 1] = "sprint";
            Games[Games["sniper"] = 2] = "sniper";
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
function passwordReveal() {
    const button = document.querySelector('#passwordReveal');
    const input = document.querySelector('#password');
    if (input.type === 'password') {
        input.type = 'text';
        button.src = 'assets/svg/eye-show.svg';
    }
    else {
        input.type = 'password';
        button.src = 'assets/svg/eye-hide.svg';
    }
}
exports.passwordReveal = passwordReveal;


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
exports.handleLogin = exports.register = exports.registerUser = exports.authorize = exports.getAllWords = exports.getWords = exports.filesUrl = void 0;
const router_1 = __webpack_require__(/*! ../navigation/router */ "./navigation/router.ts");
const slider_1 = __webpack_require__(/*! ./slider */ "./utils/slider.ts");
const storage_1 = __webpack_require__(/*! ./storage */ "./utils/storage.ts");
const baseURL = 'https://rs-lang-redblooded.herokuapp.com';
exports.filesUrl = 'https://raw.githubusercontent.com/vladimirparmon/react-rslang-be/master';
const words = `${baseURL}/words`;
const users = `${baseURL}/users`;
const signIn = `${baseURL}/signin`;
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
//======================================================================//
const loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield fetch(signIn, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        else {
            response.text().then(text => {
                if (text.slice(0, 1) === 'C') {
                    console.log(`Неверное имя пользователя`);
                }
                else {
                    console.log('Неверный пароль');
                }
            });
        }
    })
        .catch(error => {
        console.log('Нет соединения с интернетом или сервер не отвечает');
    });
    return info;
});
function authorize(mail, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let info;
        try {
            info = yield loginUser({ "email": mail, "password": password });
        }
        finally {
            if (info) {
                storage_1.storage.isAuthorized = true;
                storage_1.storage.userId = info.userId;
                storage_1.storage.token = info.token;
                storage_1.storage.userName = info.name;
                const greeting = document.querySelector('#greeting');
                greeting.innerHTML = `Привет, ${storage_1.storage.userName}`;
                const logoutButton = document.querySelector('#auth');
                logoutButton.style.backgroundImage = 'url(../assets/svg/logout.svg)';
                logoutButton.addEventListener('click', () => {
                    storage_1.storage.isAuthorized = false;
                    logoutButton.style.backgroundImage = 'url(../assets/svg/person.svg)';
                    (0, router_1.router)('home');
                }, {
                    once: true
                });
                (0, slider_1.slider)('command');
            }
        }
    });
}
exports.authorize = authorize;
function registerUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const info = yield fetch(users, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
            if (response.ok) {
                return response.json();
            }
            else if (response.status === 417) {
                console.log('Пользователь с таким адресом эл. почты уже существует');
            }
            else {
                response.text().then(text => {
                    if (text.search(/mail/) !== -1) {
                        console.log('mail is huinya');
                    }
                    if (text.search(/name/) !== -1) {
                        console.log('name is huinya');
                    }
                    if (text.search(/password/) !== -1) {
                        console.log('password is huinya');
                    }
                });
            }
        })
            .catch(error => {
            console.log('Нет соединения с интернетом или сервер не отвечает');
        });
        return info;
    });
}
exports.registerUser = registerUser;
function register(name, mail, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let info;
        try {
            info = yield registerUser({ "name": name, "email": mail, "password": password });
        }
        finally {
            if (info) {
                authorize(mail, password);
            }
        }
    });
}
exports.register = register;
//createUser({ "email": "hello@user.com", "password": "Gfhjkm_123" });
const deleteUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const rawResponse = yield fetch(`https://rs-lang-redblooded.herokuapp.com/users/${storage_1.storage.userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${storage_1.storage.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
});
function handleLogin(action) {
    const nameInput = document.querySelector('#name');
    const mailInput = document.querySelector('#mail');
    const passwordInput = document.querySelector('#password');
    const name = nameInput.value;
    const mail = mailInput.value;
    const password = passwordInput.value;
    if (action === 'login') {
        authorize(mail, password);
    }
    else {
        register(name, mail, password);
    }
}
exports.handleLogin = handleLogin;


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
        storage_1.storage.endGameResults.right.push(storage_1.storage.rightAnswer);
        audioBite.src = './assets/sounds/rightAnswer.mp3';
        buttonPressed.style.backgroundColor = 'var(--trio3)';
    }
    else {
        storage_1.storage.endGameResults.wrong.push(storage_1.storage.rightAnswer);
        audioBite.src = './assets/sounds/wrongAnswer.mp3';
        buttonPressed.style.backgroundColor = 'var(--wrong)';
    }
    audioBite.play();
    if (id)
        (0, audioChallenge_1.runAudioAnimation)(id);
}
exports.checkChoice = checkChoice;


/***/ }),

/***/ "./utils/endGame.ts":
/*!**************************!*\
  !*** ./utils/endGame.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.endGame = void 0;
const storage_1 = __webpack_require__(/*! ./storage */ "./utils/storage.ts");
const getData_1 = __webpack_require__(/*! ../games/getData */ "./games/getData.ts");
const timer_1 = __webpack_require__(/*! ./timer */ "./utils/timer.ts");
const sprint_1 = __webpack_require__(/*! ../games/sprint */ "./games/sprint.ts");
const audioChallenge_1 = __webpack_require__(/*! ../games/audioChallenge */ "./games/audioChallenge.ts");
function endGame() {
    var _a;
    const root = document.querySelector('.wrapperGames');
    if (root) {
        const soundBite = new Audio;
        soundBite.src = 'assets/sounds/roundEnded.mp3';
        soundBite.play();
        if (storage_1.storage.onlyOnePage) {
            (0, getData_1.getSinglePageData)();
            if (storage_1.storage.secondsInterval)
                clearInterval(storage_1.storage.secondsInterval);
            if (storage_1.storage.msInterval)
                clearInterval(storage_1.storage.msInterval);
        }
        ;
        const resultsWrapper = document.createElement('div');
        resultsWrapper.id = 'resultsWrapper';
        (_a = storage_1.storage.abortController) === null || _a === void 0 ? void 0 : _a.abort();
        const theId = `#wrapper${storage_1.storage.currentGameMode}`;
        const wrapper = document.querySelector(theId);
        wrapper.style.pointerEvents = 'none';
        wrapper.style.opacity = '0.5';
        const results = document.createElement('div');
        results.id = 'results';
        const rightOnes = document.createElement('div');
        const wrongOnes = document.createElement('div');
        const spanR = document.createElement('h2');
        const spanW = document.createElement('h2');
        spanR.textContent = 'Правильные ответы:';
        spanW.textContent = 'Неправильные ответы:';
        rightOnes.appendChild(spanR);
        wrongOnes.appendChild(spanW);
        if (storage_1.storage.endGameResults.right.length !== 0) {
            storage_1.storage.endGameResults.right.forEach((el) => {
                const option = `
        <div class="resultsOption">
          <img src="assets/svg/sound.svg" alt="audio" id="playSound-${el.audio}">
          <span><b>${el.word}</b> – ${el.translate}</span>
        </div>
        `;
                rightOnes.innerHTML += option;
            });
        }
        else {
            rightOnes.innerHTML += 'Нет правильных ответов :(';
        }
        if (storage_1.storage.endGameResults.wrong.length !== 0) {
            storage_1.storage.endGameResults.wrong.forEach((el) => {
                const option = `
        <div class="resultsOption">
          <img src="assets/svg/sound.svg" alt="audio" id="playSound-${el.audio}">
          <span><b>${el.word}</b> – ${el.translate}</span>
        </div>
        `;
                wrongOnes.innerHTML += option;
            });
        }
        else {
            wrongOnes.innerHTML += 'Нет неправильных ответов!';
        }
        results === null || results === void 0 ? void 0 : results.appendChild(rightOnes);
        results === null || results === void 0 ? void 0 : results.appendChild(wrongOnes);
        const playAgain = document.createElement('button');
        playAgain.id = 'resultsPlayAgain';
        playAgain.textContent = 'Играть снова';
        playAgain.addEventListener('click', () => {
            root === null || root === void 0 ? void 0 : root.removeChild(resultsWrapper);
            wrapper.style.opacity = '1';
            wrapper.style.pointerEvents = 'all';
            storage_1.storage.endGameResults.right = [];
            storage_1.storage.endGameResults.wrong = [];
            storage_1.storage.onlyOnePage ? (0, getData_1.getSinglePageData)() : (0, getData_1.getData)();
            switch (storage_1.storage.currentGameMode) {
                case 'AudioGame':
                    (0, audioChallenge_1.runAudioGame)();
                    break;
                case 'Sprint':
                    {
                        (0, timer_1.timer)();
                        (0, sprint_1.runSprint)();
                    }
                    break;
                // case 'Puzzle': runPuzzle();
                // break;
                // case 'Sniper': runSniper();
                // break;
            }
        }, {
            once: true
        });
        resultsWrapper.appendChild(results);
        resultsWrapper.appendChild(playAgain);
        root === null || root === void 0 ? void 0 : root.appendChild(resultsWrapper);
    }
}
exports.endGame = endGame;


/***/ }),

/***/ "./utils/loader.ts":
/*!*************************!*\
  !*** ./utils/loader.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hideLoader = exports.showLoader = void 0;
function showLoader() {
    const root = document.querySelector('body');
    const loader = document.createElement('div');
    loader.classList.add('loader');
    root === null || root === void 0 ? void 0 : root.appendChild(loader);
}
exports.showLoader = showLoader;
function hideLoader() {
    const root = document.querySelector('body');
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
exports.removeFooter = exports.addFooter = exports.checkFor = exports.shuffle = exports.capitalize = exports.getRandomInt = void 0;
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
function addFooter() {
    const root = document.querySelector('body');
    const existingFooter = document.querySelector('footer');
    if (!existingFooter && root) {
        const footer = document.createElement('footer');
        footer.innerHTML = `
      <span onclick="window.open('https://ru.wikipedia.org/wiki/2022_%D0%B3%D0%BE%D0%B4','mywindow')">2022</span> 
      <span onclick="window.open('https://github.com/VladimirParmon','mywindow')">Vladimir Parmon</span>
      <img onclick="window.open('https://rs.school/js/','mywindow')" src="assets/svg/rs_school_js.svg" alt="rsSchool">
    `;
        root.appendChild(footer);
    }
}
exports.addFooter = addFooter;
function removeFooter() {
    const root = document.querySelector('body');
    const footer = document.querySelector('footer');
    if (root && footer)
        root.removeChild(footer);
}
exports.removeFooter = removeFooter;


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

/***/ "./utils/slider.ts":
/*!*************************!*\
  !*** ./utils/slider.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.slider = void 0;
const storage_1 = __webpack_require__(/*! ./storage */ "./utils/storage.ts");
function slider(command) {
    const wrapper = document.querySelector('#slider');
    const registrationPage = document.querySelector('#wrapperAusweis');
    const centralPage = document.querySelector('#wrapperHome');
    const altCentralPage = document.querySelector('#wrapperHomeAuth');
    const registrationButton = document.querySelector('#homeToRegistration');
    const aboutButton = document.querySelector('#homeToAboutPage');
    const altAboutButton = document.querySelector('#aboutTheProject');
    const returnFromAusweis = document.querySelector('#returnFromAusweis');
    const returnFromAbout = document.querySelector('#returnFromAbout');
    function goSlideOne() {
        wrapper.style.transform = 'translateY(0%)';
        setTimeout(() => {
            returnFromAusweis.style.opacity = '1';
        }, 1500);
        storage_1.storage.currentMainSlide = 0;
    }
    function goSlideTwo() {
        const currentHeight = registrationPage.offsetHeight;
        wrapper.style.transform = `translateY(-${currentHeight}px)`;
        returnFromAusweis.style.opacity = '0';
        returnFromAbout.style.opacity = '0';
        storage_1.storage.currentMainSlide = 1;
    }
    function goSlideThree() {
        const currentHeight = registrationPage.offsetHeight;
        wrapper.style.transform = `translateY(-${currentHeight * 2}px)`;
        setTimeout(() => {
            returnFromAbout.style.opacity = '1';
        }, 1500);
        storage_1.storage.currentMainSlide = 2;
    }
    if (!command) {
        registrationButton === null || registrationButton === void 0 ? void 0 : registrationButton.addEventListener('click', goSlideOne);
        aboutButton === null || aboutButton === void 0 ? void 0 : aboutButton.addEventListener('click', goSlideThree);
        altAboutButton === null || altAboutButton === void 0 ? void 0 : altAboutButton.addEventListener('click', goSlideThree);
        returnFromAusweis === null || returnFromAusweis === void 0 ? void 0 : returnFromAusweis.addEventListener('click', goSlideTwo);
        returnFromAbout.addEventListener('click', goSlideTwo);
    }
    else {
        centralPage.style.display = 'none';
        altCentralPage.style.display = 'flex';
        goSlideTwo();
    }
}
exports.slider = slider;


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
};


/***/ }),

/***/ "./utils/timer.ts":
/*!************************!*\
  !*** ./utils/timer.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.timer = void 0;
const endGame_1 = __webpack_require__(/*! ../utils/endGame */ "./utils/endGame.ts");
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
            (0, endGame_1.endGame)();
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
const storage_1 = __webpack_require__(/*! ./utils/storage */ "./utils/storage.ts");
(0, listener_1.listener)();
(0, router_1.router)('home');
let resizeTimer;
window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
    const slider = document.querySelector('#slider');
    if (slider) {
        const registrationPage = document.querySelector('#wrapperAusweis');
        const currentHeight = registrationPage.offsetHeight;
        let howFar = 0;
        switch (storage_1.storage.currentMainSlide) {
            case 1:
                howFar = -currentHeight;
                break;
            case 2:
                howFar = -currentHeight * 2;
                break;
        }
        slider.style.transform = `translateY(${howFar}px)`;
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLE9BQU87QUFDdEQ7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnMtbGFuZy8uL2dhbWVzL2F1ZGlvQ2hhbGxlbmdlLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi9nYW1lcy9nZXREYXRhLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi9nYW1lcy9zcHJpbnQudHMiLCJ3ZWJwYWNrOi8vcnMtbGFuZy8uL25hdmlnYXRpb24vbGlzdGVuZXIudHMiLCJ3ZWJwYWNrOi8vcnMtbGFuZy8uL25hdmlnYXRpb24vcGFnZXMvYXVkaW9DaGFsbGVuZ2VQYWdlLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi9uYXZpZ2F0aW9uL3BhZ2VzL2Jvb2tQYWdlLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi9uYXZpZ2F0aW9uL3BhZ2VzL2NvbW1lbnRzUGFnZS50cyIsIndlYnBhY2s6Ly9ycy1sYW5nLy4vbmF2aWdhdGlvbi9wYWdlcy9kZXZQYWdlLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi9uYXZpZ2F0aW9uL3BhZ2VzL2dhbWVzUGFnZS50cyIsIndlYnBhY2s6Ly9ycy1sYW5nLy4vbmF2aWdhdGlvbi9wYWdlcy9oaXN0b3J5UGFnZS50cyIsIndlYnBhY2s6Ly9ycy1sYW5nLy4vbmF2aWdhdGlvbi9wYWdlcy9ob21lUGFnZS50cyIsIndlYnBhY2s6Ly9ycy1sYW5nLy4vbmF2aWdhdGlvbi9wYWdlcy9zcHJpbnRQYWdlLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi9uYXZpZ2F0aW9uL3BhZ2VzL3N0YXRzUGFnZS50cyIsIndlYnBhY2s6Ly9ycy1sYW5nLy4vbmF2aWdhdGlvbi9yb2xsTWVudS50cyIsIndlYnBhY2s6Ly9ycy1sYW5nLy4vbmF2aWdhdGlvbi9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vcnMtbGFuZy8uL3V0aWxzL2FwaS50cyIsIndlYnBhY2s6Ly9ycy1sYW5nLy4vdXRpbHMvY2hlY2tzLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi91dGlscy9lbmRHYW1lLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi91dGlscy9sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vcnMtbGFuZy8uL3V0aWxzL21pc2MudHMiLCJ3ZWJwYWNrOi8vcnMtbGFuZy8uL3V0aWxzL3BsYXlTb3VuZC50cyIsIndlYnBhY2s6Ly9ycy1sYW5nLy4vdXRpbHMvc2xpZGVyLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi91dGlscy9zdG9yYWdlLnRzIiwid2VicGFjazovL3JzLWxhbmcvLi91dGlscy90aW1lci50cyIsIndlYnBhY2s6Ly9ycy1sYW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JzLWxhbmcvLi9tYXN0ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5ydW5BdWRpb0FuaW1hdGlvbiA9IGV4cG9ydHMucnVuQXVkaW9HYW1lID0gdm9pZCAwO1xyXG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9hcGlcIik7XHJcbmNvbnN0IHN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9zdG9yYWdlXCIpO1xyXG5jb25zdCBtaXNjXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvbWlzY1wiKTtcclxuY29uc3QgY2hlY2tzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvY2hlY2tzXCIpO1xyXG5jb25zdCBnZXREYXRhXzEgPSByZXF1aXJlKFwiLi9nZXREYXRhXCIpO1xyXG5jb25zdCBtaXNjXzIgPSByZXF1aXJlKFwiLi4vdXRpbHMvbWlzY1wiKTtcclxuY29uc3QgZW5kR2FtZV8xID0gcmVxdWlyZShcIi4uL3V0aWxzL2VuZEdhbWVcIik7XHJcbmZ1bmN0aW9uIHJ1bkF1ZGlvR2FtZSgpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG1pc2NfMi5jaGVja0Zvcik7XHJcbiAgICAoMCwgZ2V0RGF0YV8xLnByZXBhcmVEYXRhKSgpO1xyXG4gICAgbGV0IGludGVybWVkaWF0ZUFycmF5ID0gW107XHJcbiAgICBzdG9yYWdlXzEuc3RvcmFnZS53b3JraW5nQXJyYXkuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICBpbnRlcm1lZGlhdGVBcnJheS5wdXNoKGVsLmlkKTtcclxuICAgICAgICBjb25zdCBvcHRpb25zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2F1ZGlvR2FtZU9wdGlvbnNgKTtcclxuICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb25zdCBrZXlJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAga2V5SWNvbi5zdHlsZS53aWR0aCA9ICczMHB4JztcclxuICAgICAgICBrZXlJY29uLnN0eWxlLmhlaWdodCA9ICczMHB4JztcclxuICAgICAgICBrZXlJY29uLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzEwcHgnO1xyXG4gICAgICAgIGtleUljb24uc3JjID0gYGFzc2V0cy9zdmcvd2hpdGUvJHtpICsgMX13LnN2Z2A7XHJcbiAgICAgICAgb3B0aW9uLmFwcGVuZENoaWxkKGtleUljb24pO1xyXG4gICAgICAgIG9wdGlvbi5pZCA9IGBhdWRpb0dhbWVPcHRpb24tJHtlbC5pZH1gO1xyXG4gICAgICAgIG9wdGlvbi5pbm5lckhUTUwgKz0gKDAsIG1pc2NfMS5jYXBpdGFsaXplKShlbC50cmFuc2xhdGUpO1xyXG4gICAgICAgIG9wdGlvbiA9PT0gbnVsbCB8fCBvcHRpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgKDAsIGNoZWNrc18xLmNoZWNrQ2hvaWNlKShlbC5pZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgb3B0aW9uc0NvbnRhaW5lciA9PT0gbnVsbCB8fCBvcHRpb25zQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zQ29udGFpbmVyLmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICB9KTtcclxuICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmN1cnJlbnRPcHRpb25zID0gaW50ZXJtZWRpYXRlQXJyYXk7XHJcbiAgICBjb25zdCBhdWRpb0JpdGUgPSBuZXcgQXVkaW87XHJcbiAgICBhdWRpb0JpdGUuc3JjID0gYCR7YXBpXzEuZmlsZXNVcmx9LyR7c3RvcmFnZV8xLnN0b3JhZ2UucmlnaHRBbnN3ZXIuYXVkaW99YDtcclxuICAgIGF1ZGlvQml0ZS5wbGF5KCk7XHJcbn1cclxuZXhwb3J0cy5ydW5BdWRpb0dhbWUgPSBydW5BdWRpb0dhbWU7XHJcbmZ1bmN0aW9uIHJ1bkF1ZGlvQW5pbWF0aW9uKGlkKSB7XHJcbiAgICBjb25zdCBidXR0b25zRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2F1ZGlvR2FtZU9wdGlvbnMnKTtcclxuICAgIGNvbnN0IGJ1dHRvblByZXNzZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYXVkaW9HYW1lT3B0aW9uLSR7aWR9YCk7XHJcbiAgICBjb25zdCByb3VuZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXBlYXRBdWRpbycpO1xyXG4gICAgY29uc3Qgcm91bmRCdXR0b25JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JlcGVhdEF1ZGlvSWNvbicpO1xyXG4gICAgYnV0dG9uc0Rpdi5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xyXG4gICAgYnV0dG9uUHJlc3NlZC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMS4wNyknO1xyXG4gICAgY29uc3QgbmV4dFF1ZXN0aW9uQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBuZXh0UXVlc3Rpb25CdXR0b24uaWQgPSAnbmV4dEF1ZGlvUXVlc3Rpb24nO1xyXG4gICAgbmV4dFF1ZXN0aW9uQnV0dG9uLmlubmVySFRNTCA9ICdbc3BhY2VdIOKGkic7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBidXR0b25zRGl2LnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgcm91bmRCdXR0b25JY29uLnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJvdW5kQnV0dG9uLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHthcGlfMS5maWxlc1VybH0vJHtzdG9yYWdlXzEuc3RvcmFnZS5yaWdodEFuc3dlci5pbWFnZX0pYDtcclxuICAgICAgICAgICAgcm91bmRCdXR0b24uc3R5bGUud2lkdGggPSAnNTAwcHgnO1xyXG4gICAgICAgICAgICByb3VuZEJ1dHRvbi5zdHlsZS5oZWlnaHQgPSAnMzAwcHgnO1xyXG4gICAgICAgICAgICByb3VuZEJ1dHRvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMCc7XHJcbiAgICAgICAgICAgIGJ1dHRvbnNEaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxkaXY+JHtzdG9yYWdlXzEuc3RvcmFnZS5yaWdodEFuc3dlci53b3JkfTwvZGl2PlxyXG4gICAgICAgIDxkaXY+JHtzdG9yYWdlXzEuc3RvcmFnZS5yaWdodEFuc3dlci50cmFuc2NyaXB0aW9ufTwvZGl2PlxyXG4gICAgICAgIDxkaXY+JHtzdG9yYWdlXzEuc3RvcmFnZS5yaWdodEFuc3dlci50cmFuc2xhdGV9PC9kaXY+XHJcbiAgICAgIGA7XHJcbiAgICAgICAgICAgIGJ1dHRvbnNEaXYuYXBwZW5kQ2hpbGQobmV4dFF1ZXN0aW9uQnV0dG9uKTtcclxuICAgICAgICAgICAgbmV4dFF1ZXN0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tlZCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHByZXNzZWQpO1xyXG4gICAgICAgICAgICBidXR0b25zRGl2LnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgIGJ1dHRvbnNEaXYuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhbGwnO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9LCA2MDApO1xyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ly9cclxuICAgIGZ1bmN0aW9uIGNsaWNrZWQoKSB7XHJcbiAgICAgICAgbmV4dFF1ZXN0aW9uQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tlZCk7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgcHJlc3NlZCk7XHJcbiAgICAgICAgZ29OZXh0KCk7XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBmdW5jdGlvbiBwcmVzc2VkKGUpIHtcclxuICAgICAgICBpZiAoZS5jb2RlID09PSAnU3BhY2UnKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHByZXNzZWQpO1xyXG4gICAgICAgICAgICBnb05leHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBmdW5jdGlvbiBnb05leHQoKSB7XHJcbiAgICAgICAgYnV0dG9uc0Rpdi5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgICAgIHJvdW5kQnV0dG9uLnN0eWxlLndpZHRoID0gJzE0MHB4JztcclxuICAgICAgICByb3VuZEJ1dHRvbi5zdHlsZS5oZWlnaHQgPSAnMTQwcHgnO1xyXG4gICAgICAgIHJvdW5kQnV0dG9uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1MCUnO1xyXG4gICAgICAgIHJvdW5kQnV0dG9uLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICdub25lJztcclxuICAgICAgICByb3VuZEJ1dHRvbkljb24uc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgYnV0dG9uc0Rpdi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICBidXR0b25zRGl2LmlubmVySFRNTCA9IGBgO1xyXG4gICAgICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5jdXJyZW50R2FtZVF1ZXVlLmxlbmd0aCA9PT0gMCA/ICgwLCBlbmRHYW1lXzEuZW5kR2FtZSkoKSA6IHJ1bkF1ZGlvR2FtZSgpO1xyXG4gICAgICAgIH0sIDYwMCk7XHJcbiAgICB9XHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0vL1xyXG59XHJcbmV4cG9ydHMucnVuQXVkaW9BbmltYXRpb24gPSBydW5BdWRpb0FuaW1hdGlvbjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmdldFNpbmdsZVBhZ2VEYXRhID0gZXhwb3J0cy5wcmVwYXJlRGF0YSA9IGV4cG9ydHMuZ2V0RGF0YSA9IHZvaWQgMDtcclxuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvYXBpXCIpO1xyXG5jb25zdCBtaXNjXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvbWlzY1wiKTtcclxuY29uc3Qgc3RvcmFnZV8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3N0b3JhZ2VcIik7XHJcbmNvbnN0IGdldERhdGEgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIGNvbnN0IGRpZmZpY3VsdHkgPSBzdG9yYWdlXzEuc3RvcmFnZS5jdXJyZW50RGlmZmljdWx0eTtcclxuICAgIGxldCBpbmZvO1xyXG4gICAgaWYgKE9iamVjdC5rZXlzKHN0b3JhZ2VfMS5zdG9yYWdlLmRpZmZpY3VsdHlMZXZlbHMpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGluZm8gPSB5aWVsZCAoMCwgYXBpXzEuZ2V0QWxsV29yZHMpKGRpZmZpY3VsdHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgaWYgKGluZm8pXHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5kaWZmaWN1bHR5TGV2ZWxzW2RpZmZpY3VsdHldID0gKDAsIG1pc2NfMS5zaHVmZmxlKShpbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc3RvcmFnZV8xLnN0b3JhZ2UuY3VycmVudEdhbWVRdWV1ZS5sZW5ndGggPD0gc3RvcmFnZV8xLnN0b3JhZ2UuaXRlbXNQZXJHcm91cCkge1xyXG4gICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmN1cnJlbnRHYW1lUXVldWUgPSBbLi4uKDAsIG1pc2NfMS5zaHVmZmxlKShzdG9yYWdlXzEuc3RvcmFnZS5kaWZmaWN1bHR5TGV2ZWxzW2RpZmZpY3VsdHldKV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufSk7XHJcbmV4cG9ydHMuZ2V0RGF0YSA9IGdldERhdGE7XHJcbmNvbnN0IHByZXBhcmVEYXRhID0gKCkgPT4ge1xyXG4gICAgY29uc3QgaG93TWFueVZhcmlhbnRzID0gNDtcclxuICAgIGNvbnN0IGRpZmZpY3VsdHkgPSBzdG9yYWdlXzEuc3RvcmFnZS5jdXJyZW50RGlmZmljdWx0eTtcclxuICAgIGNvbnN0IHRoZVdvcmQgPSBzdG9yYWdlXzEuc3RvcmFnZS5jdXJyZW50R2FtZVF1ZXVlLnBvcCgpO1xyXG4gICAgbGV0IHZhcmlhbnRzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvd01hbnlWYXJpYW50czsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgbnVtID0gKDAsIG1pc2NfMS5nZXRSYW5kb21JbnQpKDAsIHN0b3JhZ2VfMS5zdG9yYWdlLml0ZW1zUGVyR3JvdXAgLSAxKTtcclxuICAgICAgICBpZiAoc3RvcmFnZV8xLnN0b3JhZ2Uub25seU9uZVBhZ2UpIHtcclxuICAgICAgICAgICAgaWYgKHN0b3JhZ2VfMS5zdG9yYWdlLm9ubHlPbmVQYWdlVGVtcGxhdGVbbnVtXSAhPT0gdGhlV29yZCAmJlxyXG4gICAgICAgICAgICAgICAgIXZhcmlhbnRzLmluY2x1ZGVzKHN0b3JhZ2VfMS5zdG9yYWdlLm9ubHlPbmVQYWdlVGVtcGxhdGVbbnVtXSkpIHtcclxuICAgICAgICAgICAgICAgIHZhcmlhbnRzLnB1c2goc3RvcmFnZV8xLnN0b3JhZ2Uub25seU9uZVBhZ2VUZW1wbGF0ZVtudW1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHN0b3JhZ2VfMS5zdG9yYWdlLmRpZmZpY3VsdHlMZXZlbHNbZGlmZmljdWx0eV1bbnVtXSAhPT0gdGhlV29yZCAmJlxyXG4gICAgICAgICAgICAgICAgIXZhcmlhbnRzLmluY2x1ZGVzKHN0b3JhZ2VfMS5zdG9yYWdlLmRpZmZpY3VsdHlMZXZlbHNbZGlmZmljdWx0eV1bbnVtXSkpIHtcclxuICAgICAgICAgICAgICAgIHZhcmlhbnRzLnB1c2goc3RvcmFnZV8xLnN0b3JhZ2UuZGlmZmljdWx0eUxldmVsc1tkaWZmaWN1bHR5XVtudW1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGVXb3JkKSB7XHJcbiAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UucmlnaHRBbnN3ZXIgPSB0aGVXb3JkO1xyXG4gICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLnNpbmdsZVZhcmlhbnQgPSB2YXJpYW50c1swXTtcclxuICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS53b3JraW5nQXJyYXkgPSAoMCwgbWlzY18xLnNodWZmbGUpKFt0aGVXb3JkLCAuLi52YXJpYW50c10pO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLnByZXBhcmVEYXRhID0gcHJlcGFyZURhdGE7XHJcbmNvbnN0IGdldFNpbmdsZVBhZ2VEYXRhID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBjb25zdCBkaWZmaWN1bHR5ID0gc3RvcmFnZV8xLnN0b3JhZ2UuYm9va0dyb3VwO1xyXG4gICAgbGV0IGluZm87XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGluZm8gPSB5aWVsZCAoMCwgYXBpXzEuZ2V0QWxsV29yZHMpKGRpZmZpY3VsdHksICdzaW5nbGUnKTtcclxuICAgIH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIGlmIChpbmZvKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLm9ubHlPbmVQYWdlVGVtcGxhdGUgPSBpbmZvO1xyXG4gICAgICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5jdXJyZW50R2FtZVF1ZXVlID0gWy4uLigwLCBtaXNjXzEuc2h1ZmZsZSkoaW5mbyldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59KTtcclxuZXhwb3J0cy5nZXRTaW5nbGVQYWdlRGF0YSA9IGdldFNpbmdsZVBhZ2VEYXRhO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnJ1blNwcmludCA9IHZvaWQgMDtcclxuY29uc3QgbWlzY18xID0gcmVxdWlyZShcIi4uL3V0aWxzL21pc2NcIik7XHJcbmNvbnN0IHN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9zdG9yYWdlXCIpO1xyXG5jb25zdCBnZXREYXRhXzEgPSByZXF1aXJlKFwiLi9nZXREYXRhXCIpO1xyXG5jb25zdCBtaXNjXzIgPSByZXF1aXJlKFwiLi4vdXRpbHMvbWlzY1wiKTtcclxuY29uc3QgZW5kR2FtZV8xID0gcmVxdWlyZShcIi4uL3V0aWxzL2VuZEdhbWVcIik7XHJcbmZ1bmN0aW9uIHJ1blNwcmludCgpIHtcclxuICAgIGNvbnN0IHdvcmRTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NwcmludFdvcmRTcGFuJyk7XHJcbiAgICBjb25zdCB2YXJpYW50U3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzcHJpbnRWYXJpYW50U3BhbicpO1xyXG4gICAgY29uc3Qgc3ByaW50QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzcHJpbnRCdXR0b25zJyk7XHJcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dyYXBwZXJTcHJpbnQnKTtcclxuICAgIHdyYXBwZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhbGwnO1xyXG4gICAgd3JhcHBlci5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgc3ByaW50QnV0dG9ucy5pbm5lckhUTUwgPSAnJztcclxuICAgICgwLCBnZXREYXRhXzEucHJlcGFyZURhdGEpKCk7XHJcbiAgICBjb25zdCBjb2luID0gKDAsIG1pc2NfMS5nZXRSYW5kb21JbnQpKDAsIDEpO1xyXG4gICAgaWYgKHdvcmRTcGFuICYmIHZhcmlhbnRTcGFuKSB7XHJcbiAgICAgICAgd29yZFNwYW4uaW5uZXJIVE1MID0gKDAsIG1pc2NfMi5jYXBpdGFsaXplKShzdG9yYWdlXzEuc3RvcmFnZS5yaWdodEFuc3dlci53b3JkKTtcclxuICAgICAgICB2YXJpYW50U3Bhbi5pbm5lckhUTUwgPSBjb2luID09PSAxID8gKDAsIG1pc2NfMi5jYXBpdGFsaXplKShzdG9yYWdlXzEuc3RvcmFnZS5yaWdodEFuc3dlci50cmFuc2xhdGUpIDogKDAsIG1pc2NfMi5jYXBpdGFsaXplKShzdG9yYWdlXzEuc3RvcmFnZS5zaW5nbGVWYXJpYW50LnRyYW5zbGF0ZSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBidXR0b25SaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgYnV0dG9uUmlnaHQuaWQgPSAnc3ByaW50UmlnaHQnO1xyXG4gICAgYnV0dG9uUmlnaHQudGV4dENvbnRlbnQgPSAn0JLQtdGA0L3QviDihpInO1xyXG4gICAgY29uc3QgYnV0dG9uV3JvbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGJ1dHRvbldyb25nLmlkID0gJ3NwcmludFdyb25nJztcclxuICAgIGJ1dHRvbldyb25nLnRleHRDb250ZW50ID0gJ+KGkCDQndC10LLQtdGA0L3Qvic7XHJcbiAgICBzcHJpbnRCdXR0b25zID09PSBudWxsIHx8IHNwcmludEJ1dHRvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNwcmludEJ1dHRvbnMuYXBwZW5kQ2hpbGQoYnV0dG9uV3JvbmcpO1xyXG4gICAgc3ByaW50QnV0dG9ucyA9PT0gbnVsbCB8fCBzcHJpbnRCdXR0b25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzcHJpbnRCdXR0b25zLmFwcGVuZENoaWxkKGJ1dHRvblJpZ2h0KTtcclxuICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgIGJ1dHRvblJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNvaW4gPT09IDEgPyBnb05leHQodHJ1ZSkgOiBnb05leHQoZmFsc2UpO1xyXG4gICAgfSwge1xyXG4gICAgICAgIG9uY2U6IHRydWUsXHJcbiAgICAgICAgc2lnbmFsOiBzdG9yYWdlXzEuc3RvcmFnZS5hYm9ydENvbnRyb2xsZXIuc2lnbmFsXHJcbiAgICB9KTtcclxuICAgIGJ1dHRvbldyb25nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNvaW4gPT09IDAgPyBnb05leHQodHJ1ZSkgOiBnb05leHQoZmFsc2UpO1xyXG4gICAgfSwge1xyXG4gICAgICAgIG9uY2U6IHRydWUsXHJcbiAgICAgICAgc2lnbmFsOiBzdG9yYWdlXzEuc3RvcmFnZS5hYm9ydENvbnRyb2xsZXIuc2lnbmFsXHJcbiAgICB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0Fycm93UmlnaHQnKSB7XHJcbiAgICAgICAgICAgIGNvaW4gPT09IDEgPyBnb05leHQodHJ1ZSkgOiBnb05leHQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlLmNvZGUgPT09ICdBcnJvd0xlZnQnKSB7XHJcbiAgICAgICAgICAgIGNvaW4gPT09IDAgPyBnb05leHQodHJ1ZSkgOiBnb05leHQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgICBvbmNlOiB0cnVlLFxyXG4gICAgICAgIHNpZ25hbDogc3RvcmFnZV8xLnN0b3JhZ2UuYWJvcnRDb250cm9sbGVyLnNpZ25hbFxyXG4gICAgfSk7XHJcbiAgICBpZiAoc3RvcmFnZV8xLnN0b3JhZ2UuY3VycmVudEdhbWVRdWV1ZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAoMCwgZW5kR2FtZV8xLmVuZEdhbWUpKCk7XHJcbiAgICB9XHJcbiAgICA7XHJcbn1cclxuZXhwb3J0cy5ydW5TcHJpbnQgPSBydW5TcHJpbnQ7XHJcbmZ1bmN0aW9uIGdvTmV4dChjb21tYW5kKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBjb25zdCBhdWRpb0JpdGUgPSBuZXcgQXVkaW87XHJcbiAgICBpZiAoY29tbWFuZCkge1xyXG4gICAgICAgIGF1ZGlvQml0ZS5zcmMgPSAnLi9hc3NldHMvc291bmRzL3JpZ2h0QW5zd2VyLm1wMyc7XHJcbiAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UuZW5kR2FtZVJlc3VsdHMucmlnaHQucHVzaChzdG9yYWdlXzEuc3RvcmFnZS5yaWdodEFuc3dlcik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBhdWRpb0JpdGUuc3JjID0gJy4vYXNzZXRzL3NvdW5kcy93cm9uZ0Fuc3dlci5tcDMnO1xyXG4gICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmVuZEdhbWVSZXN1bHRzLndyb25nLnB1c2goc3RvcmFnZV8xLnN0b3JhZ2Uuc2luZ2xlVmFyaWFudCk7XHJcbiAgICB9XHJcbiAgICBhdWRpb0JpdGUucGxheSgpO1xyXG4gICAgKF9hID0gc3RvcmFnZV8xLnN0b3JhZ2UuYWJvcnRDb250cm9sbGVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWJvcnQoKTtcclxuICAgIHJ1blNwcmludCgpO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMubGlzdGVuZXIgPSB2b2lkIDA7XHJcbmNvbnN0IHN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9zdG9yYWdlXCIpO1xyXG5jb25zdCByb2xsTWVudV8xID0gcmVxdWlyZShcIi4vcm9sbE1lbnVcIik7XHJcbmNvbnN0IHJvdXRlcl8xID0gcmVxdWlyZShcIi4vcm91dGVyXCIpO1xyXG5jb25zdCBwbGF5U291bmRfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9wbGF5U291bmRcIik7XHJcbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4uL3V0aWxzL2FwaVwiKTtcclxuY29uc3QgbGlzdGVuZXIgPSAoKSA9PiB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGxldCBldmVudFRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgICAgIGxldCBpZCA9IGV2ZW50VGFyZ2V0LmlkO1xyXG4gICAgICAgIGlmIChpZCA9PT0gJ2dvSG9tZScpXHJcbiAgICAgICAgICAgICgwLCByb3V0ZXJfMS5yb3V0ZXIpKCdob21lJyk7XHJcbiAgICAgICAgaWYgKGlkID09PSAnZ29Cb29rJyB8fCBpZCA9PT0gJ2xlYXJuV29yZHMnKVxyXG4gICAgICAgICAgICAoMCwgcm91dGVyXzEucm91dGVyKSgnYm9vaycpO1xyXG4gICAgICAgIGlmIChpZCA9PT0gJ2dvSGlzdG9yeScpXHJcbiAgICAgICAgICAgICgwLCByb3V0ZXJfMS5yb3V0ZXIpKCdoaXN0b3J5Jyk7XHJcbiAgICAgICAgaWYgKGlkID09PSAnZ29HYW1lcycgfHwgaWQgPT09ICdwbGF5R2FtZXMnKVxyXG4gICAgICAgICAgICAoMCwgcm91dGVyXzEucm91dGVyKSgnZ2FtZXMnKTtcclxuICAgICAgICBpZiAoaWQgPT09ICdnb1N0YXRzJyB8fCBpZCA9PT0gJ3lvdXJTdGF0cycpXHJcbiAgICAgICAgICAgICgwLCByb3V0ZXJfMS5yb3V0ZXIpKCdzdGF0cycpO1xyXG4gICAgICAgIGlmIChpZCA9PT0gJ2dvRGV2JylcclxuICAgICAgICAgICAgd2luZG93Lm9wZW4oJ2h0dHBzOi8vcm9sbGluZy1zY29wZXMtc2Nob29sLmdpdGh1Yi5pby92bGFkaW1pcnBhcm1vbi1KU0ZFMjAyMVEzL0NWL2luZGV4Lmh0bWwnLCAnbXl3aW5kb3cnKTtcclxuICAgICAgICBpZiAoaWQgPT09ICdnb0NvbW1lbnRzJylcclxuICAgICAgICAgICAgKDAsIHJvdXRlcl8xLnJvdXRlcikoJ2NvbW1lbnRzJyk7XHJcbiAgICAgICAgaWYgKGlkID09PSAnZ29BdWRpbycpXHJcbiAgICAgICAgICAgICgwLCByb3V0ZXJfMS5yb3V0ZXIpKCdhdWRpbycpO1xyXG4gICAgICAgIGlmIChpZCA9PT0gJ2dvU3ByaW50JylcclxuICAgICAgICAgICAgKDAsIHJvdXRlcl8xLnJvdXRlcikoJ3NwcmludCcpO1xyXG4gICAgICAgIGlmIChpZCA9PT0gJ29wZW5NZW51QnV0dG9uJylcclxuICAgICAgICAgICAgKDAsIHJvbGxNZW51XzEucm9sbE1lbnUpKCdvcGVuJyk7XHJcbiAgICAgICAgaWYgKGlkID09PSAnY2xvc2VNZW51QnV0dG9uJylcclxuICAgICAgICAgICAgKDAsIHJvbGxNZW51XzEucm9sbE1lbnUpKCdjbG9zZScpO1xyXG4gICAgICAgIGlmIChpZCAhPT0gJ29wZW5NZW51QnV0dG9uJylcclxuICAgICAgICAgICAgKDAsIHJvbGxNZW51XzEucm9sbE1lbnUpKCdjbG9zZScpO1xyXG4gICAgICAgIGlmIChpZCA9PT0gJ3BhZ2UnKVxyXG4gICAgICAgICAgICAoMCwgcm9sbE1lbnVfMS5yb2xsUGFnZVNlbGVjdG9yKSgnb3BlbicpO1xyXG4gICAgICAgIGlmIChpZCAhPT0gJ3BhZ2UnKVxyXG4gICAgICAgICAgICAoMCwgcm9sbE1lbnVfMS5yb2xsUGFnZVNlbGVjdG9yKSgnY2xvc2UnKTtcclxuICAgICAgICBpZiAoaWQgPT09ICdwcmV2aW91c1BhZ2UnKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmJvb2tQYWdlID4gMCA/IHN0b3JhZ2VfMS5zdG9yYWdlLmJvb2tQYWdlIC09IDEgOiBzdG9yYWdlXzEuc3RvcmFnZS5ib29rUGFnZTtcclxuICAgICAgICAgICAgKDAsIHJvdXRlcl8xLnJvdXRlcikoJ2Jvb2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlkID09PSAnbmV4dFBhZ2UnKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmJvb2tQYWdlIDwgc3RvcmFnZV8xLnN0b3JhZ2UudG90YWxQYWdlcyA/IHN0b3JhZ2VfMS5zdG9yYWdlLmJvb2tQYWdlICs9IDEgOiBzdG9yYWdlXzEuc3RvcmFnZS5ib29rUGFnZTtcclxuICAgICAgICAgICAgKDAsIHJvdXRlcl8xLnJvdXRlcikoJ2Jvb2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlkLnNwbGl0KCctJylbMF0gPT09ICdwYWdlTGlzdE9wdGlvbicpIHtcclxuICAgICAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UuYm9va1BhZ2UgPSAraWQuc3BsaXQoJy0nKVsxXTtcclxuICAgICAgICAgICAgKDAsIHJvdXRlcl8xLnJvdXRlcikoJ2Jvb2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlkID09PSAnc2VjdGlvbicpXHJcbiAgICAgICAgICAgICgwLCByb2xsTWVudV8xLnJvbGxTZWN0aW9uU2VsZWN0b3IpKCdvcGVuJyk7XHJcbiAgICAgICAgaWYgKGlkICE9PSAnc2VjdGlvbicpXHJcbiAgICAgICAgICAgICgwLCByb2xsTWVudV8xLnJvbGxTZWN0aW9uU2VsZWN0b3IpKCdjbG9zZScpO1xyXG4gICAgICAgIGlmIChpZC5zcGxpdCgnLScpWzBdID09PSAnc2VjdGlvbkxpc3RPcHRpb24nKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmJvb2tHcm91cCA9ICtpZC5zcGxpdCgnLScpWzFdO1xyXG4gICAgICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5ib29rUGFnZSA9IDA7XHJcbiAgICAgICAgICAgICgwLCByb3V0ZXJfMS5yb3V0ZXIpKCdib29rJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpZCA9PT0gJ2dhbWVzJylcclxuICAgICAgICAgICAgKDAsIHJvbGxNZW51XzEucm9sbEdhbWVzU2VsZWN0b3IpKCdvcGVuJyk7XHJcbiAgICAgICAgaWYgKGlkICE9PSAnZ2FtZXMnKVxyXG4gICAgICAgICAgICAoMCwgcm9sbE1lbnVfMS5yb2xsR2FtZXNTZWxlY3RvcikoJ2Nsb3NlJyk7XHJcbiAgICAgICAgaWYgKGlkLnNwbGl0KCctJylbMF0gPT09ICdnYW1lc0xpc3RPcHRpb24nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhbWVUb1RyYXZlbFRvID0gaWQuc3BsaXQoJy0nKVsxXTtcclxuICAgICAgICAgICAgc3dpdGNoIChnYW1lVG9UcmF2ZWxUbykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnYXVkaW8nOlxyXG4gICAgICAgICAgICAgICAgICAgICgwLCByb3V0ZXJfMS5yb3V0ZXIpKCdhdWRpbycsICdvbmx5T25lUGFnZVJlcXVpcmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyBjYXNlICdwdXp6bGUnOiByb3V0ZXIoJ3B1enpsZScsICdvbmx5T25lUGFnZVJlcXVpcmVkJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vIGNhc2UgJ3NuaXBlcic6IHJvdXRlcignc25pcGVyJywgJ29ubHlPbmVQYWdlUmVxdWlyZWQnKTtcclxuICAgICAgICAgICAgICAgIC8vIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3ByaW50JzpcclxuICAgICAgICAgICAgICAgICAgICAoMCwgcm91dGVyXzEucm91dGVyKSgnc3ByaW50JywgJ29ubHlPbmVQYWdlUmVxdWlyZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaWQuc3BsaXQoJy0nKVswXSA9PT0gJ3BsYXlTb3VuZCcpXHJcbiAgICAgICAgICAgICgwLCBwbGF5U291bmRfMS5wbGF5U291bmQpKGlkLnNwbGl0KCctJylbMV0pO1xyXG4gICAgICAgIGlmIChpZCA9PT0gJ3JlcGVhdEF1ZGlvJykge1xyXG4gICAgICAgICAgICBjb25zdCBhdWRpb0JpdGUgPSBuZXcgQXVkaW87XHJcbiAgICAgICAgICAgIGF1ZGlvQml0ZS5zcmMgPSBgJHthcGlfMS5maWxlc1VybH0vJHtzdG9yYWdlXzEuc3RvcmFnZS5yaWdodEFuc3dlci5hdWRpb31gO1xyXG4gICAgICAgICAgICBhdWRpb0JpdGUucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaWQgPT09ICdsb2dpbicpXHJcbiAgICAgICAgICAgICgwLCBhcGlfMS5oYW5kbGVMb2dpbikoJ2xvZ2luJyk7XHJcbiAgICAgICAgaWYgKGlkID09PSAnc2VuZCcpXHJcbiAgICAgICAgICAgICgwLCBhcGlfMS5oYW5kbGVMb2dpbikoJ3NlbmQnKTtcclxuICAgICAgICBpZiAoaWQgPT09ICdwYXNzd29yZFJldmVhbCcpXHJcbiAgICAgICAgICAgICgwLCByb2xsTWVudV8xLnBhc3N3b3JkUmV2ZWFsKSgpO1xyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydHMubGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmF1ZGlvQ2hhbGxlbmdlUGFnZSA9IHZvaWQgMDtcclxuY29uc3QgbG9hZGVyXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvbG9hZGVyXCIpO1xyXG5jb25zdCBhdWRpb0NoYWxsZW5nZV8xID0gcmVxdWlyZShcIi4uLy4uL2dhbWVzL2F1ZGlvQ2hhbGxlbmdlXCIpO1xyXG5jb25zdCBnZXREYXRhXzEgPSByZXF1aXJlKFwiLi4vLi4vZ2FtZXMvZ2V0RGF0YVwiKTtcclxuY29uc3Qgc3RvcmFnZV8xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL3N0b3JhZ2VcIik7XHJcbmNvbnN0IG1pc2NfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9taXNjXCIpO1xyXG5leHBvcnRzLmF1ZGlvQ2hhbGxlbmdlUGFnZSA9IHtcclxuICAgIHJlbmRlcjogKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgKDAsIGxvYWRlcl8xLnNob3dMb2FkZXIpKCk7XHJcbiAgICAgICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLm9ubHlPbmVQYWdlID8geWllbGQgKDAsIGdldERhdGFfMS5nZXRTaW5nbGVQYWdlRGF0YSkoKSA6IHlpZWxkICgwLCBnZXREYXRhXzEuZ2V0RGF0YSkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKF9hKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAoMCwgbG9hZGVyXzEuaGlkZUxvYWRlcikoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyR2FtZXNcIj5cclxuICAgICAgPGRpdiBpZD1cIndyYXBwZXJBdWRpb0dhbWVcIj5cclxuICAgICAgICA8ZGl2IGlkPVwicmVwZWF0QXVkaW9cIj5cclxuICAgICAgICAgIDxpbWcgaWQ9XCJyZXBlYXRBdWRpb0ljb25cIiBzcmM9XCJhc3NldHMvc3ZnL3NvdW5kLnN2Z1wiIGFsdD1cImljb25cIj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGlkPVwiYXVkaW9HYW1lT3B0aW9uc1wiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgYDtcclxuICAgIH0pLFxyXG4gICAgYWZ0ZXJSZW5kZXI6ICgpID0+IHtcclxuICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5jdXJyZW50R2FtZU1vZGUgPSAnQXVkaW9HYW1lJztcclxuICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5lbmRHYW1lUmVzdWx0cy5yaWdodCA9IFtdO1xyXG4gICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmVuZEdhbWVSZXN1bHRzLndyb25nID0gW107XHJcbiAgICAgICAgKDAsIG1pc2NfMS5yZW1vdmVGb290ZXIpKCk7XHJcbiAgICAgICAgKDAsIGF1ZGlvQ2hhbGxlbmdlXzEucnVuQXVkaW9HYW1lKSgpO1xyXG4gICAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuYm9va1BhZ2UgPSB2b2lkIDA7XHJcbmNvbnN0IHN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9zdG9yYWdlXCIpO1xyXG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9hcGlcIik7XHJcbmNvbnN0IGxvYWRlcl8xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL2xvYWRlclwiKTtcclxuY29uc3QgbWlzY18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL21pc2NcIik7XHJcbmV4cG9ydHMuYm9va1BhZ2UgPSB7XHJcbiAgICByZW5kZXI6ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYm9va0dyb3VwLCBib29rUGFnZSB9ID0gc3RvcmFnZV8xLnN0b3JhZ2U7XHJcbiAgICAgICAgbGV0IGluZm87XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgKDAsIGxvYWRlcl8xLnNob3dMb2FkZXIpKCk7XHJcbiAgICAgICAgICAgIGluZm8gPSB5aWVsZCAoMCwgYXBpXzEuZ2V0V29yZHMpKGJvb2tHcm91cCwgYm9va1BhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgKDAsIGxvYWRlcl8xLmhpZGVMb2FkZXIpKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwYWdlTGF5b3V0ID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmZvLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHBhZ2VMYXlvdXQgKz0geWllbGQgZ2VuZXJhdGVDYXJkKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjYXBpdGFsaXplKHN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlQ2FyZChpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgICAgICA8aW1nIGNsYXNzPVwiY2FyZEltZ1wiIHNyYz1cIiR7YXBpXzEuZmlsZXNVcmx9LyR7aW5mb1tpXS5pbWFnZX1cIiBhbHQ9XCIke2luZm9baV0ud29yZH1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkSW5mb1wiPlxyXG4gICAgICAgICAgICA8aDI+JHtjYXBpdGFsaXplKGluZm9baV0ud29yZCl9IC0gJHtpbmZvW2ldLnRyYW5zY3JpcHRpb259PGltZyBjbGFzcz1cInNvdW5kSWNvblwiIGlkPVwicGxheVNvdW5kLSR7aW5mb1tpXS5hdWRpb31cIiBzcmM9XCJhc3NldHMvc3ZnL3NvdW5kLnN2Z1wiIGFsdD1cInNvdW5kXCI+PC9oMj5cclxuICAgICAgICAgICAgPGgzPiR7Y2FwaXRhbGl6ZShpbmZvW2ldLndvcmRUcmFuc2xhdGUpfTwvaDM+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tdG9wOiAyMHB4XCI+XHJcbiAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInNvdW5kSWNvbjJcIiBpZD1cInBsYXlTb3VuZC0ke2luZm9baV0uYXVkaW9NZWFuaW5nfVwiIHNyYz1cImFzc2V0cy9zdmcvcGxheUJ1dHRvbi5zdmdcIiBhbHQ9XCJzb3VuZFwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuPiR7aW5mb1tpXS50ZXh0TWVhbmluZ308L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8c3Bhbj4ke2luZm9baV0udGV4dE1lYW5pbmdUcmFuc2xhdGV9PC9zcGFuPjxicj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbi10b3A6IDIwcHhcIj5cclxuICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwic291bmRJY29uMlwiIGlkPVwicGxheVNvdW5kLSR7aW5mb1tpXS5hdWRpb0V4YW1wbGV9XCIgc3JjPVwiYXNzZXRzL3N2Zy9wbGF5QnV0dG9uLnN2Z1wiIGFsdD1cInNvdW5kXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4+JHtpbmZvW2ldLnRleHRFeGFtcGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxzcGFuPiR7aW5mb1tpXS50ZXh0RXhhbXBsZVRyYW5zbGF0ZX08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwid3JhcHBlclwiPlxyXG4gICAgICA8aDE+0KPRh9C10LHQvdC40Lo8L2gxPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicGFnZUNvbnRyb2xzXCI+XHJcbiAgICAgICAgPGRpdiBpZD1cInNlY3Rpb25cIj5cclxuICAgICAgICAgIDxpbWcgc3JjPVwiYXNzZXRzL3N2Zy9mb2xkZXIuc3ZnXCIgYWx0PVwiZm9sZGVySWNvblwiPlxyXG4gICAgICAgICAgPHNwYW4+0KDQsNC30LTQtdC7IDxzcGFuIGlkPVwic2VjdGlvbkNvdW50ZXJcIj4ke3N0b3JhZ2VfMS5zdG9yYWdlLmJvb2tHcm91cCArIDF9LyR7c3RvcmFnZV8xLnN0b3JhZ2UudG90YWxHcm91cHN9PC9zcGFuPjwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGlkPVwicGFnZVwiPlxyXG4gICAgICAgICAgPGRpdiBpZD1cInByZXZpb3VzUGFnZVwiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9zdmcvYXJyb3cuc3ZnXCIgYWx0PVwicHJldlwiPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8c3Bhbj7QodGC0YDQsNC90LjRhtCwIDxzcGFuIGlkPVwicGFnZUNvdW50ZXJcIj4ke3N0b3JhZ2VfMS5zdG9yYWdlLmJvb2tQYWdlICsgMX0vJHtzdG9yYWdlXzEuc3RvcmFnZS50b3RhbFBhZ2VzfTwvc3Bhbj48L3NwYW4+XHJcbiAgICAgICAgICA8ZGl2IGlkPVwibmV4dFBhZ2VcIj5cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJhc3NldHMvc3ZnL2Fycm93LnN2Z1wiIGFsdD1cIm5leHRcIj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJzZXR0aW5nc1wiPlxyXG4gICAgICAgICAgPGltZyBzcmM9XCJhc3NldHMvc3ZnL3NldHRpbmdzLnN2Z1wiIGFsdD1cInNldHRpbmdzSWNvblwiPlxyXG4gICAgICAgICAgPHNwYW4+0J3QsNGB0YLRgNC+0LnQutC4PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJnYW1lc1wiPlxyXG4gICAgICAgICAgPGltZyBzcmM9XCJhc3NldHMvc3ZnL2dhbWVwYWQuc3ZnXCIgYWx0PVwiZ2FtZXNJY29uXCI+XHJcbiAgICAgICAgICA8c3Bhbj7QmNCz0YDRizwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgICR7cGFnZUxheW91dH1cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInJldHVybkJ1dHRvblwiPjwvZGl2PlxyXG4gICAgYDtcclxuICAgIH0pLFxyXG4gICAgYWZ0ZXJSZW5kZXI6ICgpID0+IHtcclxuICAgICAgICAoMCwgbWlzY18xLmFkZEZvb3RlcikoKTtcclxuICAgIH1cclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5jb21tZW50c1BhZ2UgPSB2b2lkIDA7XHJcbmV4cG9ydHMuY29tbWVudHNQYWdlID0ge1xyXG4gICAgcmVuZGVyOiAoKSA9PiAoYFxyXG5cclxuICBgKSxcclxuICAgIGFmdGVyUmVuZGVyOiAoKSA9PiB7XHJcbiAgICB9XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGV2UGFnZSA9IHZvaWQgMDtcclxuY29uc3QgbWlzY18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL21pc2NcIik7XHJcbmV4cG9ydHMuZGV2UGFnZSA9IHtcclxuICAgIHJlbmRlcjogKCkgPT4gKGBcclxuICAgIDxoMT5IZWxsbyBEZXYgYmx5YWQ8L2gxPlxyXG4gIGApLFxyXG4gICAgYWZ0ZXJSZW5kZXI6ICgpID0+IHtcclxuICAgICAgICAoMCwgbWlzY18xLmFkZEZvb3RlcikoKTtcclxuICAgIH1cclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nYW1lc1BhZ2UgPSB2b2lkIDA7XHJcbmNvbnN0IG1pc2NfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9taXNjXCIpO1xyXG5leHBvcnRzLmdhbWVzUGFnZSA9IHtcclxuICAgIHJlbmRlcjogKCkgPT4gKGBcclxuICA8ZGl2IGNsYXNzPVwid3JhcHBlckdhbWVzXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZ2FtZU1vZGVTZWxlY3RvclwiPlxyXG4gICAgICA8c3Bhbj5BdWRpbyBjaGFsbGVuZ2U8L3NwYW4+XHJcbiAgICAgIDxkaXYgaWQ9XCJnb0F1ZGlvXCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJnYW1lTW9kZVNlbGVjdG9yXCI+XHJcbiAgICAgIDxzcGFuPlNwcmludCBtb2RlPC9zcGFuPlxyXG4gICAgICA8ZGl2IGlkPVwiZ29TcHJpbnRcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImdhbWVNb2RlU2VsZWN0b3JcIj5cclxuICAgICAgPHNwYW4+U25pcGVyPC9zcGFuPlxyXG4gICAgICA8ZGl2IGlkPVwiZ29TbmlwZXJcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImdhbWVNb2RlU2VsZWN0b3JcIj5cclxuICAgICAgPHNwYW4+UHV6emxlIGdhbWU8L3NwYW4+XHJcbiAgICAgIDxkaXYgaWQ9XCJnb1B1enpsZVwiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgYCksXHJcbiAgICBhZnRlclJlbmRlcjogKCkgPT4ge1xyXG4gICAgICAgICgwLCBtaXNjXzEuYWRkRm9vdGVyKSgpO1xyXG4gICAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmhpc3RvcnlQYWdlID0gdm9pZCAwO1xyXG5jb25zdCBtaXNjXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvbWlzY1wiKTtcclxuZXhwb3J0cy5oaXN0b3J5UGFnZSA9IHtcclxuICAgIHJlbmRlcjogKCkgPT4gKGBcclxuICAgIDxoMT5IZWxsbyBIaXN0b3J5IGJseWFkPC9oMT5cclxuICBgKSxcclxuICAgIGFmdGVyUmVuZGVyOiAoKSA9PiB7XHJcbiAgICAgICAgKDAsIG1pc2NfMS5hZGRGb290ZXIpKCk7XHJcbiAgICB9XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuaG9tZVBhZ2UgPSB2b2lkIDA7XHJcbmNvbnN0IG1pc2NfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9taXNjXCIpO1xyXG5jb25zdCBzbGlkZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9zbGlkZXJcIik7XHJcbmNvbnN0IHN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9zdG9yYWdlXCIpO1xyXG5leHBvcnRzLmhvbWVQYWdlID0ge1xyXG4gICAgcmVuZGVyOiAoKSA9PiAoYFxyXG4gIDxkaXYgaWQ9XCJzbGlkZXJcIj5cclxuICAgIDxkaXYgaWQ9XCJ3cmFwcGVyQXVzd2Vpc1wiPlxyXG4gICAgICA8ZGl2IGlkPVwid3JhcHBlckF1c3dlaXNJbm5lclwiPlxyXG4gICAgICAgIDxhIGhyZWY9XCIjcmVnaXN0ZXJcIiBpZD1cInJlZ2lzdGVyXCI+0JXRidC1INC90LUg0LfQsNGA0LXQs9C40YHRgtGA0LjRgNC+0LLQsNC90Ys/PC9hPlxyXG4gICAgICAgIDxhIGhyZWY9XCIjd2hhdGV2ZXJcIiBjbGFzcz1cInVuZG9lclwiPtCjINC80LXQvdGPINGD0LbQtSDQtdGB0YLRjCDQsNC60LrQsNGD0L3RgiE8L2E+XHJcbiAgICAgICAgPGRpdiBpZD1cIm5hbWVXcmFwcGVyXCIgY2xhc3M9XCJpbnB1dFdyYXBwZXJcIj5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibmFtZVwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIHBsYWNlaG9sZGVyPVwi0JLQstC10LTQuNGC0LUg0LjQvNGPXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidmFsaWRhdGlvblwiPtCY0LzRjyDQvtCx0Y/Qt9Cw0YLQtdC70YzQvdC+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJtYWlsXCIgcGxhY2Vob2xkZXI9XCLQktCy0LXQtNC40YLQtSDQsNC00YDQtdGBINGN0LsuINC/0L7Rh9GC0YtcIiByZXF1aXJlZD5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWxpZGF0aW9uXCI+0JDQtNGA0LXRgSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0LLQsNC70LjQtNC90YvQvDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dFdyYXBwZXJcIj5cclxuICAgICAgICAgIDxpbWcgaWQ9XCJwYXNzd29yZFJldmVhbFwiIHNyYz1cImFzc2V0cy9zdmcvZXllLWhpZGUuc3ZnXCIgYWx0PVwicGFzc3dvcmQgcmV2ZWFsXCI+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwi0JLQstC10LTQuNGC0LUg0L/QsNGA0L7Qu9GMXCIgcmVxdWlyZWQgbWlubGVuZ3RoPVwiOFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZhbGlkYXRpb25cIj7QnNC40L3QuNC80YPQvCA4INGB0LjQvNCy0L7Qu9C+0LI8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8YnV0dG9uIGlkPVwibG9naW5cIj7QktC+0LnRgtC4PC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cInNlbmRcIj7Ql9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjNGB0Y88L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgaWQ9XCJyZXR1cm5Gcm9tQXVzd2Vpc1wiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGlkPVwid3JhcHBlckhvbWVBdXRoXCIgJHtzdG9yYWdlXzEuc3RvcmFnZS5pc0F1dGhvcml6ZWQgPyAnc3R5bGU9XCJkaXNwbGF5OiBmbGV4XCInIDogJ3N0eWxlPVwiZGlzcGxheTogbm9uZVwiJ30+XHJcbiAgICAgIDxoMSBpZD1cImdyZWV0aW5nXCI+0J/RgNC40LLQtdGCLCAke3N0b3JhZ2VfMS5zdG9yYWdlLnVzZXJOYW1lfTwvaDE+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpdml0eVNlbGVjdG9yXCI+XHJcbiAgICAgICAgPGRpdiBpZD1cImxlYXJuV29yZHNcIj48L2Rpdj5cclxuICAgICAgICA8c3Bhbj7Qo9GH0LjRgtGMINGB0LvQvtCy0LA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpdml0eVNlbGVjdG9yXCI+XHJcbiAgICAgICAgPGRpdiBpZD1cInBsYXlHYW1lc1wiPjwvZGl2PlxyXG4gICAgICA8c3Bhbj7QmNCz0YDQsNGC0Ywg0LIg0LjQs9GA0Ys8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYWN0aXZpdHlTZWxlY3RvclwiPlxyXG4gICAgICAgIDxkaXYgaWQ9XCJ5b3VyU3RhdHNcIj48L2Rpdj5cclxuICAgICAgICA8c3Bhbj7QodGC0LDRgtC40YHRgtC40LrQsDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpdml0eVNlbGVjdG9yXCI+XHJcbiAgICAgICAgPGRpdiBpZD1cImFib3V0VGhlUHJvamVjdFwiPjwvZGl2PlxyXG4gICAgICAgIDxzcGFuPtC+INC/0YDQvtC10LrRgtC1PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBpZD1cIndyYXBwZXJIb21lXCIgJHtzdG9yYWdlXzEuc3RvcmFnZS5pc0F1dGhvcml6ZWQgPyAnc3R5bGU9XCJkaXNwbGF5OiBub25lXCInIDogJ3N0eWxlPVwiZGlzcGxheTogZmxleFwiJ30+XHJcbiAgICAgICAgPGgxIGlkPVwibG9nb1wiPjxzcGFuPlI8L3NwYW4+PHNwYW4+Uzwvc3Bhbj48c3Bhbj4gTGFuZzwvc3Bhbj48L2gxPlxyXG4gICAgICA8ZGl2IGlkPVwiaG9tZUJ1dHRvbnNXcmFwcGVyXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cImhvbWVUb1JlZ2lzdHJhdGlvblwiPtCg0LXQs9C40YHRgtGA0LDRhtC40Y8gLyDQktGF0L7QtDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJob21lVG9BYm91dFBhZ2VcIj7QniDQv9GA0L7QtdC60YLQtTwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBpZD1cIndyYXBwZXJBYm91dFwiPlxyXG4gICAgICA8ZGl2IGlkPVwicmV0dXJuRnJvbUFib3V0XCI+PC9kaXY+XHJcbiAgICAgIDxkaXYgaWQ9XCJ2aWRlb1wiPlxyXG4gICAgICAgIDxkaXYgaWQ9XCJ2aWRlb0l0c2VsZlwiPlxyXG4gICAgICAgICAgPGlmcmFtZVxyXG4gICAgICAgICAgICBzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC9kUXc0dzlXZ1hjUVwiIFxyXG4gICAgICAgICAgICB0aXRsZT1cIllvdVR1YmUgdmlkZW8gcGxheWVyXCIgXHJcbiAgICAgICAgICAgIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93PVwiYWNjZWxlcm9tZXRlcjsgYXV0b3BsYXk7IFxyXG4gICAgICAgICAgICBjbGlwYm9hcmQtd3JpdGU7IGVuY3J5cHRlZC1tZWRpYTsgZ3lyb3Njb3BlOyBwaWN0dXJlLWluLXBpY3R1cmVcIiBcclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuPlxyXG4gICAgICAgICAgPC9pZnJhbWU+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGgyPtCi0LXQv9C10YDRjCDRg9GH0LjRgtGMINCw0L3Qs9C70LjQudGB0LrQuNC5INGP0LfRi9C6INC70LXQs9C60L4g0Lgg0YPQstC70LXQutCw0YLQtdC70YzQvdC+ITwvaDI+XHJcbiAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICDQo9GH0LjRgtC1INC4INC30LDQv9C+0LzQuNC90LDQudGC0LUg0YHQu9C+0LLQsDxicj5cclxuICAgICAgICAgINCX0LDQutGA0LXQv9C70Y/QudGC0LUg0YPRgdC/0LXRhSDQv9C+0LLRgtC+0YDQtdC90LjQtdC8LCDQuNCz0YDQsNGPINCyINC80LjQvdC4LdC40LPRgNGLPGJyPlxyXG4gICAgICAgICAg0J/QvtCy0YLQvtGA0LXQvdC40LUg0LrQsNC20LTRi9C5INC00LXQvdGMINC00LvRjyDQtNC+0YHRgtC40LbQtdC90LjRjyDQv9C+0YLRgNGP0YHQsNGO0YnQtdCz0L4g0YDQtdC30YPQu9GM0YLQsNGC0LAhXHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBpZD1cImFkZGl0aW9uYWxJbmZvXCI+XHJcbiAgICAgICAgPGgyPjxpbWcgaWNvbjIgc3JjPVwiYXNzZXRzL3N2Zy9ib29rLnN2Z1wiIGFsdD1cImJvb2tcIj7Qo9GH0LXQsdC90LjQujwvaDI+XHJcbiAgICAgICAgPHNwYW4+0JHQvtC70LXQtSAzNTAwINGB0LvQvtCyLCDRgNCw0LfQuNGC0YvRhSDQv9C+INGB0LvQvtC20L3QvtGB0YLQuCDQvdCwINGA0LDQt9C00LXQu9GLINGBINGD0LTQvtCx0L3QvtC5INC90LDQstC40LPQsNGG0LjQtdC5PC9zcGFuPlxyXG4gICAgICAgIDxoMj48aW1nIGljb24yIHNyYz1cImFzc2V0cy9zdmcvaGlzdG9yeS5zdmdcIiBhbHQ9XCJoaXN0b3J5XCI+0JjRgdGC0L7RgNC40Y88L2gyPlxyXG4gICAgICAgIDxzcGFuPtCg0LDQt9C00LXQuywg0YHQvtC00LXRgNCw0LbQsNGJ0LjQuSDQv9C10YDRgdC+0L3QsNC70YzQvdGL0Lkg0YHQu9C+0LLQsNGA0Ywg0LTQu9GPINC/0L7QstGC0L7RgNC10L3QuNGPINC40LzQtdC90L3QviDRgtC10YUg0YHQu9C+0LIsINC60L7RgtC+0YDRi9C1INGP0LLQu9GP0Y7RgtGB0Y8g0L/RgNC+0LHQu9C10LzQvdGL0LzQuFxyXG4gICAgICAgINC4INCy0YHQtSDRgdC70L7QstCwLCDQutC+0YLQvtGA0YvQtSDRgNCw0L3RjNGI0LUg0LLRgdGC0YDQtdGH0LDQu9C40YHRjCDQsiDQuNCz0YDQsNGFPC9zcGFuPlxyXG4gICAgICAgIDxoMj48aW1nIGljb24yIHNyYz1cImFzc2V0cy9zdmcvZ2FtZXBhZC5zdmdcIiBhbHQ9XCJnYW1lcGFkXCI+0JjQs9GA0Ys8L2gyPlxyXG4gICAgICAgIDxzcGFuPjQg0YPQstC70LXQutCw0YLQtdC70YzQvdGL0YUg0LjQs9GA0YssINC60L7RgtC+0YDRi9C1INC/0L7QvNC+0LPRg9GCINGA0LDRgdGI0LjRgNC40YLRjCDQstC+0LrQsNCx0YPQu9GP0YAsINGD0LvRg9GH0YjQuNGC0Ywg0L3QsNCy0YvQutC4INC/0YDQsNCy0L7Qv9C40YHQsNC90LjRjyDQuCDQstC+0YHQv9GA0LjRj9GC0LjRjyAg0YDQtdGH0Lgg0L3QsCDRgdC70YPRhTwvc3Bhbj5cclxuICAgICAgICA8aDI+PGltZyBpY29uMiBzcmM9XCJhc3NldHMvc3ZnL2NoYXJ0LnN2Z1wiIGFsdD1cImNoYXJ0XCI+0KHRgtCw0YLQuNGB0YLQuNC60LA8L2gyPlxyXG4gICAgICAgIDxzcGFuPtCf0J7QutCwINC90LUg0YHQtNC10LvQsNC90L4g0Lgg0YXRg9C5INC30L3QsNC10YIg0LTQvtCx0YPRgNGD0YHRjCDQu9C4KSkwMDAhMDAxKSnQsNC00YvQvTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICBgKSxcclxuICAgIGFmdGVyUmVuZGVyOiAoKSA9PiB7XHJcbiAgICAgICAgKDAsIG1pc2NfMS5hZGRGb290ZXIpKCk7XHJcbiAgICAgICAgKDAsIHNsaWRlcl8xLnNsaWRlcikoKTtcclxuICAgIH1cclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnNwcmludFBhZ2UgPSB2b2lkIDA7XHJcbmNvbnN0IHNwcmludF8xID0gcmVxdWlyZShcIi4uLy4uL2dhbWVzL3NwcmludFwiKTtcclxuY29uc3QgZ2V0RGF0YV8xID0gcmVxdWlyZShcIi4uLy4uL2dhbWVzL2dldERhdGFcIik7XHJcbmNvbnN0IHN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9zdG9yYWdlXCIpO1xyXG5jb25zdCBsb2FkZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9sb2FkZXJcIik7XHJcbmNvbnN0IHRpbWVyXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvdGltZXJcIik7XHJcbmNvbnN0IG1pc2NfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9taXNjXCIpO1xyXG5leHBvcnRzLnNwcmludFBhZ2UgPSB7XHJcbiAgICByZW5kZXI6ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICgwLCBsb2FkZXJfMS5zaG93TG9hZGVyKSgpO1xyXG4gICAgICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5vbmx5T25lUGFnZSA/IHlpZWxkICgwLCBnZXREYXRhXzEuZ2V0U2luZ2xlUGFnZURhdGEpKCkgOiB5aWVsZCAoMCwgZ2V0RGF0YV8xLmdldERhdGEpKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChfYSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgKDAsIGxvYWRlcl8xLmhpZGVMb2FkZXIpKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgPGRpdiBjbGFzcz1cIndyYXBwZXJHYW1lc1wiPlxyXG4gICAgPGRpdiBpZD1cIndyYXBwZXJTcHJpbnRcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInRpbWVySG9sZGVyXCI+XHJcbiAgICAgICAgPGNhbnZhcyBpZD1cInRpbWVMZWZ0XCIgd2lkdGg9XCIxNTBcIiBoZWlnaHQ9XCIxNTBcIj48L2NhbnZhcz5cclxuICAgICAgICA8c3BhbiBpZD1cInRpbWVMZWZ0RGlnaXRzXCI+PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPHNwYW4gaWQ9XCJzcHJpbnRXb3JkU3BhblwiPjwvc3Bhbj5cclxuICAgICAgPHNwYW4gaWQ9XCJzcHJpbnRWYXJpYW50U3BhblwiPjwvc3Bhbj5cclxuICAgICAgPGRpdiBpZD1cInNwcmludEJ1dHRvbnNcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIGA7XHJcbiAgICB9KSxcclxuICAgIGFmdGVyUmVuZGVyOiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHN0b3JhZ2VfMS5zdG9yYWdlLnNlY29uZHNJbnRlcnZhbClcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzdG9yYWdlXzEuc3RvcmFnZS5zZWNvbmRzSW50ZXJ2YWwpO1xyXG4gICAgICAgIGlmIChzdG9yYWdlXzEuc3RvcmFnZS5tc0ludGVydmFsKVxyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHN0b3JhZ2VfMS5zdG9yYWdlLm1zSW50ZXJ2YWwpO1xyXG4gICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmN1cnJlbnRHYW1lTW9kZSA9ICdTcHJpbnQnO1xyXG4gICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmVuZEdhbWVSZXN1bHRzLnJpZ2h0ID0gW107XHJcbiAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UuZW5kR2FtZVJlc3VsdHMud3JvbmcgPSBbXTtcclxuICAgICAgICAoMCwgbWlzY18xLnJlbW92ZUZvb3RlcikoKTtcclxuICAgICAgICAoMCwgdGltZXJfMS50aW1lcikoKTtcclxuICAgICAgICAoMCwgc3ByaW50XzEucnVuU3ByaW50KSgpO1xyXG4gICAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnN0YXRzUGFnZSA9IHZvaWQgMDtcclxuY29uc3QgbWlzY18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL21pc2NcIik7XHJcbmV4cG9ydHMuc3RhdHNQYWdlID0ge1xyXG4gICAgcmVuZGVyOiAoKSA9PiAoYFxyXG4gICAgPGgxPkhlbGxvIFN0YXRzIGJseWFkPC9oMT5cclxuICBgKSxcclxuICAgIGFmdGVyUmVuZGVyOiAoKSA9PiB7XHJcbiAgICAgICAgKDAsIG1pc2NfMS5hZGRGb290ZXIpKCk7XHJcbiAgICB9XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMucGFzc3dvcmRSZXZlYWwgPSBleHBvcnRzLnJvbGxHYW1lc1NlbGVjdG9yID0gZXhwb3J0cy5yb2xsU2VjdGlvblNlbGVjdG9yID0gZXhwb3J0cy5yb2xsUGFnZVNlbGVjdG9yID0gZXhwb3J0cy5yb2xsTWVudSA9IHZvaWQgMDtcclxuY29uc3Qgc3RvcmFnZV8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3N0b3JhZ2VcIik7XHJcbmZ1bmN0aW9uIHJvbGxNZW51KGFjdGlvbikge1xyXG4gICAgY29uc3Qgb3Blbk1lbnVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3Blbk1lbnVCdXR0b24nKTtcclxuICAgIGNvbnN0IG5hdmlnYXRpb25NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hdmlnYXRpb25NZW51Jyk7XHJcbiAgICBjb25zdCB1cHBlckJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cHBlckJhcicpO1xyXG4gICAgY29uc3QgbG9nb01haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9nb01haW4nKTtcclxuICAgIGlmIChhY3Rpb24gPT09ICdvcGVuJyAmJiAhc3RvcmFnZV8xLnN0b3JhZ2UuaXNNZW51T3Blbikge1xyXG4gICAgICAgIG9wZW5NZW51QnV0dG9uLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0xMDAlKSc7XHJcbiAgICAgICAgdXBwZXJCYXIuc3R5bGUud2lkdGggPSAnY2FsYygxMDB2dyAtIDI2MHB4KSc7XHJcbiAgICAgICAgbmF2aWdhdGlvbk1lbnUuc3R5bGUud2lkdGggPSAnMjYwcHgnO1xyXG4gICAgICAgIGxvZ29NYWluLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0xMjAlKSc7XHJcbiAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UuaXNNZW51T3BlbiA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBvcGVuTWVudUJ1dHRvbi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgwJSknO1xyXG4gICAgICAgIHVwcGVyQmFyLnN0eWxlLndpZHRoID0gJ2NhbGMoMTAwdncgLSA3MHB4KSc7XHJcbiAgICAgICAgbmF2aWdhdGlvbk1lbnUuc3R5bGUud2lkdGggPSAnNzBweCc7XHJcbiAgICAgICAgbG9nb01haW4uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoMCUpJztcclxuICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5pc01lbnVPcGVuID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5yb2xsTWVudSA9IHJvbGxNZW51O1xyXG5mdW5jdGlvbiByb2xsUGFnZVNlbGVjdG9yKGFjdGlvbikge1xyXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cmFwcGVyJyk7XHJcbiAgICBpZiAoIXN0b3JhZ2VfMS5zdG9yYWdlLmlzUGFnZUxpc3RPcGVuICYmIGFjdGlvbiA9PT0gJ29wZW4nKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZCgncGFnZUxpc3QnKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3JhZ2VfMS5zdG9yYWdlLnRvdGFsUGFnZXM7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQoJ3BhZ2VMaXN0T3B0aW9uJyk7XHJcbiAgICAgICAgICAgIG9wdGlvbi5pZCA9IGBwYWdlTGlzdE9wdGlvbi0ke2l9YDtcclxuICAgICAgICAgICAgb3B0aW9uLmlubmVyVGV4dCA9IGDQodGC0YDQsNC90LjRhtCwICR7aSArIDF9YDtcclxuICAgICAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByb290ID09PSBudWxsIHx8IHJvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJvb3QuYXBwZW5kQ2hpbGQobGlzdCk7XHJcbiAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UuaXNQYWdlTGlzdE9wZW4gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3RvcmFnZV8xLnN0b3JhZ2UuaXNQYWdlTGlzdE9wZW4pIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2VMaXN0Jyk7XHJcbiAgICAgICAgcm9vdCA9PT0gbnVsbCB8fCByb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiByb290LnJlbW92ZUNoaWxkKGxpc3QpO1xyXG4gICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmlzUGFnZUxpc3RPcGVuID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5yb2xsUGFnZVNlbGVjdG9yID0gcm9sbFBhZ2VTZWxlY3RvcjtcclxuZnVuY3Rpb24gcm9sbFNlY3Rpb25TZWxlY3RvcihhY3Rpb24pIHtcclxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpO1xyXG4gICAgaWYgKCFzdG9yYWdlXzEuc3RvcmFnZS5pc0dyb3VwTGlzdE9wZW4gJiYgYWN0aW9uID09PSAnb3BlbicpIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uTGlzdCcpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcmFnZV8xLnN0b3JhZ2UudG90YWxHcm91cHM7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb25MaXN0T3B0aW9uJyk7XHJcbiAgICAgICAgICAgIG9wdGlvbi5pZCA9IGBzZWN0aW9uTGlzdE9wdGlvbi0ke2l9YDtcclxuICAgICAgICAgICAgb3B0aW9uLmlubmVyVGV4dCA9IGDQoNCw0LfQtNC10LsgJHtpICsgMX1gO1xyXG4gICAgICAgICAgICBsaXN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmlzR3JvdXBMaXN0T3BlbiA9IHRydWU7XHJcbiAgICAgICAgcm9vdCA9PT0gbnVsbCB8fCByb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiByb290LmFwcGVuZENoaWxkKGxpc3QpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3RvcmFnZV8xLnN0b3JhZ2UuaXNHcm91cExpc3RPcGVuKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uTGlzdCcpO1xyXG4gICAgICAgIHJvb3QgPT09IG51bGwgfHwgcm9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcm9vdC5yZW1vdmVDaGlsZChsaXN0KTtcclxuICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5pc0dyb3VwTGlzdE9wZW4gPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnJvbGxTZWN0aW9uU2VsZWN0b3IgPSByb2xsU2VjdGlvblNlbGVjdG9yO1xyXG5mdW5jdGlvbiByb2xsR2FtZXNTZWxlY3RvcihhY3Rpb24pIHtcclxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpO1xyXG4gICAgaWYgKCFzdG9yYWdlXzEuc3RvcmFnZS5pc0dhbWVzTGlzdE9wZW4gJiYgYWN0aW9uID09PSAnb3BlbicpIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKCdnYW1lc0xpc3QnKTtcclxuICAgICAgICBsZXQgR2FtZXNSVTtcclxuICAgICAgICAoZnVuY3Rpb24gKEdhbWVzUlUpIHtcclxuICAgICAgICAgICAgR2FtZXNSVVtHYW1lc1JVW1wiXFx1MDQxMFxcdTA0NDNcXHUwNDM0XFx1MDQzOFxcdTA0M0VcIl0gPSAwXSA9IFwiXFx1MDQxMFxcdTA0NDNcXHUwNDM0XFx1MDQzOFxcdTA0M0VcIjtcclxuICAgICAgICAgICAgR2FtZXNSVVtHYW1lc1JVW1wiXFx1MDQyMVxcdTA0M0ZcXHUwNDQwXFx1MDQzOFxcdTA0M0RcXHUwNDQyXCJdID0gMV0gPSBcIlxcdTA0MjFcXHUwNDNGXFx1MDQ0MFxcdTA0MzhcXHUwNDNEXFx1MDQ0MlwiO1xyXG4gICAgICAgICAgICBHYW1lc1JVW0dhbWVzUlVbXCJcXHUwNDIxXFx1MDQzRFxcdTA0MzBcXHUwNDM5XFx1MDQzRlxcdTA0MzVcXHUwNDQwXCJdID0gMl0gPSBcIlxcdTA0MjFcXHUwNDNEXFx1MDQzMFxcdTA0MzlcXHUwNDNGXFx1MDQzNVxcdTA0NDBcIjtcclxuICAgICAgICAgICAgR2FtZXNSVVtHYW1lc1JVW1wiXFx1MDQxRlxcdTA0MzBcXHUwNDM3XFx1MDQzQlwiXSA9IDNdID0gXCJcXHUwNDFGXFx1MDQzMFxcdTA0MzdcXHUwNDNCXCI7XHJcbiAgICAgICAgfSkoR2FtZXNSVSB8fCAoR2FtZXNSVSA9IHt9KSk7XHJcbiAgICAgICAgbGV0IEdhbWVzO1xyXG4gICAgICAgIChmdW5jdGlvbiAoR2FtZXMpIHtcclxuICAgICAgICAgICAgR2FtZXNbR2FtZXNbXCJhdWRpb1wiXSA9IDBdID0gXCJhdWRpb1wiO1xyXG4gICAgICAgICAgICBHYW1lc1tHYW1lc1tcInNwcmludFwiXSA9IDFdID0gXCJzcHJpbnRcIjtcclxuICAgICAgICAgICAgR2FtZXNbR2FtZXNbXCJzbmlwZXJcIl0gPSAyXSA9IFwic25pcGVyXCI7XHJcbiAgICAgICAgICAgIEdhbWVzW0dhbWVzW1wicHV6emxlXCJdID0gM10gPSBcInB1enpsZVwiO1xyXG4gICAgICAgIH0pKEdhbWVzIHx8IChHYW1lcyA9IHt9KSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yYWdlXzEuc3RvcmFnZS50b3RhbEdhbWVzOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIG9wdGlvbi5jbGFzc0xpc3QuYWRkKCdnYW1lc0xpc3RPcHRpb24nKTtcclxuICAgICAgICAgICAgb3B0aW9uLmlkID0gYGdhbWVzTGlzdE9wdGlvbi0ke0dhbWVzW2ldfWA7XHJcbiAgICAgICAgICAgIG9wdGlvbi5pbm5lclRleHQgPSBgJHtHYW1lc1JVW2ldfWA7XHJcbiAgICAgICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UuaXNHYW1lc0xpc3RPcGVuID0gdHJ1ZTtcclxuICAgICAgICByb290ID09PSBudWxsIHx8IHJvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJvb3QuYXBwZW5kQ2hpbGQobGlzdCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzdG9yYWdlXzEuc3RvcmFnZS5pc0dhbWVzTGlzdE9wZW4pIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVzTGlzdCcpO1xyXG4gICAgICAgIHJvb3QgPT09IG51bGwgfHwgcm9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcm9vdC5yZW1vdmVDaGlsZChsaXN0KTtcclxuICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5pc0dhbWVzTGlzdE9wZW4gPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnJvbGxHYW1lc1NlbGVjdG9yID0gcm9sbEdhbWVzU2VsZWN0b3I7XHJcbmZ1bmN0aW9uIHBhc3N3b3JkUmV2ZWFsKCkge1xyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bhc3N3b3JkUmV2ZWFsJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXNzd29yZCcpO1xyXG4gICAgaWYgKGlucHV0LnR5cGUgPT09ICdwYXNzd29yZCcpIHtcclxuICAgICAgICBpbnB1dC50eXBlID0gJ3RleHQnO1xyXG4gICAgICAgIGJ1dHRvbi5zcmMgPSAnYXNzZXRzL3N2Zy9leWUtc2hvdy5zdmcnO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaW5wdXQudHlwZSA9ICdwYXNzd29yZCc7XHJcbiAgICAgICAgYnV0dG9uLnNyYyA9ICdhc3NldHMvc3ZnL2V5ZS1oaWRlLnN2Zyc7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5wYXNzd29yZFJldmVhbCA9IHBhc3N3b3JkUmV2ZWFsO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMucm91dGVyID0gdm9pZCAwO1xyXG5jb25zdCBob21lUGFnZV8xID0gcmVxdWlyZShcIi4vcGFnZXMvaG9tZVBhZ2VcIik7XHJcbmNvbnN0IGJvb2tQYWdlXzEgPSByZXF1aXJlKFwiLi9wYWdlcy9ib29rUGFnZVwiKTtcclxuY29uc3QgaGlzdG9yeVBhZ2VfMSA9IHJlcXVpcmUoXCIuL3BhZ2VzL2hpc3RvcnlQYWdlXCIpO1xyXG5jb25zdCBnYW1lc1BhZ2VfMSA9IHJlcXVpcmUoXCIuL3BhZ2VzL2dhbWVzUGFnZVwiKTtcclxuY29uc3Qgc3RhdHNQYWdlXzEgPSByZXF1aXJlKFwiLi9wYWdlcy9zdGF0c1BhZ2VcIik7XHJcbmNvbnN0IGRldlBhZ2VfMSA9IHJlcXVpcmUoXCIuL3BhZ2VzL2RldlBhZ2VcIik7XHJcbmNvbnN0IGNvbW1lbnRzUGFnZV8xID0gcmVxdWlyZShcIi4vcGFnZXMvY29tbWVudHNQYWdlXCIpO1xyXG5jb25zdCBhdWRpb0NoYWxsZW5nZVBhZ2VfMSA9IHJlcXVpcmUoXCIuL3BhZ2VzL2F1ZGlvQ2hhbGxlbmdlUGFnZVwiKTtcclxuY29uc3Qgc3RvcmFnZV8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3N0b3JhZ2VcIik7XHJcbmNvbnN0IHNwcmludFBhZ2VfMSA9IHJlcXVpcmUoXCIuL3BhZ2VzL3NwcmludFBhZ2VcIik7XHJcbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudCcpO1xyXG5jb25zdCBwYWdlcyA9IHtcclxuICAgIGhvbWU6IGhvbWVQYWdlXzEuaG9tZVBhZ2UsXHJcbiAgICBib29rOiBib29rUGFnZV8xLmJvb2tQYWdlLFxyXG4gICAgaGlzdG9yeTogaGlzdG9yeVBhZ2VfMS5oaXN0b3J5UGFnZSxcclxuICAgIGdhbWVzOiBnYW1lc1BhZ2VfMS5nYW1lc1BhZ2UsXHJcbiAgICBzdGF0czogc3RhdHNQYWdlXzEuc3RhdHNQYWdlLFxyXG4gICAgZGV2OiBkZXZQYWdlXzEuZGV2UGFnZSxcclxuICAgIGNvbW1lbnRzOiBjb21tZW50c1BhZ2VfMS5jb21tZW50c1BhZ2UsXHJcbiAgICBhdWRpbzogYXVkaW9DaGFsbGVuZ2VQYWdlXzEuYXVkaW9DaGFsbGVuZ2VQYWdlLFxyXG4gICAgc3ByaW50OiBzcHJpbnRQYWdlXzEuc3ByaW50UGFnZVxyXG59O1xyXG5jb25zdCBnZXRQYWdlRnJvbU5hbWUgPSAocGFnZU5hbWUpID0+IHBhZ2VzW3BhZ2VOYW1lXSB8fCBudWxsO1xyXG5jb25zdCByb3V0ZXIgPSAocGFnZU5hbWUsIGluc3RydWN0aW9uKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIGxldCBwYWdlID0gZ2V0UGFnZUZyb21OYW1lKHBhZ2VOYW1lKTtcclxuICAgIGluc3RydWN0aW9uID8gc3RvcmFnZV8xLnN0b3JhZ2Uub25seU9uZVBhZ2UgPSB0cnVlIDogc3RvcmFnZV8xLnN0b3JhZ2Uub25seU9uZVBhZ2UgPSBmYWxzZTtcclxuICAgIGlmIChwYWdlICYmIHJvb3QpIHtcclxuICAgICAgICByb290LmlubmVySFRNTCA9IHlpZWxkIHBhZ2UucmVuZGVyKCk7XHJcbiAgICAgICAgaWYgKHBhZ2UuYWZ0ZXJSZW5kZXIpIHtcclxuICAgICAgICAgICAgcGFnZS5hZnRlclJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbmV4cG9ydHMucm91dGVyID0gcm91dGVyO1xyXG5mdW5jdGlvbiBhZGRpdGlvbmFsRXZlbnQoKSB7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmhhbmRsZUxvZ2luID0gZXhwb3J0cy5yZWdpc3RlciA9IGV4cG9ydHMucmVnaXN0ZXJVc2VyID0gZXhwb3J0cy5hdXRob3JpemUgPSBleHBvcnRzLmdldEFsbFdvcmRzID0gZXhwb3J0cy5nZXRXb3JkcyA9IGV4cG9ydHMuZmlsZXNVcmwgPSB2b2lkIDA7XHJcbmNvbnN0IHJvdXRlcl8xID0gcmVxdWlyZShcIi4uL25hdmlnYXRpb24vcm91dGVyXCIpO1xyXG5jb25zdCBzbGlkZXJfMSA9IHJlcXVpcmUoXCIuL3NsaWRlclwiKTtcclxuY29uc3Qgc3RvcmFnZV8xID0gcmVxdWlyZShcIi4vc3RvcmFnZVwiKTtcclxuY29uc3QgYmFzZVVSTCA9ICdodHRwczovL3JzLWxhbmctcmVkYmxvb2RlZC5oZXJva3VhcHAuY29tJztcclxuZXhwb3J0cy5maWxlc1VybCA9ICdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vdmxhZGltaXJwYXJtb24vcmVhY3QtcnNsYW5nLWJlL21hc3Rlcic7XHJcbmNvbnN0IHdvcmRzID0gYCR7YmFzZVVSTH0vd29yZHNgO1xyXG5jb25zdCB1c2VycyA9IGAke2Jhc2VVUkx9L3VzZXJzYDtcclxuY29uc3Qgc2lnbkluID0gYCR7YmFzZVVSTH0vc2lnbmluYDtcclxuY29uc3QgZ2V0V29yZHMgPSAoZ3JvdXAsIHBhZ2UpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgJHt3b3Jkc30/Z3JvdXA9JHtncm91cH0mcGFnZT0ke3BhZ2V9YCk7XHJcbiAgICByZXR1cm4geWllbGQgcmVzcG9uc2UuanNvbigpO1xyXG59KTtcclxuZXhwb3J0cy5nZXRXb3JkcyA9IGdldFdvcmRzO1xyXG5jb25zdCBnZXRBbGxXb3JkcyA9IChncm91cCwgc2luZ2xlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgIGlmICghc2luZ2xlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yYWdlXzEuc3RvcmFnZS50b3RhbFBhZ2VzOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgaW5mbyA9IHlpZWxkICgwLCBleHBvcnRzLmdldFdvcmRzKShncm91cCwgaSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSBpbmZvLm1hcCgoZWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGVsLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmQ6IGVsLndvcmQsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlOiBlbC53b3JkVHJhbnNsYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1ZGlvOiBlbC5hdWRpbyxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogZWwuaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNjcmlwdGlvbjogZWwudHJhbnNjcmlwdGlvblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKC4uLnBhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGluZm8gPSB5aWVsZCAoMCwgZXhwb3J0cy5nZXRXb3JkcykoZ3JvdXAsIHN0b3JhZ2VfMS5zdG9yYWdlLmJvb2tQYWdlKTtcclxuICAgICAgICBjb25zdCBwYWdlID0gaW5mby5tYXAoKGVsKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpZDogZWwuaWQsXHJcbiAgICAgICAgICAgICAgICB3b3JkOiBlbC53b3JkLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlOiBlbC53b3JkVHJhbnNsYXRlLFxyXG4gICAgICAgICAgICAgICAgYXVkaW86IGVsLmF1ZGlvLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IGVsLmltYWdlLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNjcmlwdGlvbjogZWwudHJhbnNjcmlwdGlvblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKC4uLnBhZ2UpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufSk7XHJcbmV4cG9ydHMuZ2V0QWxsV29yZHMgPSBnZXRBbGxXb3JkcztcclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ly9cclxuY29uc3QgbG9naW5Vc2VyID0gKHVzZXIpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgY29uc3QgaW5mbyA9IHlpZWxkIGZldGNoKHNpZ25Jbiwge1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlcilcclxuICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmVzcG9uc2UudGV4dCgpLnRoZW4odGV4dCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5zbGljZSgwLCAxKSA9PT0gJ0MnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYNCd0LXQstC10YDQvdC+0LUg0LjQvNGPINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj2ApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9Cd0LXQstC10YDQvdGL0Lkg0L/QsNGA0L7Qu9GMJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygn0J3QtdGCINGB0L7QtdC00LjQvdC10L3QuNGPINGBINC40L3RgtC10YDQvdC10YLQvtC8INC40LvQuCDRgdC10YDQstC10YAg0L3QtSDQvtGC0LLQtdGH0LDQtdGCJyk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbmZvO1xyXG59KTtcclxuZnVuY3Rpb24gYXV0aG9yaXplKG1haWwsIHBhc3N3b3JkKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGxldCBpbmZvO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGluZm8gPSB5aWVsZCBsb2dpblVzZXIoeyBcImVtYWlsXCI6IG1haWwsIFwicGFzc3dvcmRcIjogcGFzc3dvcmQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICBpZiAoaW5mbykge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UuaXNBdXRob3JpemVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLnVzZXJJZCA9IGluZm8udXNlcklkO1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UudG9rZW4gPSBpbmZvLnRva2VuO1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZV8xLnN0b3JhZ2UudXNlck5hbWUgPSBpbmZvLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBncmVldGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNncmVldGluZycpO1xyXG4gICAgICAgICAgICAgICAgZ3JlZXRpbmcuaW5uZXJIVE1MID0gYNCf0YDQuNCy0LXRgiwgJHtzdG9yYWdlXzEuc3RvcmFnZS51c2VyTmFtZX1gO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9nb3V0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2F1dGgnKTtcclxuICAgICAgICAgICAgICAgIGxvZ291dEJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKC4uL2Fzc2V0cy9zdmcvbG9nb3V0LnN2ZyknO1xyXG4gICAgICAgICAgICAgICAgbG9nb3V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmlzQXV0aG9yaXplZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ291dEJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKC4uL2Fzc2V0cy9zdmcvcGVyc29uLnN2ZyknO1xyXG4gICAgICAgICAgICAgICAgICAgICgwLCByb3V0ZXJfMS5yb3V0ZXIpKCdob21lJyk7XHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25jZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAoMCwgc2xpZGVyXzEuc2xpZGVyKSgnY29tbWFuZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5hdXRob3JpemUgPSBhdXRob3JpemU7XHJcbmZ1bmN0aW9uIHJlZ2lzdGVyVXNlcih1c2VyKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IGluZm8gPSB5aWVsZCBmZXRjaCh1c2Vycywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlcilcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQxNykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9Cf0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDRgSDRgtCw0LrQuNC8INCw0LTRgNC10YHQvtC8INGN0LsuINC/0L7Rh9GC0Ysg0YPQttC1INGB0YPRidC10YHRgtCy0YPQtdGCJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS50ZXh0KCkudGhlbih0ZXh0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dC5zZWFyY2goL21haWwvKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21haWwgaXMgaHVpbnlhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0LnNlYXJjaCgvbmFtZS8pICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbmFtZSBpcyBodWlueWEnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHQuc2VhcmNoKC9wYXNzd29yZC8pICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGFzc3dvcmQgaXMgaHVpbnlhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn0J3QtdGCINGB0L7QtdC00LjQvdC10L3QuNGPINGBINC40L3RgtC10YDQvdC10YLQvtC8INC40LvQuCDRgdC10YDQstC10YAg0L3QtSDQvtGC0LLQtdGH0LDQtdGCJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGluZm87XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLnJlZ2lzdGVyVXNlciA9IHJlZ2lzdGVyVXNlcjtcclxuZnVuY3Rpb24gcmVnaXN0ZXIobmFtZSwgbWFpbCwgcGFzc3dvcmQpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgbGV0IGluZm87XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaW5mbyA9IHlpZWxkIHJlZ2lzdGVyVXNlcih7IFwibmFtZVwiOiBuYW1lLCBcImVtYWlsXCI6IG1haWwsIFwicGFzc3dvcmRcIjogcGFzc3dvcmQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICBpZiAoaW5mbykge1xyXG4gICAgICAgICAgICAgICAgYXV0aG9yaXplKG1haWwsIHBhc3N3b3JkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMucmVnaXN0ZXIgPSByZWdpc3RlcjtcclxuLy9jcmVhdGVVc2VyKHsgXCJlbWFpbFwiOiBcImhlbGxvQHVzZXIuY29tXCIsIFwicGFzc3dvcmRcIjogXCJHZmhqa21fMTIzXCIgfSk7XHJcbmNvbnN0IGRlbGV0ZVVzZXIgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIGNvbnN0IHJhd1Jlc3BvbnNlID0geWllbGQgZmV0Y2goYGh0dHBzOi8vcnMtbGFuZy1yZWRibG9vZGVkLmhlcm9rdWFwcC5jb20vdXNlcnMvJHtzdG9yYWdlXzEuc3RvcmFnZS51c2VySWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtzdG9yYWdlXzEuc3RvcmFnZS50b2tlbn1gLFxyXG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG59KTtcclxuZnVuY3Rpb24gaGFuZGxlTG9naW4oYWN0aW9uKSB7XHJcbiAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmFtZScpO1xyXG4gICAgY29uc3QgbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haWwnKTtcclxuICAgIGNvbnN0IHBhc3N3b3JkSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc3dvcmQnKTtcclxuICAgIGNvbnN0IG5hbWUgPSBuYW1lSW5wdXQudmFsdWU7XHJcbiAgICBjb25zdCBtYWlsID0gbWFpbElucHV0LnZhbHVlO1xyXG4gICAgY29uc3QgcGFzc3dvcmQgPSBwYXNzd29yZElucHV0LnZhbHVlO1xyXG4gICAgaWYgKGFjdGlvbiA9PT0gJ2xvZ2luJykge1xyXG4gICAgICAgIGF1dGhvcml6ZShtYWlsLCBwYXNzd29yZCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZWdpc3RlcihuYW1lLCBtYWlsLCBwYXNzd29yZCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5oYW5kbGVMb2dpbiA9IGhhbmRsZUxvZ2luO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmNoZWNrQ2hvaWNlID0gZXhwb3J0cy5jaGVja0tleXMgPSB2b2lkIDA7XHJcbmNvbnN0IHN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuL3N0b3JhZ2VcIik7XHJcbmNvbnN0IGF1ZGlvQ2hhbGxlbmdlXzEgPSByZXF1aXJlKFwiLi4vZ2FtZXMvYXVkaW9DaGFsbGVuZ2VcIik7XHJcbmNvbnN0IG1pc2NfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9taXNjXCIpO1xyXG5mdW5jdGlvbiBjaGVja0tleXMoY29kZSkge1xyXG4gICAgY29uc3Qgd3JhcHBlckdhbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXJHYW1lcycpO1xyXG4gICAgY29uc3QgaW5kZXggPSArY29kZS5zbGljZSgtMSkgLSAxO1xyXG4gICAgaWYgKHdyYXBwZXJHYW1lcyAmJiBpbmRleCA8IDUpIHtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBtaXNjXzEuY2hlY2tGb3IpO1xyXG4gICAgICAgIGNoZWNrQ2hvaWNlKHN0b3JhZ2VfMS5zdG9yYWdlLmN1cnJlbnRPcHRpb25zW2luZGV4XSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5jaGVja0tleXMgPSBjaGVja0tleXM7XHJcbmZ1bmN0aW9uIGNoZWNrQ2hvaWNlKGlkKSB7XHJcbiAgICBjb25zdCBidXR0b25QcmVzc2VkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2F1ZGlvR2FtZU9wdGlvbi0ke2lkfWApO1xyXG4gICAgY29uc3QgYXVkaW9CaXRlID0gbmV3IEF1ZGlvO1xyXG4gICAgaWYgKGlkID09PSBzdG9yYWdlXzEuc3RvcmFnZS5yaWdodEFuc3dlci5pZCkge1xyXG4gICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmVuZEdhbWVSZXN1bHRzLnJpZ2h0LnB1c2goc3RvcmFnZV8xLnN0b3JhZ2UucmlnaHRBbnN3ZXIpO1xyXG4gICAgICAgIGF1ZGlvQml0ZS5zcmMgPSAnLi9hc3NldHMvc291bmRzL3JpZ2h0QW5zd2VyLm1wMyc7XHJcbiAgICAgICAgYnV0dG9uUHJlc3NlZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAndmFyKC0tdHJpbzMpJztcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmVuZEdhbWVSZXN1bHRzLndyb25nLnB1c2goc3RvcmFnZV8xLnN0b3JhZ2UucmlnaHRBbnN3ZXIpO1xyXG4gICAgICAgIGF1ZGlvQml0ZS5zcmMgPSAnLi9hc3NldHMvc291bmRzL3dyb25nQW5zd2VyLm1wMyc7XHJcbiAgICAgICAgYnV0dG9uUHJlc3NlZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAndmFyKC0td3JvbmcpJztcclxuICAgIH1cclxuICAgIGF1ZGlvQml0ZS5wbGF5KCk7XHJcbiAgICBpZiAoaWQpXHJcbiAgICAgICAgKDAsIGF1ZGlvQ2hhbGxlbmdlXzEucnVuQXVkaW9BbmltYXRpb24pKGlkKTtcclxufVxyXG5leHBvcnRzLmNoZWNrQ2hvaWNlID0gY2hlY2tDaG9pY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZW5kR2FtZSA9IHZvaWQgMDtcclxuY29uc3Qgc3RvcmFnZV8xID0gcmVxdWlyZShcIi4vc3RvcmFnZVwiKTtcclxuY29uc3QgZ2V0RGF0YV8xID0gcmVxdWlyZShcIi4uL2dhbWVzL2dldERhdGFcIik7XHJcbmNvbnN0IHRpbWVyXzEgPSByZXF1aXJlKFwiLi90aW1lclwiKTtcclxuY29uc3Qgc3ByaW50XzEgPSByZXF1aXJlKFwiLi4vZ2FtZXMvc3ByaW50XCIpO1xyXG5jb25zdCBhdWRpb0NoYWxsZW5nZV8xID0gcmVxdWlyZShcIi4uL2dhbWVzL2F1ZGlvQ2hhbGxlbmdlXCIpO1xyXG5mdW5jdGlvbiBlbmRHYW1lKCkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cmFwcGVyR2FtZXMnKTtcclxuICAgIGlmIChyb290KSB7XHJcbiAgICAgICAgY29uc3Qgc291bmRCaXRlID0gbmV3IEF1ZGlvO1xyXG4gICAgICAgIHNvdW5kQml0ZS5zcmMgPSAnYXNzZXRzL3NvdW5kcy9yb3VuZEVuZGVkLm1wMyc7XHJcbiAgICAgICAgc291bmRCaXRlLnBsYXkoKTtcclxuICAgICAgICBpZiAoc3RvcmFnZV8xLnN0b3JhZ2Uub25seU9uZVBhZ2UpIHtcclxuICAgICAgICAgICAgKDAsIGdldERhdGFfMS5nZXRTaW5nbGVQYWdlRGF0YSkoKTtcclxuICAgICAgICAgICAgaWYgKHN0b3JhZ2VfMS5zdG9yYWdlLnNlY29uZHNJbnRlcnZhbClcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc3RvcmFnZV8xLnN0b3JhZ2Uuc2Vjb25kc0ludGVydmFsKTtcclxuICAgICAgICAgICAgaWYgKHN0b3JhZ2VfMS5zdG9yYWdlLm1zSW50ZXJ2YWwpXHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHN0b3JhZ2VfMS5zdG9yYWdlLm1zSW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICA7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0c1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICByZXN1bHRzV3JhcHBlci5pZCA9ICdyZXN1bHRzV3JhcHBlcic7XHJcbiAgICAgICAgKF9hID0gc3RvcmFnZV8xLnN0b3JhZ2UuYWJvcnRDb250cm9sbGVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWJvcnQoKTtcclxuICAgICAgICBjb25zdCB0aGVJZCA9IGAjd3JhcHBlciR7c3RvcmFnZV8xLnN0b3JhZ2UuY3VycmVudEdhbWVNb2RlfWA7XHJcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhlSWQpO1xyXG4gICAgICAgIHdyYXBwZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxuICAgICAgICB3cmFwcGVyLnN0eWxlLm9wYWNpdHkgPSAnMC41JztcclxuICAgICAgICBjb25zdCByZXN1bHRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgcmVzdWx0cy5pZCA9ICdyZXN1bHRzJztcclxuICAgICAgICBjb25zdCByaWdodE9uZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb25zdCB3cm9uZ09uZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb25zdCBzcGFuUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICAgICAgY29uc3Qgc3BhblcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gICAgICAgIHNwYW5SLnRleHRDb250ZW50ID0gJ9Cf0YDQsNCy0LjQu9GM0L3Ri9C1INC+0YLQstC10YLRizonO1xyXG4gICAgICAgIHNwYW5XLnRleHRDb250ZW50ID0gJ9Cd0LXQv9GA0LDQstC40LvRjNC90YvQtSDQvtGC0LLQtdGC0Ys6JztcclxuICAgICAgICByaWdodE9uZXMuYXBwZW5kQ2hpbGQoc3BhblIpO1xyXG4gICAgICAgIHdyb25nT25lcy5hcHBlbmRDaGlsZChzcGFuVyk7XHJcbiAgICAgICAgaWYgKHN0b3JhZ2VfMS5zdG9yYWdlLmVuZEdhbWVSZXN1bHRzLnJpZ2h0Lmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5lbmRHYW1lUmVzdWx0cy5yaWdodC5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHRzT3B0aW9uXCI+XHJcbiAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9zdmcvc291bmQuc3ZnXCIgYWx0PVwiYXVkaW9cIiBpZD1cInBsYXlTb3VuZC0ke2VsLmF1ZGlvfVwiPlxyXG4gICAgICAgICAgPHNwYW4+PGI+JHtlbC53b3JkfTwvYj4g4oCTICR7ZWwudHJhbnNsYXRlfTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRPbmVzLmlubmVySFRNTCArPSBvcHRpb247XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmlnaHRPbmVzLmlubmVySFRNTCArPSAn0J3QtdGCINC/0YDQsNCy0LjQu9GM0L3Ri9GFINC+0YLQstC10YLQvtCyIDooJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0b3JhZ2VfMS5zdG9yYWdlLmVuZEdhbWVSZXN1bHRzLndyb25nLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5lbmRHYW1lUmVzdWx0cy53cm9uZy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHRzT3B0aW9uXCI+XHJcbiAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9zdmcvc291bmQuc3ZnXCIgYWx0PVwiYXVkaW9cIiBpZD1cInBsYXlTb3VuZC0ke2VsLmF1ZGlvfVwiPlxyXG4gICAgICAgICAgPHNwYW4+PGI+JHtlbC53b3JkfTwvYj4g4oCTICR7ZWwudHJhbnNsYXRlfTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgd3JvbmdPbmVzLmlubmVySFRNTCArPSBvcHRpb247XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgd3JvbmdPbmVzLmlubmVySFRNTCArPSAn0J3QtdGCINC90LXQv9GA0LDQstC40LvRjNC90YvRhSDQvtGC0LLQtdGC0L7QsiEnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHRzID09PSBudWxsIHx8IHJlc3VsdHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc3VsdHMuYXBwZW5kQ2hpbGQocmlnaHRPbmVzKTtcclxuICAgICAgICByZXN1bHRzID09PSBudWxsIHx8IHJlc3VsdHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc3VsdHMuYXBwZW5kQ2hpbGQod3JvbmdPbmVzKTtcclxuICAgICAgICBjb25zdCBwbGF5QWdhaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBwbGF5QWdhaW4uaWQgPSAncmVzdWx0c1BsYXlBZ2Fpbic7XHJcbiAgICAgICAgcGxheUFnYWluLnRleHRDb250ZW50ID0gJ9CY0LPRgNCw0YLRjCDRgdC90L7QstCwJztcclxuICAgICAgICBwbGF5QWdhaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJvb3QgPT09IG51bGwgfHwgcm9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcm9vdC5yZW1vdmVDaGlsZChyZXN1bHRzV3JhcHBlcik7XHJcbiAgICAgICAgICAgIHdyYXBwZXIuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgd3JhcHBlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2FsbCc7XHJcbiAgICAgICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmVuZEdhbWVSZXN1bHRzLnJpZ2h0ID0gW107XHJcbiAgICAgICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmVuZEdhbWVSZXN1bHRzLndyb25nID0gW107XHJcbiAgICAgICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLm9ubHlPbmVQYWdlID8gKDAsIGdldERhdGFfMS5nZXRTaW5nbGVQYWdlRGF0YSkoKSA6ICgwLCBnZXREYXRhXzEuZ2V0RGF0YSkoKTtcclxuICAgICAgICAgICAgc3dpdGNoIChzdG9yYWdlXzEuc3RvcmFnZS5jdXJyZW50R2FtZU1vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ0F1ZGlvR2FtZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgKDAsIGF1ZGlvQ2hhbGxlbmdlXzEucnVuQXVkaW9HYW1lKSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnU3ByaW50JzpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgwLCB0aW1lcl8xLnRpbWVyKSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoMCwgc3ByaW50XzEucnVuU3ByaW50KSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vIGNhc2UgJ1B1enpsZSc6IHJ1blB1enpsZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyBjYXNlICdTbmlwZXInOiBydW5TbmlwZXIoKTtcclxuICAgICAgICAgICAgICAgIC8vIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBvbmNlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVzdWx0c1dyYXBwZXIuYXBwZW5kQ2hpbGQocmVzdWx0cyk7XHJcbiAgICAgICAgcmVzdWx0c1dyYXBwZXIuYXBwZW5kQ2hpbGQocGxheUFnYWluKTtcclxuICAgICAgICByb290ID09PSBudWxsIHx8IHJvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJvb3QuYXBwZW5kQ2hpbGQocmVzdWx0c1dyYXBwZXIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZW5kR2FtZSA9IGVuZEdhbWU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuaGlkZUxvYWRlciA9IGV4cG9ydHMuc2hvd0xvYWRlciA9IHZvaWQgMDtcclxuZnVuY3Rpb24gc2hvd0xvYWRlcigpIHtcclxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgICBjb25zdCBsb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGxvYWRlci5jbGFzc0xpc3QuYWRkKCdsb2FkZXInKTtcclxuICAgIHJvb3QgPT09IG51bGwgfHwgcm9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcm9vdC5hcHBlbmRDaGlsZChsb2FkZXIpO1xyXG59XHJcbmV4cG9ydHMuc2hvd0xvYWRlciA9IHNob3dMb2FkZXI7XHJcbmZ1bmN0aW9uIGhpZGVMb2FkZXIoKSB7XHJcbiAgICBjb25zdCByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gICAgY29uc3QgbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRlcicpO1xyXG4gICAgcm9vdCA9PT0gbnVsbCB8fCByb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiByb290LnJlbW92ZUNoaWxkKGxvYWRlcik7XHJcbn1cclxuZXhwb3J0cy5oaWRlTG9hZGVyID0gaGlkZUxvYWRlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5yZW1vdmVGb290ZXIgPSBleHBvcnRzLmFkZEZvb3RlciA9IGV4cG9ydHMuY2hlY2tGb3IgPSBleHBvcnRzLnNodWZmbGUgPSBleHBvcnRzLmNhcGl0YWxpemUgPSBleHBvcnRzLmdldFJhbmRvbUludCA9IHZvaWQgMDtcclxuY29uc3QgY2hlY2tzXzEgPSByZXF1aXJlKFwiLi9jaGVja3NcIik7XHJcbmZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xyXG4gICAgbWluID0gTWF0aC5jZWlsKG1pbik7XHJcbiAgICBtYXggPSBNYXRoLmZsb29yKG1heCk7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcclxufVxyXG5leHBvcnRzLmdldFJhbmRvbUludCA9IGdldFJhbmRvbUludDtcclxuZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHJpbmdbMF0udG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxufVxyXG5leHBvcnRzLmNhcGl0YWxpemUgPSBjYXBpdGFsaXplO1xyXG5mdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XHJcbiAgICBmb3IgKGxldCBpID0gYXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgIGxldCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XHJcbiAgICAgICAgW2FycmF5W2ldLCBhcnJheVtqXV0gPSBbYXJyYXlbal0sIGFycmF5W2ldXTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJheTtcclxufVxyXG5leHBvcnRzLnNodWZmbGUgPSBzaHVmZmxlO1xyXG5mdW5jdGlvbiBjaGVja0ZvcihlbCkge1xyXG4gICAgKDAsIGNoZWNrc18xLmNoZWNrS2V5cykoZWwuY29kZSk7XHJcbn1cclxuZXhwb3J0cy5jaGVja0ZvciA9IGNoZWNrRm9yO1xyXG5mdW5jdGlvbiBhZGRGb290ZXIoKSB7XHJcbiAgICBjb25zdCByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gICAgY29uc3QgZXhpc3RpbmdGb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXInKTtcclxuICAgIGlmICghZXhpc3RpbmdGb290ZXIgJiYgcm9vdCkge1xyXG4gICAgICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xyXG4gICAgICAgIGZvb3Rlci5pbm5lckhUTUwgPSBgXHJcbiAgICAgIDxzcGFuIG9uY2xpY2s9XCJ3aW5kb3cub3BlbignaHR0cHM6Ly9ydS53aWtpcGVkaWEub3JnL3dpa2kvMjAyMl8lRDAlQjMlRDAlQkUlRDAlQjQnLCdteXdpbmRvdycpXCI+MjAyMjwvc3Bhbj4gXHJcbiAgICAgIDxzcGFuIG9uY2xpY2s9XCJ3aW5kb3cub3BlbignaHR0cHM6Ly9naXRodWIuY29tL1ZsYWRpbWlyUGFybW9uJywnbXl3aW5kb3cnKVwiPlZsYWRpbWlyIFBhcm1vbjwvc3Bhbj5cclxuICAgICAgPGltZyBvbmNsaWNrPVwid2luZG93Lm9wZW4oJ2h0dHBzOi8vcnMuc2Nob29sL2pzLycsJ215d2luZG93JylcIiBzcmM9XCJhc3NldHMvc3ZnL3JzX3NjaG9vbF9qcy5zdmdcIiBhbHQ9XCJyc1NjaG9vbFwiPlxyXG4gICAgYDtcclxuICAgICAgICByb290LmFwcGVuZENoaWxkKGZvb3Rlcik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5hZGRGb290ZXIgPSBhZGRGb290ZXI7XHJcbmZ1bmN0aW9uIHJlbW92ZUZvb3RlcigpIHtcclxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXInKTtcclxuICAgIGlmIChyb290ICYmIGZvb3RlcilcclxuICAgICAgICByb290LnJlbW92ZUNoaWxkKGZvb3Rlcik7XHJcbn1cclxuZXhwb3J0cy5yZW1vdmVGb290ZXIgPSByZW1vdmVGb290ZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMucGxheVNvdW5kID0gdm9pZCAwO1xyXG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcclxuZnVuY3Rpb24gcGxheVNvdW5kKGFkZHJlc3MpIHtcclxuICAgIGNvbnN0IHNvdW5kID0gbmV3IEF1ZGlvO1xyXG4gICAgc291bmQuc3JjID0gYCR7YXBpXzEuZmlsZXNVcmx9LyR7YWRkcmVzc31gO1xyXG4gICAgc291bmQucGxheSgpO1xyXG59XHJcbmV4cG9ydHMucGxheVNvdW5kID0gcGxheVNvdW5kO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnNsaWRlciA9IHZvaWQgMDtcclxuY29uc3Qgc3RvcmFnZV8xID0gcmVxdWlyZShcIi4vc3RvcmFnZVwiKTtcclxuZnVuY3Rpb24gc2xpZGVyKGNvbW1hbmQpIHtcclxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2xpZGVyJyk7XHJcbiAgICBjb25zdCByZWdpc3RyYXRpb25QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dyYXBwZXJBdXN3ZWlzJyk7XHJcbiAgICBjb25zdCBjZW50cmFsUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cmFwcGVySG9tZScpO1xyXG4gICAgY29uc3QgYWx0Q2VudHJhbFBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3JhcHBlckhvbWVBdXRoJyk7XHJcbiAgICBjb25zdCByZWdpc3RyYXRpb25CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaG9tZVRvUmVnaXN0cmF0aW9uJyk7XHJcbiAgICBjb25zdCBhYm91dEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob21lVG9BYm91dFBhZ2UnKTtcclxuICAgIGNvbnN0IGFsdEFib3V0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fib3V0VGhlUHJvamVjdCcpO1xyXG4gICAgY29uc3QgcmV0dXJuRnJvbUF1c3dlaXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmV0dXJuRnJvbUF1c3dlaXMnKTtcclxuICAgIGNvbnN0IHJldHVybkZyb21BYm91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXR1cm5Gcm9tQWJvdXQnKTtcclxuICAgIGZ1bmN0aW9uIGdvU2xpZGVPbmUoKSB7XHJcbiAgICAgICAgd3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgwJSknO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm5Gcm9tQXVzd2Vpcy5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgIHN0b3JhZ2VfMS5zdG9yYWdlLmN1cnJlbnRNYWluU2xpZGUgPSAwO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ29TbGlkZVR3bygpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50SGVpZ2h0ID0gcmVnaXN0cmF0aW9uUGFnZS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgd3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHtjdXJyZW50SGVpZ2h0fXB4KWA7XHJcbiAgICAgICAgcmV0dXJuRnJvbUF1c3dlaXMuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICByZXR1cm5Gcm9tQWJvdXQuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5jdXJyZW50TWFpblNsaWRlID0gMTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdvU2xpZGVUaHJlZSgpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50SGVpZ2h0ID0gcmVnaXN0cmF0aW9uUGFnZS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgd3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHtjdXJyZW50SGVpZ2h0ICogMn1weClgO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm5Gcm9tQWJvdXQuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICBzdG9yYWdlXzEuc3RvcmFnZS5jdXJyZW50TWFpblNsaWRlID0gMjtcclxuICAgIH1cclxuICAgIGlmICghY29tbWFuZCkge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvbkJ1dHRvbiA9PT0gbnVsbCB8fCByZWdpc3RyYXRpb25CdXR0b24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlZ2lzdHJhdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdvU2xpZGVPbmUpO1xyXG4gICAgICAgIGFib3V0QnV0dG9uID09PSBudWxsIHx8IGFib3V0QnV0dG9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhYm91dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdvU2xpZGVUaHJlZSk7XHJcbiAgICAgICAgYWx0QWJvdXRCdXR0b24gPT09IG51bGwgfHwgYWx0QWJvdXRCdXR0b24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFsdEFib3V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ29TbGlkZVRocmVlKTtcclxuICAgICAgICByZXR1cm5Gcm9tQXVzd2VpcyA9PT0gbnVsbCB8fCByZXR1cm5Gcm9tQXVzd2VpcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmV0dXJuRnJvbUF1c3dlaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnb1NsaWRlVHdvKTtcclxuICAgICAgICByZXR1cm5Gcm9tQWJvdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnb1NsaWRlVHdvKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNlbnRyYWxQYWdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgYWx0Q2VudHJhbFBhZ2Uuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICBnb1NsaWRlVHdvKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5zbGlkZXIgPSBzbGlkZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuc3RvcmFnZSA9IHZvaWQgMDtcclxuZXhwb3J0cy5zdG9yYWdlID0ge1xyXG4gICAgYm9va0dyb3VwOiAwLFxyXG4gICAgYm9va1BhZ2U6IDAsXHJcbiAgICB0b3RhbEdyb3VwczogNixcclxuICAgIHRvdGFsR2FtZXM6IDQsXHJcbiAgICB0b3RhbFBhZ2VzOiAzMCxcclxuICAgIGl0ZW1zUGVyR3JvdXA6IDIwLFxyXG4gICAgdGltZUxpbWl0OiAzMCxcclxuICAgIGlzUGFnZUxpc3RPcGVuOiBmYWxzZSxcclxuICAgIGlzR3JvdXBMaXN0T3BlbjogZmFsc2UsXHJcbiAgICBpc0dhbWVzTGlzdE9wZW46IGZhbHNlLFxyXG4gICAgaXNNZW51T3BlbjogZmFsc2UsXHJcbiAgICBkaWZmaWN1bHR5TGV2ZWxzOiB7fSxcclxuICAgIGN1cnJlbnRHYW1lUXVldWU6IFtdLFxyXG4gICAgY3VycmVudERpZmZpY3VsdHk6IDAsXHJcbiAgICBjdXJyZW50T3B0aW9uczogW10sXHJcbiAgICB3b3JraW5nQXJyYXk6IFtdLFxyXG4gICAgb25seU9uZVBhZ2U6IGZhbHNlLFxyXG4gICAgb25seU9uZVBhZ2VUZW1wbGF0ZTogW10sXHJcbiAgICBzaW5nbGVWYXJpYW50OiB7XHJcbiAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgIHdvcmQ6ICcnLFxyXG4gICAgICAgIHRyYW5zbGF0ZTogJycsXHJcbiAgICAgICAgaW1hZ2U6ICcnLFxyXG4gICAgICAgIGF1ZGlvOiAnJyxcclxuICAgICAgICB0cmFuc2NyaXB0aW9uOiAnJ1xyXG4gICAgfSxcclxuICAgIHJpZ2h0QW5zd2VyOiB7XHJcbiAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgIHdvcmQ6ICcnLFxyXG4gICAgICAgIHRyYW5zbGF0ZTogJycsXHJcbiAgICAgICAgaW1hZ2U6ICcnLFxyXG4gICAgICAgIGF1ZGlvOiAnJyxcclxuICAgICAgICB0cmFuc2NyaXB0aW9uOiAnJ1xyXG4gICAgfSxcclxuICAgIGVuZEdhbWVSZXN1bHRzOiB7XHJcbiAgICAgICAgcmlnaHQ6IFtdLFxyXG4gICAgICAgIHdyb25nOiBbXVxyXG4gICAgfSxcclxuICAgIGN1cnJlbnRHYW1lTW9kZTogJycsXHJcbiAgICBpc0F1dGhvcml6ZWQ6IGZhbHNlLFxyXG4gICAgaXNBdXRoTWVudU9wZW46IGZhbHNlLFxyXG4gICAgY3VycmVudE1haW5TbGlkZTogMVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnRpbWVyID0gdm9pZCAwO1xyXG5jb25zdCBlbmRHYW1lXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvZW5kR2FtZVwiKTtcclxuY29uc3Qgc3RvcmFnZV8xID0gcmVxdWlyZShcIi4vc3RvcmFnZVwiKTtcclxuZnVuY3Rpb24gdGltZXIoKSB7XHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGltZUxlZnQnKTtcclxuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGNvbnN0IGRpZ2l0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW1lTGVmdERpZ2l0cycpO1xyXG4gICAgY29udGV4dC5saW5lQ2FwID0gJ3JvdW5kJztcclxuICAgIGNvbnN0IGRpYW1ldGVyID0gMTUwO1xyXG4gICAgY29uc3QgcmFkaXVzID0gZGlhbWV0ZXIgLyAyO1xyXG4gICAgY29uc3QgaW5kaWNhdG9yV2lkdGggPSA4O1xyXG4gICAgY29uc3QgdHJhY2tXaWR0aCA9IDE7XHJcbiAgICBjb25zdCBjaXJjbGUgPSByYWRpdXMgLSBpbmRpY2F0b3JXaWR0aCAvIDI7XHJcbiAgICBjb25zdCB0cmFjayA9IHJhZGl1cyAtIGluZGljYXRvcldpZHRoIC8gMjtcclxuICAgIGNsZWFyKCk7XHJcbiAgICBjb25zdCB0aW1lTGltaXQgPSBzdG9yYWdlXzEuc3RvcmFnZS50aW1lTGltaXQgKiAxMDAwO1xyXG4gICAgbGV0IHRpbWVMZWZ0ID0gdGltZUxpbWl0O1xyXG4gICAgbGV0IHNlY29uZHNMZWZ0ID0gc3RvcmFnZV8xLnN0b3JhZ2UudGltZUxpbWl0O1xyXG4gICAgZGlnaXRzLmlubmVySFRNTCA9IHNlY29uZHNMZWZ0LnRvU3RyaW5nKCk7XHJcbiAgICBzdG9yYWdlXzEuc3RvcmFnZS5zZWNvbmRzSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRpbWVMZWZ0ID49IDApIHtcclxuICAgICAgICAgICAgc2Vjb25kc0xlZnQtLTtcclxuICAgICAgICAgICAgZGlnaXRzLmlubmVySFRNTCA9IHNlY29uZHNMZWZ0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoc3RvcmFnZV8xLnN0b3JhZ2Uuc2Vjb25kc0ludGVydmFsKVxyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzdG9yYWdlXzEuc3RvcmFnZS5zZWNvbmRzSW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAoMCwgZW5kR2FtZV8xLmVuZEdhbWUpKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgMTAwMCk7XHJcbiAgICBzdG9yYWdlXzEuc3RvcmFnZS5tc0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aW1lTGVmdCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGNsZWFyKCk7XHJcbiAgICAgICAgICAgIHNldFRyYWNrKCk7XHJcbiAgICAgICAgICAgIHNldEluZGljYXRvcigpO1xyXG4gICAgICAgICAgICB0aW1lTGVmdCAtPSAxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChzdG9yYWdlXzEuc3RvcmFnZS5tc0ludGVydmFsKVxyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzdG9yYWdlXzEuc3RvcmFnZS5tc0ludGVydmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9LCAxMCk7XHJcbiAgICBmdW5jdGlvbiBjbGVhcigpIHtcclxuICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBkaWFtZXRlciwgZGlhbWV0ZXIpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2V0VHJhY2soKSB7XHJcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICcjNDc0NTU0JztcclxuICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IHRyYWNrV2lkdGg7XHJcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjb250ZXh0LmFyYyhyYWRpdXMsIHJhZGl1cywgdHJhY2ssIDAsIE1hdGguUEkgKiAyKTtcclxuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2V0SW5kaWNhdG9yKCkge1xyXG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnIzQ3NDU1NCc7XHJcbiAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBpbmRpY2F0b3JXaWR0aDtcclxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGNvbnRleHQuYXJjKHJhZGl1cywgcmFkaXVzLCBjaXJjbGUsIE1hdGguUEkgLyAtMiwgKChNYXRoLlBJICogMikgLyB0aW1lTGltaXQpICogdGltZUxlZnQgKyBNYXRoLlBJIC8gLTIsIGZhbHNlKTtcclxuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMudGltZXIgPSB0aW1lcjtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGxpc3RlbmVyXzEgPSByZXF1aXJlKFwiLi9uYXZpZ2F0aW9uL2xpc3RlbmVyXCIpO1xyXG5jb25zdCByb3V0ZXJfMSA9IHJlcXVpcmUoXCIuL25hdmlnYXRpb24vcm91dGVyXCIpO1xyXG5jb25zdCBzdG9yYWdlXzEgPSByZXF1aXJlKFwiLi91dGlscy9zdG9yYWdlXCIpO1xyXG4oMCwgbGlzdGVuZXJfMS5saXN0ZW5lcikoKTtcclxuKDAsIHJvdXRlcl8xLnJvdXRlcikoJ2hvbWUnKTtcclxubGV0IHJlc2l6ZVRpbWVyO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJyZXNpemUtYW5pbWF0aW9uLXN0b3BwZXJcIik7XHJcbiAgICBjbGVhclRpbWVvdXQocmVzaXplVGltZXIpO1xyXG4gICAgcmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJyZXNpemUtYW5pbWF0aW9uLXN0b3BwZXJcIik7XHJcbiAgICB9LCA0MDApO1xyXG4gICAgY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NsaWRlcicpO1xyXG4gICAgaWYgKHNsaWRlcikge1xyXG4gICAgICAgIGNvbnN0IHJlZ2lzdHJhdGlvblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3JhcHBlckF1c3dlaXMnKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50SGVpZ2h0ID0gcmVnaXN0cmF0aW9uUGFnZS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgbGV0IGhvd0ZhciA9IDA7XHJcbiAgICAgICAgc3dpdGNoIChzdG9yYWdlXzEuc3RvcmFnZS5jdXJyZW50TWFpblNsaWRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGhvd0ZhciA9IC1jdXJyZW50SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGhvd0ZhciA9IC1jdXJyZW50SGVpZ2h0ICogMjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzbGlkZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoJHtob3dGYXJ9cHgpYDtcclxuICAgIH1cclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==