import { storage } from "./storage";

export function addIndicator() {
  const root = document.querySelector('#content');
  const indicator = document.createElement('div');
  indicator.id = 'indicator';
  root?.appendChild(indicator);
  storage.initialGameQueueLength = storage.currentGameQueue.length;
}

export function removeIndicator() {
  const root = document.querySelector('#content');
  const indicator = document.querySelector('#indicator');
  if (root && indicator) root.removeChild(indicator);
}

export function updateIndicator() {
  const indicator = document.querySelector('#indicator') as HTMLElement;
  const percentage = 100 * (storage.initialGameQueueLength! - storage.currentGameQueue.length) / storage.initialGameQueueLength!;
  indicator.style.backgroundImage = `linear-gradient(to right, var(--action) ${percentage}%, var(--trio3) ${percentage}%)`;
}