import { authorize, register } from "../utils/api";
import { storage, storageT } from "../utils/storage";

export function rollMenu(action: string): void {
  const openMenuButton = document.querySelector('#openMenuButton') as HTMLElement;
  const navigationMenu = document.querySelector('#navigationMenu') as HTMLElement;
  const upperBar = document.querySelector('#upperBar') as HTMLElement;
  const logoMain = document.querySelector('#logoMain') as HTMLElement;

  if(action === 'open' && !storageT.isMenuOpen) {
    openMenuButton.style.transform = 'translateX(-100%)';
    upperBar.style.width = 'calc(100vw - 260px)';
    navigationMenu.style.width = '260px';
    logoMain.style.transform = 'translateX(-120%)';
    storageT.isMenuOpen = true;
  } else {
    openMenuButton.style.transform = 'translateX(0%)';
    upperBar.style.width = 'calc(100vw - 70px)';
    navigationMenu.style.width = '70px';
    logoMain.style.transform = 'translateX(0%)';
    storageT.isMenuOpen = false;
  }
}

export function rollPageSelector(action: string) {
  const root = document.querySelector('.wrapper');
  if (!storageT.isPageListOpen && action === 'open') {
    const list = document.createElement('div');
    list.classList.add('pageList');
    for (let i=0; i < storageT.totalPages; i++) {
      const option = document.createElement('div');
      option.classList.add('pageListOption')
      option.id = `pageListOption-${i}`;
      option.innerText = `Страница ${i+1}`
      list.appendChild(option);
    }
    root?.appendChild(list);
    storageT.isPageListOpen = true;
  } else if (storageT.isPageListOpen) {
    const list = document.querySelector('.pageList') as HTMLElement;
    root?.removeChild(list);
    storageT.isPageListOpen = false;
  }
}

export function rollSectionSelector(action: string) {
  const root = document.querySelector('.wrapper');
  if (!storageT.isGroupListOpen && action === 'open') {
    const list = document.createElement('div');
    list.classList.add('sectionList');
    for (let i=0; i < storageT.totalGroups; i++) {
      const option = document.createElement('div');
      option.classList.add('sectionListOption')
      option.id = `sectionListOption-${i}`;
      option.innerText = `Раздел ${i+1}`;
      list.appendChild(option);
    }
    storageT.isGroupListOpen = true;
    root?.appendChild(list);
  } else if (storageT.isGroupListOpen) {
    const list = document.querySelector('.sectionList') as HTMLElement;
    root?.removeChild(list);
    storageT.isGroupListOpen = false;
  }
}

export function rollGamesSelector(action: string) {
  const root = document.querySelector('.wrapper');
  if (!storageT.isGamesListOpen && action === 'open') {
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
    for (let i=0; i < storageT.totalGames; i++) {
      const option = document.createElement('div');
      option.classList.add('gamesListOption');
      option.id = `gamesListOption-${Games[i]}`;
      option.innerText = `${GamesRU[i]}`;
      list.appendChild(option);
    }    
    storageT.isGamesListOpen = true;
    root?.appendChild(list);
  } else if (storageT.isGamesListOpen) {
    const list = document.querySelector('.gamesList') as HTMLElement;
    root?.removeChild(list);
    storageT.isGamesListOpen = false;
  }
}

export function passwordReveal() {
  const button = document.querySelector('#passwordReveal') as HTMLImageElement;
  const input = document.querySelector('#password') as HTMLInputElement;

  if (input.type === 'password') {
    input.type = 'text';
    button.src = 'assets/svg/eye-show.svg'
  } else {
    input.type = 'password';
    button.src = 'assets/svg/eye-hide.svg'
  }
}

export function rollSetting(action: string) {
  const list = document.querySelector('.settingsList') as HTMLElement;
  if (!storageT.isSettingsListOpen && action === 'open') {
    list.classList.add('descend');
    //list.classList.remove('ascend');
    storageT.isSettingsListOpen = true;
  } else if (storageT.isSettingsListOpen) {
    list.classList.remove('descend');
    //list.classList.add('ascend');
    storageT.isSettingsListOpen = false;
  }
}