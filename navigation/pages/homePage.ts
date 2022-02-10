import { getQuotes } from '../../utils/api';
import { addFooter } from '../../utils/misc';
import { slider } from '../../utils/slider';
import { storage } from '../../utils/storage';
import { Page } from '../router';

export const homePage: Page = {
  render: () => {
    const page = document.querySelector('#content') as HTMLElement;
    const currentHeight = page.offsetHeight;
    let value: number = 0;
    switch(storage.currentMainSlide) {
      case 0: value = 0;
      break;
      case 1: value = -currentHeight - 10;
      break;
      case 2: value = (-currentHeight - 10) * 2;
      break
    }
    return`
  <div id="slider" style="transform: translateY(${value}px)">
    <div id="wrapperAusweis">
      <div id="wrapperAusweisInner">
        <a href="#register" id="register">Еще не зарегистрированы?</a>
        <a href="#whatever" class="undoer">У меня уже есть аккаунт!</a>
        <div id="nameWrapper" class="inputWrapper">
          <input type="text" id="name" autocomplete="off" placeholder="Введите имя" required>
          <div class="validation">Имя обязательно</div>
        </div>
        <span id="errorSpan"></span>
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
    <div id="wrapperHomeAuth" ${storage.isAuthorized ? 'style="display: flex"' : 'style="display: none"'}>
      <h1 id="greeting">Привет, ${storage.userName}</h1>
      <div id="grid">
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
        <div class="activitySelector noHover">
          <div class="quotes" id="quotesDecoration"></div>
          <span class="quoteSpan" id="quoteSpan"></span>
          <span class="quoteSpan" id="authorSpan"></span>
          <div class="quotes" id="change-quote" >↻</div>
        </div>
      </div>
    </div>
    <div id="wrapperHome" ${storage.isAuthorized ? 'style="display: none"' : 'style="display: flex"'}>
        <h1 id="logo"><span>R</span><span>S</span><span> Lang</span></h1>
      <div id="homeButtonsWrapper">
        <button id="homeToRegistration">Регистрация / Вход</button>
        <button id="homeToAboutPage">О проекте</button>
      </div>
    </div>
    <div id="wrapperAbout">
      <div id="returnFromAbout" ${storage.currentMainSlide === 2 ? 'style="opacity: 1"' : ''}></div>
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
  `},
  afterRender: () => {
    addFooter();
    slider();
    getQuotes();
  }
};
