export function slider(command?: string) {
  const wrapper = document.querySelector('#slider') as HTMLElement;
  const centralPage = document.querySelector('#wrapperHome') as HTMLElement;
  const registrationButton = document.querySelector('#homeToRegistration');
  const aboutButton = document.querySelector('#homeToAboutPage');
  const returnFromAusweis = document.querySelector('#returnFromAusweis') as HTMLElement;
  const returnFromAbout = document.querySelector('#returnFromAbout') as HTMLElement;

  if (!command) {
    registrationButton?.addEventListener('click', () => {
      wrapper.style.transform = 'translateY(0%)';
      setTimeout(() => {
        returnFromAusweis.style.opacity = '1';
      }, 1500)
    })
  
    aboutButton?.addEventListener('click', () => {
      const currentHeight = centralPage.offsetHeight;
      wrapper.style.transform = `translateY(-${currentHeight * 2}px)`;
      setTimeout(() => {
        returnFromAbout.style.opacity = '1';
      }, 1500)
    })
  
    returnFromAusweis?.addEventListener('click', () => {
      const currentHeight = centralPage.offsetHeight;
      wrapper.style.transform = `translateY(-${currentHeight}px)`;
      returnFromAusweis.style.opacity = '0';
    })
  
    returnFromAbout.addEventListener('click', () => {
      const currentHeight = centralPage.offsetHeight;
      wrapper.style.transform = `translateY(-${currentHeight}px)`;
      returnFromAbout.style.opacity = '0';
    })
  } else {
    const currentHeight = centralPage.offsetHeight;
    wrapper.style.transform = `translateY(-${currentHeight}px)`;
    returnFromAusweis.style.opacity = '0';
  }
}