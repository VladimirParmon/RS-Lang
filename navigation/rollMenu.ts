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
    storage.isMenuOpen = !storage.isMenuOpen
  } else {
    openMenuButton.style.transform = 'translateX(0%)';
    upperBar.style.width = 'calc(100vw - 70px)';
    navigationMenu.style.width = '70px';
    logoMain.style.transform = 'translateX(0%)';
    storage.isMenuOpen = !storage.isMenuOpen
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
      option.id = `listOption-${i}`;
      option.innerText = `Страница ${i+1}`
      list.appendChild(option);
    }
    root?.appendChild(list);
    storage.isPageListOpen = !storage.isPageListOpen;
  } else if (storage.isPageListOpen) {
    const list = document.querySelector('.pageList') as HTMLElement;
    root?.removeChild(list);
    storage.isPageListOpen = !storage.isPageListOpen;
  }
}
