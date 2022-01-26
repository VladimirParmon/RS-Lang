export function showLoader() {
  const root = document.querySelector('#content');
  const loader = document.createElement('div');
  loader.classList.add('loader');
  root?.appendChild(loader);
}

export function hideLoader() {
  const root = document.querySelector('#content');
  const loader = document.querySelector('.loader') as HTMLElement;
  root?.removeChild(loader);
}