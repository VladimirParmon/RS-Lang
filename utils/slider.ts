import { storage } from "./storage";

export function slider(command?: string) {
  const wrapper = document.querySelector('#slider') as HTMLElement;
  const registrationPage = document.querySelector('#wrapperAusweis') as HTMLElement;
  const centralPage = document.querySelector('#wrapperHome') as HTMLElement;
  const altCentralPage = document.querySelector('#wrapperHomeAuth') as HTMLElement;
  const registrationButton = document.querySelector('#homeToRegistration');
  const aboutButton = document.querySelector('#homeToAboutPage');
  const altAboutButton = document.querySelector('#aboutTheProject');
  const returnFromAusweis = document.querySelector('#returnFromAusweis') as HTMLElement;
  const returnFromAbout = document.querySelector('#returnFromAbout') as HTMLElement;

  function goSlideOne() {
    wrapper.style.transform = 'translateY(0%)';
    setTimeout(() => {
      returnFromAusweis.style.opacity = '1';
    }, 1500)
    storage.currentMainSlide = 0;
  }

  function goSlideTwo() {
    const currentHeight = registrationPage.offsetHeight;
    wrapper.style.transform = `translateY(-${currentHeight}px)`;
    returnFromAusweis.style.opacity = '0';
    returnFromAbout.style.opacity = '0';
    storage.currentMainSlide = 1;
  }

  function goSlideThree() {
    const currentHeight = registrationPage.offsetHeight;
    wrapper.style.transform = `translateY(-${currentHeight * 2}px)`;
    setTimeout(() => {
      returnFromAbout.style.opacity = '1';
    }, 1500)
    storage.currentMainSlide = 2;
  }

  if (!command) {
    registrationButton?.addEventListener('click', goSlideOne);
    aboutButton?.addEventListener('click', goSlideThree);
    altAboutButton?.addEventListener('click', goSlideThree);
    returnFromAusweis?.addEventListener('click', goSlideTwo);
    returnFromAbout.addEventListener('click', goSlideTwo);
  } else if (command === 'main') {
    centralPage.style.display = 'none';
    altCentralPage.style.display = 'flex';
    goSlideTwo();
  } else {
    goSlideOne();
  }
}