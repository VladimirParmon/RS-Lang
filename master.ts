import { listener } from "./navigation/listener";
import { router, routerLib } from "./navigation/router";
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
      loginButton.style.display = 'block';
      logoutButton.style.display = 'none';
      router('home');
    }, {
      once: true
    })
  }
}

