import { addFooter } from "../../utils/misc";
import { slider } from "../../utils/slider";
import { Page } from "../router";

export const homePage: Page = {
  render: () => (`
  <div id="slider">
    <div id="wrapperAusweis">
      <a href="#register" id="register">Еще не зарегистрированы?</a>
      <a href="#whatever" class="undoer">У меня уже есть аккаунт!</a>
      <div id="nameWrapper">
        <input type="text" id="name" placeholder="Введите имя">
      </div>
      <input type="text" id="mail" placeholder="Введите адрес эл. почты">
      <input type="text" id="password" placeholder="Введите пароль">
      <button id="login">Войти</button>
      <button id="send">Зарегистрироваться</button>
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
  </div>
  `),
  afterRender: () => {
    addFooter();
    slider();
  }
}