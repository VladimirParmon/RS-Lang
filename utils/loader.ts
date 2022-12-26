export function showLoader() {
  const root = document.querySelector('body');
  const loader = document.createElement('div');
  loader.classList.add('loader');
  root?.appendChild(loader);
}

export function hideLoader() {
  const root = document.querySelector('body');
  const loader = document.querySelector('.loader') as HTMLElement;
  if (root && loader) root.removeChild(loader);
}