import { endGame } from "../utils/endGame";
import { storage, storageT } from "./storage";

export function timer() {
  const canvas = document.querySelector('#timeLeft') as HTMLCanvasElement;
  const context = canvas.getContext('2d')!;
  const digits = document.querySelector('#timeLeftDigits') as HTMLElement;
  context.lineCap = 'round';
  const diameter = 150;
  const radius = diameter / 2;
  const indicatorWidth = 8;
  const trackWidth = 1;
  const circle = radius - indicatorWidth / 2;
  const track = radius - indicatorWidth / 2;

  clear();

  const timeLimit = storageT.timeLimit * 1000;
  let timeLeft = timeLimit;
  let secondsLeft = storageT.timeLimit;
  digits.innerHTML = secondsLeft.toString();

  storageT.secondsInterval = setInterval(() => {
    if (timeLeft >= 0) {
      secondsLeft--;
      digits.innerHTML = secondsLeft.toString();
    } else {
      if(storageT.secondsInterval) clearInterval(storageT.secondsInterval);
      endGame();
    }
  }, 1000)

  storageT.msInterval = setInterval(() => {
    if (timeLeft >= 0) {
      clear();
      setTrack();
      setIndicator();
      timeLeft -= 10;
    } else {
      if(storageT.msInterval) clearInterval(storageT.msInterval);
    }
  }, 10);

  function clear() { 
    context.clearRect(0, 0, diameter, diameter); 
  }

  function setTrack() {
    context.strokeStyle = '#474554';
    context.lineWidth = trackWidth;
    context.beginPath();
    context.arc(radius, radius, track, 0, Math.PI*2);
    context.stroke();
  }

  function setIndicator() {
    context.strokeStyle = '#474554';
    context.lineWidth = indicatorWidth;
    context.beginPath();
    context.arc(
      radius,
      radius,
      circle,
      Math.PI / -2,
      ((Math.PI * 2) / timeLimit) * timeLeft + Math.PI / -2,
      false
    );
    context.stroke();
  }
}