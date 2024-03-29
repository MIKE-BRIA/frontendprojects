"use strict";

//*selector for elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const player0El = document.getElementById("current--0");
const player1El = document.getElementById("current--1");

const player0Pl = document.querySelector(".player--0");
const player1Pl = document.querySelector(".player--1");

// //*starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;

let currentScore, scores, activePlayer, playing;

//starting conditions
const init = () => {
  //*variables
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0El.textContent = 0;
  player1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0Pl.classList.remove("player--winner");
  player1Pl.classList.remove("player--winner");
  player0Pl.classList.add("player--active");
  player1Pl.classList.remove("player--active");
};

init();

const Swictplayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Pl.classList.toggle("player--active");
  player1Pl.classList.toggle("player--active");
};

//*Rolling dice functionality
btnRoll.addEventListener("click", () => {
  if (playing) {
    //1.Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2. Display the dice

    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //3. check for rolled dice is 1: if true switch to next playee

    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      Swictplayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    //add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if player score >= 100
    if (scores[activePlayer] >= 100) {
      //finish game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }
    //Switch to next player
    Swictplayer();
  }
});

btnNew.addEventListener("click", init);
