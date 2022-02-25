import { addFooter } from "../../utils/misc";
import { Page } from "../router";

export const commentsPage: Page = {
  render: () => (`
  <div id="contactMe">
    <form target="_blank" action="https://formsubmit.co/vladimirredblooded@gmail.com" method="POST">
      <input type="text" name="name" placeholder="Как вас зовут? (опционально)">
      <input type="hidden" name="_captcha" value="false">
      <textarea placeholder="Оставьте ваш комментарий. Никакой регистрации :)" name="message"></textarea>
      <button type="submit">Отправить</button>
    </form>
  </div>
  `),
  afterRender: () => {
    addFooter();
  }
}