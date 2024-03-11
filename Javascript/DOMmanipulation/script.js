"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const nav = document.querySelector(".nav");

const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");

const section1 = document.getElementById("section--1");

const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

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

//! Event delegation(page navigation) with smooth scrolling

// document.querySelectorAll(".nav__link").forEach(link => {
//   link.addEventListener("click", e => {
//     e.preventDefault();
//     const id = link.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: "smooth",
//     });
//   });
// });

//*call eventlistners from the parent elements

document.querySelector(".nav__links").addEventListener("click", e => {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//! Tabbed componenet

tabsContainer.addEventListener("click", e => {
  e.preventDefault();
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;

  //remove active classes
  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach(content =>
    content.classList.remove("operations__content--active")
  );

  //active tab
  clicked.classList.add("operations__tab--active");

  //activate content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//! Menu fade animation

const handleHover = (e, opacity) => {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener("mouseover", e => handleHover(e, 0.5));
nav.addEventListener("mouseout", e => handleHover(e, 1));

//! Sticky navigation
/*
const initialCoordz = section1.getBoundingClientRect();

//scroll is in the window
window.addEventListener("scroll", () => {
  if (window.scrollY > initialCoordz.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});
*/

//! Sticky navigation using: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = entries => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
  // console.log(entry);
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

/*
// rgb(255, 255, 255);

//*generating a randomcolor

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomcolor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

console.log(randomcolor(0, 255));
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


//! Dom traversing

const h1 = document.querySelector("h1");

//*Going downwards: child nodes

console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = "yellow";
h1.lastElementChild.style.color = "orangered";

//* going upwards: parent nodes

console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest(".header").style.background = "var(--gradient-secondary)";
console.log(h1.closest(".header"));

//*going sideways: siblings

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

//all the siblings
console.log(h1.parentElement.children);
*/
