import { authorize, register } from "../utils/api";
import { storage } from "../utils/storage";

export function rollMenu(action: string): void {
  const openMenuButton = document.querySelector('#openMenuButton') as HTMLElement;
  const navigationMenu = document.querySelector('#navigationMenu') as HTMLElement;
  const upperBar = document.querySelector('#upperBar') as HTMLElement;
  const logoMain = document.querySelector('#logoMain') as HTMLElement;

  if(action === 'open' && !storage.isMenuOpen) {
    openMenuButton.style.transform = 'translateX(-100%)';
    upperBar.style.width = 'calc(100vw - 260px)';
    navigationMenu.style.width = '260px';
    logoMain.style.transform = 'translateX(-120%)';
    storage.isMenuOpen = true;
  } else {
    openMenuButton.style.transform = 'translateX(0%)';
    upperBar.style.width = 'calc(100vw - 70px)';
    navigationMenu.style.width = '70px';
    logoMain.style.transform = 'translateX(0%)';
    storage.isMenuOpen = false;
  }
}

export function rollPageSelector(action: string) {
  const root = document.querySelector('.wrapper');
  if (!storage.isPageListOpen && action === 'open') {
    const list = document.createElement('div');
    list.classList.add('pageList');
    for (let i=0; i < storage.totalPages; i++) {
      const option = document.createElement('div');
      option.classList.add('pageListOption')
      option.id = `pageListOption-${i}`;
      option.innerText = `Страница ${i+1}`
      list.appendChild(option);
    }
    root?.appendChild(list);
    storage.isPageListOpen = true;
  } else if (storage.isPageListOpen) {
    const list = document.querySelector('.pageList') as HTMLElement;
    root?.removeChild(list);
    storage.isPageListOpen = false;
  }
}

export function rollSectionSelector(action: string) {
  const root = document.querySelector('.wrapper');
  if (!storage.isGroupListOpen && action === 'open') {
    const list = document.createElement('div');
    list.classList.add('sectionList');
    for (let i=0; i < storage.totalGroups; i++) {
      const option = document.createElement('div');
      option.classList.add('sectionListOption')
      option.id = `sectionListOption-${i}`;
      option.innerText = `Раздел ${i+1}`;
      list.appendChild(option);
    }
    storage.isGroupListOpen = true;
    root?.appendChild(list);
  } else if (storage.isGroupListOpen) {
    const list = document.querySelector('.sectionList') as HTMLElement;
    root?.removeChild(list);
    storage.isGroupListOpen = false;
  }
}

export function rollGamesSelector(action: string) {
  const root = document.querySelector('.wrapper');
  if (!storage.isGamesListOpen && action === 'open') {
    const list = document.createElement('div');
    list.classList.add('gamesList');
    enum GamesRU {
      'Аудио',
      'Спринт',
      'Снайпер',
      'Пазл',
    }
    enum Games {
      audio,
      sprint,
      sniper,
      puzzle
    }
    for (let i=0; i < storage.totalGames; i++) {
      const option = document.createElement('div');
      option.classList.add('gamesListOption');
      option.id = `gamesListOption-${Games[i]}`;
      option.innerText = `${GamesRU[i]}`;
      list.appendChild(option);
    }    
    storage.isGamesListOpen = true;
    root?.appendChild(list);
  } else if (storage.isGamesListOpen) {
    const list = document.querySelector('.gamesList') as HTMLElement;
    root?.removeChild(list);
    storage.isGamesListOpen = false;
  }
}

export function rollAuthMenu(action: string) {
  const root = document.querySelector('#content');
  if (!storage.isAuthMenuOpen && action === 'open') {
    const menu = document.createElement('div');
    menu.id = 'authMenu';

    const mailInput = document.createElement('input');
    const passwordInput = document.createElement('input');
    const nameInput = document.createElement('input');
    const logInButton = document.createElement('button');
    const registerButton = document.createElement('button');
    const sendButton = document.createElement('button');
    const backButton = document.createElement('button');

    mailInput.placeholder = 'enter e-mail';
    passwordInput.placeholder = 'enter password';
    nameInput.placeholder = 'enter name';
    logInButton.textContent = 'Log in';
    registerButton.textContent = 'Register';
    sendButton.textContent = 'Send';
    backButton.innerHTML = 'Back';
    //const mail = mailInput.value;
    //const password = passwordInput.value;
    const name = nameInput.value;
    const mail = 'hello@user.com';
    const password = 'Gfhjkm_123';

    logInButton.addEventListener('click', () => {
      authorize(mail, password);
    });

    registerButton.addEventListener('click', () => {
      menu.prepend(nameInput);
      menu.append(sendButton);
      menu.append(backButton);
      logInButton.style.display = 'none';
      registerButton.style.display = 'none';
    })

    sendButton.addEventListener('click', () => {
      register(name, mail, password);
    })

    backButton.addEventListener('click', () => {
      menu.removeChild(nameInput);
      menu.removeChild(backButton);
      menu.removeChild(sendButton);
      logInButton.style.display = 'inline';
      registerButton.style.display = 'inline';
    })

    menu.appendChild(mailInput);
    menu.appendChild(passwordInput);
    menu.appendChild(logInButton);
    menu.appendChild(registerButton);
    root?.appendChild(menu)
    storage.isAuthMenuOpen = true;
  } else if (storage.isAuthMenuOpen && action === 'close') {
    const menu = document.querySelector('#authMenu');
    if (root && menu) root.removeChild(menu);
    storage.isAuthMenuOpen = false;
  }
}