'use strict';

const inp = document.querySelector('.guess');
const btnCheck = document.querySelector('.check');
const msg = document.querySelector('.message');
const numberQues = document.querySelector('.number');
const again = document.querySelector('.again');
const score = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
const body = document.querySelector('body');

// add audio to our game
const successAudio = new Audio('assets/sound/success.mp3');
const loseAudio = new Audio('assets/sound/lose.mp3');

let rand = Math.floor(Math.random() * 20) + 1;
let scoreCount = 20;
let scoreCountprev = [];

function maxScore(arr) {
  return Math.max(...arr);
}

const handleGuess = () => {
  if (inp.value === '') {
    msg.textContent = '🤗️ plase enter a number';
    inp.value = '';
    scoreCount--;
  } else if (inp.value >= 1 && inp.value <= 20) {
    if (inp.value > rand) {
      msg.textContent = '📈 Too high!';
      inp.value = '';
      scoreCount--;
    } else if (inp.value < rand) {
      msg.textContent = '📉 Too low!';
      inp.value = '';
      scoreCount--;
    } else if (inp.value == rand) {
      msg.textContent = '🎉 Correct Number!';
      body.style.backgroundColor = 'rgb(96, 179, 71)';
      numberQues.style.width = '30rem';
      numberQues.textContent = inp.value;
      score.textContent = scoreCount;

      // Play success sound
      successAudio.play();

      //confetti
      confetti({
        particleCount: 200,
        angle: 360,
        spread: 360,
        startVelocity: 40,
        origin: { x: 0.5, y: 0.5 },
      });

      var end = Date.now() + 15 * 100;
      var colors = ['#bb0000', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0.5, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 80,
          origin: { x: 0.5, y: 0.5 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
      scoreCountprev.push(scoreCount);
      highscore.textContent = maxScore(scoreCountprev);
    }
  } else if (inp.value == 0) {
    msg.textContent = '🚫️ No number!';
    scoreCount--;
  } else {
    msg.textContent = '⛔️ plase enter a number between 1 and 20';
    scoreCount--;
  }

  if (scoreCount > 0 && scoreCount < 20) {
    score.textContent = scoreCount;
  } else if (scoreCount == 0) {
    score.textContent = 0;
    msg.textContent = '💥 You lost the game!';
    body.style.background = '#CE352C';
    btnCheck.setAttribute('disabled', true);

    // Play lose sound
    loseAudio.play();
  }
};

// Add event listener for the button
btnCheck.addEventListener('click', handleGuess);

// Add event listener for the Enter key
inp.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    handleGuess();
  }
});

again.addEventListener('click', () => {
  //   location.reload();
  score.textContent = 20;
  scoreCount = 20;
  inp.value = '';
  msg.textContent = 'Start guessing...';
  numberQues.textContent = '?';
  body.style.background = 'rgb(34, 34, 34)';
  rand = Math.floor(Math.random() * 20) + 1;
});
