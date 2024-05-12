let startTime = localStorage.getItem('startTime') ? parseInt(localStorage.getItem('startTime')) : null;
let running = false;
let elapsedTime = localStorage.getItem('elapsedTime') ? parseInt(localStorage.getItem('elapsedTime')) : 0;
let timerInterval;

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return (
    String(hours).padStart(2, '0') +
    ':' +
    String(minutes).padStart(2, '0') +
    ':' +
    String(seconds).padStart(2, '0')
  );
}

function startTimer() {
  if (!running) {
    startTime = startTime ? startTime : Date.now();
    localStorage.setItem('startTime', startTime);
    timerInterval = setInterval(updateDisplay, 1000);
    running = true;
    startBtn.textContent = 'Pause';
  } else {
    clearInterval(timerInterval);
    running = false;
    startBtn.textContent = 'Resume';
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  running = false;
  localStorage.removeItem('startTime');
  localStorage.removeItem('elapsedTime');
  startBtn.textContent = 'Start';
}

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  localStorage.setItem('elapsedTime', elapsedTime);
  display.textContent = formatTime(elapsedTime);
}

if (startTime) {
  timerInterval = setInterval(updateDisplay, 1000);
  startBtn.textContent = 'Pause';
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
