import { listener } from "./navigation/listener";
import { router, routerLib } from "./navigation/router";
import { adjustStatsButton } from "./utils/misc";
import { storage } from './utils/storage'

listener();
const currentPage = storage.currentPage as keyof routerLib;
router(currentPage);
adjustLoginButton();

let resizeTimer: NodeJS.Timeout;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
  const slider = document.querySelector('#slider') as HTMLElement;
  if (slider) {
    const registrationPage = document.querySelector('#wrapperAusweis') as HTMLElement;
    const currentHeight = registrationPage.offsetHeight;
    let howFar = 0;
    switch (storage.currentMainSlide) {
      case 1: howFar = -currentHeight;
      break;
      case 2: howFar = -currentHeight * 2;
      break;
    }
    slider.style.transform = `translateY(${howFar}px)`
  }
});

export function adjustLoginButton() {
  if (storage.isAuthorized) {
    const logoutButton = document.querySelector('#authOut') as HTMLElement;
    const loginButton = document.querySelector('#authIn') as HTMLElement;
    logoutButton!.style.display =  'block';
    loginButton!.style.display =  'none';
    logoutButton.addEventListener('click', () => {
      storage.isAuthorized = false;
      storage.userId = '';
      storage.userName = '';
      storage.token = '';
      // loginButton.style.display = 'block';
      // logoutButton.style.display = 'none';
      router('home');
      document.location.reload();
      return false;
    }, {
      once: true
    })
  } else {
    adjustStatsButton(false);
  }
}

const modeSwitch = document.querySelector('#modeSwitch')!;
const root = document.querySelector('#content')! as HTMLElement;
const html = document.querySelector('html')!;
modeSwitch.addEventListener('click', () => {
  if(html.classList.contains('dark')) {
    html.classList.remove('dark');
    root.style.backgroundImage = 'url(assets/mainLight.jpg)';
  } else {
    html.classList.add('dark');
    root.style.backgroundImage = 'url(assets/mainDark.jpg)';
  }
})

console.log(`
Самооценка:
=================================
Главная страница приложения +40
=================================
=================================
Авторизация +50
Сложные слова" вынесены отдельно в "историю"
=================================
=================================
Список слов +70
Вот это не сделано:
"Если все слова на странице относятся к изученным словам или к изученным и сложным словам, 
такая страница считается полностью изученной и выделяется стилем. 
Также стилем выделяется соответствующая ей кнопка навигации по страницам учебника. 
Ссылки на мини-игры на этой странице становятся неактивными."
=================================
=================================
Мини-игры "Аудиовызов" и "Спринт" +200 (100 баллов за игру)
"Снайпер" - это саванна из задания предыдущего набора. Пазл не успел, кнопка не активна.Квадратики внизу во время игры -
это сколько раз подряд было угадано слово. Если слово сложное или изученное (во время игры, не запущеной со страницы учебника) то об этом написано
=================================
=================================
Прогресс изучения +50
Статы отображаются по нажатию на "?"
=================================
=================================
Изученные слова +60
Слово угаданное три раза подряд (или пять, если было помечено сложным) становится изученым; изученные и удаленные слова не участвуют в играх, запущенных из учебника
=================================
=================================
Страница статистики +30
Нет статистики по каждой игре отдельно, зато...
=================================
=================================
Дополнительный функционал +80
...есть графики по дням
=================================
долгосрочная статистика за весь период изучения в которой представлены два графика +40
=================================
смена темы день/ночь, цитатки на главном экране, одна дополнительная игра, 
список уже встречавшихся слов (любая интеракция), возможность отправить отзыв прямо со страницы, 
счетчик изученых слов в статистике, высокое качество оформления +40
=================================
Презентацию не успел. На ее месте стоит другое видео +0
=================================
=================================
=================================
`)
