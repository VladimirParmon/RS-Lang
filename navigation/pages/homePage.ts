import { addFooter } from "../../utils/misc";
import { slider } from "../../utils/slider";
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
    <div id="wrapperHome">
      <div id="logoWrapper">
        <h1 id="logo"><span>R</span><span>S</span><span> Lang</span></h1>
      </div>
      <div id="homeButtonsWrapper">
        <button id="homeToRegistration">Регистрация / Вход</button>
        <button id="homeToAboutPage">О проекте</button>
      </div>
    </div>
    <div id="wrapperAbout">
      <div id="returnFromAbout"></div>
      <div id="video">
      <div id="tipaVideo"></div>
        <span>
          Теперь учить английский язык легко и увлекательно!<br>
          Учите и запоминайте слова.<br>
          Закрепляйте успех повторением, играя в мини-игры.<br>
          Повторение каждый день для достижения потрясающего результата!
        </span>
      </div>
      <div id="additionalInfo">
        <h2>Учебник</h2>
        <span>Более 3500 слов, разитых по сложности на разделы с удобной навигацией</span>
        <h2>История</h2>
        <span>Раздел, содеражащий персональный словарь для повторения именно тех слов, которые являются проблемными
        и все слова, которые раньше встречались в играх</span>
        <h2>Игры</h2>
        <span>4 увлекательных игры, которые помогут расширить вокабуляр, улучшить навыки правописания и восприятия  речи на слух</span>
        <h2>Статистика</h2>
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