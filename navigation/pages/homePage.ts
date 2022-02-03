import { addFooter } from "../../utils/misc";
import { slider } from "../../utils/slider";
import { storage } from "../../utils/storage";
import { Page } from "../router";

export const homePage: Page = {
  render: () => (`
  <div id="slider">
    <div id="wrapperAusweis">
      <div id="wrapperAusweisInner">
        <a href="#register" id="register">Еще не зарегистрированы?</a>
        <a href="#whatever" class="undoer">У меня уже есть аккаунт!</a>
        <div id="nameWrapper">
          <input type="text" id="name" placeholder="Введите имя">
        </div>
        <input type="text" id="mail" placeholder="Введите адрес эл. почты">
        <input type="text" id="password" placeholder="Введите пароль">
        <button id="login">Войти</button>
        <button id="send">Зарегистрироваться</button>
      </div>
      <div id="returnFromAusweis"></div>
    </div>
    <div id="wrapperHomeAuth" ${storage.isAuthorized ? 'style="display: flex"' : 'style="display: none"'}></div>
    <div id="wrapperHome" ${storage.isAuthorized ? 'style="display: none"' : 'style="display: flex"'}>
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
    addFooter();
    slider();
  }
}