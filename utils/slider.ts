export function slider() {
  const wrapper = document.querySelector('#slider') as HTMLElement;
  const registrationButton = document.querySelector('#homeToRegistration');
  const returnFromAusweis = document.querySelector('#returnFromAusweis') as HTMLElement;

  registrationButton?.addEventListener('click', () => {
    wrapper.style.transform = 'translateY(0%)';
    setTimeout(() => {
      returnFromAusweis.style.opacity = '1';
    }, 1500)
  })

  returnFromAusweis?.addEventListener('click', () => {
    wrapper.style.transform = 'translateY(-50%)';
    returnFromAusweis.style.opacity = '0';
  })
}