export function rollMenu(action: string): void {
  const openMenuButton = document.querySelector('#openMenuButton') as HTMLElement;
  const closeMenuButton = document.querySelector('#closeMenuButton') as HTMLElement;
  const navigationMenu = document.querySelector('#navigationMenu') as HTMLElement;
  const upperBar = document.querySelector('#upperBar') as HTMLElement;
  const logoMain = document.querySelector('#logoMain') as HTMLElement;
  const logoMenu = document.querySelector('#logoMenu') as HTMLElement;

  if(action === 'open') {
    openMenuButton.style.transform = 'translateX(-100%)';
    upperBar.style.width = 'calc(100vw - 260px)';
    navigationMenu.style.width = '260px';
    logoMain.style.transform = 'translateX(-120%)';
  } else {
    openMenuButton.style.transform = 'translateX(0%)';
    upperBar.style.width = 'calc(100vw - 70px)';
    navigationMenu.style.width = '70px';
    logoMain.style.transform = 'translateX(0%)';
  }
}

export function rollPageSelector() {
  
}
