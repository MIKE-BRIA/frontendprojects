"use strict";

// document.querySelector(".message").textContent = "Who the fuck are you?";

const btn = document.querySelector(".check");

let score = 15;
document.querySelector(".score");

const number = Math.trunc(Math.random() * 30) + 1;
console.log(number);

document.querySelector(".number").textContent = number;

btn.addEventListener("click", () => {
  const guess = Number(document.querySelector(".guess").value);

  console.log(guess, typeof guess);
  //*no input
  if (!guess) {
    document.querySelector(".message").textContent = "No value provided";

    //*player wins
  } else if (guess === number) {
    document.querySelector(".message").textContent = "You found it";

    document.querySelector("body").style.background = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    //*guess high
  } else if (guess > number) {
    if (score > 0) {
      document.querySelector(".message").textContent = "That's  high";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "You lost the game";
    }

    //*guess low
  } else if (guess < number) {
    if (score > 0) {
      document.querySelector(".message").textContent = "That's  low";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "You lost the game";
    }
  }
});
