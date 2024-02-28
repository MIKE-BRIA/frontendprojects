"use strict";

// document.querySelector(".message").textContent = "Who the fuck are you?";

const btn = document.querySelector(".check");

let score = 15;
document.querySelector(".score");

let highscore = 0;

//*function for displaying message
function displaymessage(message) {
  document.querySelector(".message").textContent = message;
}

//*generating a random digit
const number = Math.trunc(Math.random() * 20) + 1;
console.log(number);

btn.addEventListener("click", () => {
  const guess = Number(document.querySelector(".guess").value);

  console.log(guess, typeof guess);
  //*no input
  if (!guess) {
    displaymessage("Please enter a number");

    //*player wins
  } else if (guess === number) {
    displaymessage("You win and that's cool");

    document.querySelector(".number").textContent = number;
    document.querySelector("body").style.background = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }

    //*guess high
  } else if (guess !== number) {
    if (score > 1) {
      //   document.querySelector(".message").textContent =
      //     guess > number ? "That's  high" : "That's low";

      displaymessage(guess > number ? "That's high" : "That's low");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displaymessage("You lost!, just try again");
      document.querySelector("body").style.background = "red";
      document.querySelector(".score").textContent = 0;
    }
  }

  //   else if (guess > number) {
  // if (score > 0) {
  //   document.querySelector(".message").textContent = "That's  high";
  //   score--;
  //   document.querySelector(".score").textContent = score;
  // } else {
  //   document.querySelector(".message").textContent = "You lost the game";
  // }

  //     //*guess low
  //   } else if (guess < number) {
  //     if (score > 0) {
  //       document.querySelector(".message").textContent = "That's  low";
  //       score--;
  //       document.querySelector(".score").textContent = score;
  //     } else {
  //       document.querySelector(".message").textContent = "You lost the game";
  //     }
  //   }
});

//*playing the game again
const againbtn = document.querySelector(".again");

againbtn.addEventListener("click", () => {
  score = 15;
  const number = Math.trunc(Math.random() * 20) + 1;

  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.background = "#222";
  document.querySelector(".number").style.width = "15rem";
});
