"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//*Smooth scrolling

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");

btnScrollTo.addEventListener("click", e => {
  e.preventDefault();

  //*old way of scrolling
  // const s1coords = section1.getBoundingClientRect();

  // //scrolling
  // // window.scrollTo(
  // //   s1coords.left + window.pageXOffset,
  // //   s1coords.top + window.pageYOffset
  // // );

  // //smooth scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  //*new way of scrolling

  section1.scrollIntoView({ behavior: "smooth" });
});
/*

//!Selecting Elements
const header = document.querySelector(".header");
document.querySelectorAll(".btn");
const allSections = document.querySelectorAll(".section");
console.log(allSections);

//*selector that produce a collection
document.getElementsByTagName("button"); //all buttons ina document
document.getElementsByClassName("btn");

//*creating and inserting elements

//! Inserting elements
// .insertAdjacentHTML
const message = document.createElement("div");
message.classList.add("cookie-message"); //adding a classList to a created element
message.innerHTML = `We used cookies for improved 
functionality and analytics. 
<button class='btn btn--close--cokie'>Got it</button>`;

//*prepend adds the element as the first child
// header.prepend(message);
//*append adds the element ass the last child
header.append(message);
//* when you want to add an element twice you will need to clone it
// header.append(message.cloneNode(true));

//!Deleting elements

document
  .querySelector(".btn--close--cokie")
  .addEventListener("click", () => message.remove());

//!styles
message.style.backgroundColor = "#37383d";
message.style.width = "130%";

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 20 + "px";

//!Attributes
const logo = document.querySelector(".nav__logo");

//standard attributes
console.log(logo.src);
console.log(logo.alt);

//Non-standard attributes
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");

console.log(logo.src);
console.log(logo.getAttribute("src"));

//!Classes

logo.classList.add("c");
logo.classList.remove("c");
logo.classList.toggle("c");
logo.classList.contains("c");
*/
