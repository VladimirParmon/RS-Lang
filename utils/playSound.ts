import { filesUrl } from "./api";

export function playSound(address: string) {
  const sound = new Audio;
  sound.src = `${filesUrl}/${address}`;
  sound.play();
}