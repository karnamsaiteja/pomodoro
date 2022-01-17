"use strict";

// ELEMENTS SELECTION

const main = document.querySelector(`main`);
const containerEl = document.querySelector(`.container`);
const lapsTxt = document.querySelector(`.display-laps-txt`);
const displayAbout = document.querySelector(`.display-about`);
const modal = document.querySelector(`.modal`);
const overlay = document.querySelector(`.overlay`);
const btnCloseModal = document.querySelector(`.close-modal`);
const audioContainerEl = document.querySelector(`.audio-container`);
const muteIcon = document.querySelector(`.mute-icon`);
const soundIcon = document.querySelector(`.sound-icon`);
const countNumEl = document.querySelector(`.count-number`);
const motTxt = document.querySelector(`.display-mot-txt`);
const btnRunEl = document.querySelector(`.btn--run`);
const btnPauseEl = document.querySelector(`.btn--pause`);
const btnResetEl = document.querySelector(`.btn--reset`);

// DECLARATIONS

let time = 1500;
let timer;
let lap = 0;
let minutes;
let seconds;

// FUNCTIONS

const openModal = function () {
  modal.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
};

const closeModal = function () {
  modal.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
};

const mute = function () {
  soundIcon.classList.add(`mute-icon-active`);
  muteIcon.classList.remove(`mute-icon-active`);
};

const unmute = function () {
  soundIcon.classList.remove(`mute-icon-active`);
  muteIcon.classList.add(`mute-icon-active`);
};

const run = function () {
  if (lap === 0) motTxt.textContent = `Let the epic journey begin!`;
  if (lap === 1) motTxt.textContent = `A great start!`;
  if (lap === 2) motTxt.textContent = `So far so good!`;
  if (lap === 3) motTxt.textContent = `Give yourself a pat on the back!`;
  if (lap === 4) motTxt.textContent = `Nothing can stop you now!`;

  // STYLES

  btnResetEl.style.backgroundColor = `var(--color-glass-bg)`;
  btnRunEl.style.backgroundColor = `var(--color-run)`;
  btnPauseEl.style.backgroundColor = `var(--color-glass-bg)`;

  // MAIN

  if (timer) return;
  countDown();
};

const pause = function () {
  if (timer) {
    // STYLES

    btnRunEl.style.backgroundColor = `var(--color-glass-bg)`;
    btnPauseEl.style.backgroundColor = `var(--color-pause)`;

    // MAIN
    pauseTime();
  }
};

const reset = function () {
  if (timer) {
    pauseTime();
    resetTime();
    countNumEl.textContent = `25:00`;
  }
  resetTime();
  countNumEl.textContent = `25:00`;

  btnRunEl.style.backgroundColor = `var(--color-glass-bg)`;
  btnPauseEl.style.backgroundColor = `var(--color-glass-bg)`;
  btnResetEl.style.backgroundColor = `var(--color-reset)`;
};

const resetTime = function () {
  time = 1500;
};

const pauseTime = function () {
  clearInterval(timer);
  timer = undefined;
};

const countDown = function () {
  timer = setInterval(function () {
    minutes = `${Math.trunc(time / 60)}`.padStart(2, 0);
    seconds = `${time % 60}`.padStart(2, 0);
    countNumEl.textContent = `${minutes}:${seconds}`;
    time--;
    if (time < -1) {
      resetTime();
      pauseTime();
      lap++;
      countNumEl.style.fontSize = `11.4rem`;
      countNumEl.textContent = `5 MIN BREAK`;
      lapsTxt.innerHTML = `Completed <span class="attach-color">POMODOROS</span>: ${lap}`;

      btnRunEl.style.backgroundColor = `var(--color-glass-bg)`;
      const resetTxt = setTimeout(function () {
        countNumEl.textContent = `RESET NOW`;
      }, 300000);

      if (muteIcon.classList.contains(`mute-icon-active`)) return;

      audioContainerEl.innerHTML = `        <audio class="audio audio-display" control autoplay>
      <source src="notification-2.wav" />
      </audio>`;

      btnRunEl.style.backgroundColor = `rgba(255, 255, 255, 0.63)`;

      btnResetEl.addEventListener(`click`, () => {
        clearInterval(reset);
        clearInterval(resetTxt);
      });

      const reset = setTimeout(function () {
        audioContainerEl.innerHTML = ``;
        audioContainerEl.innerHTML = `        <audio class="audio audio-display" control autoplay>
        <source src="notification-2.wav" />
        </audio>`;
      }, 300000);
    }
  }, 1000);
};

// EVENT LISTENERS

btnCloseModal.addEventListener(`click`, closeModal);

overlay.addEventListener(`click`, closeModal);

displayAbout.addEventListener(`click`, openModal);

muteIcon.addEventListener(`click`, mute);

soundIcon.addEventListener(`click`, unmute);

btnRunEl.addEventListener(`click`, run);

btnPauseEl.addEventListener(`click`, pause);

btnResetEl.addEventListener(`click`, reset);
