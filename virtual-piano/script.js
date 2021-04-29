'use strict';

const btns = document.querySelectorAll('.btn');
const pianoKeys = document.querySelectorAll('.piano-key');
const piano = document.querySelector('.piano');

// NOTES/LETTERS
for (let button of btns) {
  button.addEventListener('click', function () {

    btns.forEach(i => i.classList.remove('btn-active'));
    this.classList.toggle('btn-active');

    if (button.classList.contains('btn-notes')) {
      piano.classList.remove('piano-letters');
      pianoKeys.forEach(elem => {
        elem.classList.remove('piano-key-letter');
      })
    } else {
      piano.classList.add('piano-letters');
      pianoKeys.forEach(elem => {
        elem.classList.add('piano-key-letter');
      })
    }
  });
}

//PLAY AUDIO  and change keys MOUSE
function playAudio(src) {
  let audio = new Audio();
  audio.preload = 'auto';
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

function playNote (event) {
  if (event.target.classList.contains('piano-key')) {
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
  }
}

function startPlay (event) {
  event.target.classList.add('piano-key-active');
  playNote(event);
}

function stopPlay(event) {
  event.target.classList.remove('piano-key-active');
}

function startCorrespondOver(event) {
  if (event.target.classList.contains('piano-key')) {
    event.target.classList.add('piano-key-active');
    playNote(event);
  }

  pianoKeys.forEach((elem) => {
    elem.addEventListener('mouseover', startPlay);
    elem.addEventListener('mouseout', stopPlay);
  });
}
function stopCorrespondOver() {
  pianoKeys.forEach((elem) => {
    elem.classList.remove('piano-key-active');
    elem.removeEventListener("mouseover", startPlay);
    elem.removeEventListener("mouseout", stopPlay);
  });

}

piano.addEventListener('mousedown', startCorrespondOver, false);
piano.addEventListener('mouseup', stopCorrespondOver);
document.querySelector('body').addEventListener('mouseup', stopCorrespondOver);


////PLAY AUDIO  and change keys keyboard

const keyMap = {
  KeyD: 'c',
  KeyF: 'd',
  KeyG: 'e',
  KeyH: 'f',
  KeyJ: 'g',
  KeyK: 'a',
  KeyL: 'b',
  KeyR: 'c♯',
  KeyT: 'd♯',
  KeyU: 'f♯',
  KeyI: 'g♯',
  KeyO: 'a♯',
}

window.addEventListener('keydown', (event) => {
  if (event.repeat === true) return;
    const src = `assets/audio/${keyMap[event.code]}.mp3`;
    playAudio(src);

      pianoKeys.forEach(elem => {
        if (elem.dataset.note === keyMap[event.code]) {
          elem.classList.add('piano-key-active');
        }
      })
})

window.addEventListener('keyup', (event) => {
  pianoKeys.forEach(elem => {
    if (elem.dataset.note === keyMap[event.code]) {
      elem.classList.remove('piano-key-active');
    }
  })
})

//FULLSCREEN
const fullscreenBtn = document.querySelector('.fullscreen');

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.fullscreenEnabled) {
    document.exitFullscreen();
  }
});
