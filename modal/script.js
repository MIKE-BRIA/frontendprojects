"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnClosemodal = document.querySelector(".close-modal");
const btnsOpenmodal = document.querySelectorAll(".show-modal");

// console.log(btnsOpenmodal);

function addhidden() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function removehidden() {
  //   console.log("hey am good");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

for (let i = 0; i < btnsOpenmodal.length; i++) {
  btnsOpenmodal[i].addEventListener("click", removehidden);

  btnClosemodal.addEventListener("click", addhidden);

  overlay.addEventListener("click", addhidden);
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    addhidden();
  }
});
