"use strict";

//!Default parameters
const booking = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //*setting default parameters

  const bookings = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(bookings);

  booking.push(bookings);
};

createBooking("LHG12", 5);
console.log(booking);

//!Passing arguments (Value Vs Reference)

const flight = "LHD12";
const Brian = {
  name: "Brian Michael",
  passport: 546827746,
  Age: 22,
};

const checkin = function (flightNum, Passenger) {
  flightNum = "LH24";
  Passenger.name = "Mr. " + Passenger.name;

  if (Passenger.passport == 546827746) {
    alert("Checked in");
  } else {
    alert("You got the wrong passport");
  }
};

// checkin(flight, Brian);
console.log(flight);
console.log(Brian);

//!first class and higher order functions

//*generic functions
const oneWord = function (str) {
  return str.replaceAll(" ", "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

//*higher order functions
//* fn are the callback functions

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by : ${fn.name}`);
};

transformer("Brian is the best person in the world", upperFirstWord);
console.log("");
transformer("Brian is the best person in the world", oneWord);

//!functions returning functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greettype = greet("Hola");
greettype("Brian Michael");

greet("Good morning")("Owen");

const gret = greeting => {
  return jina => console.log(`${greeting} ${jina}`);
};

gret("Goodbye")("my love");

console.log("");
console.log("");
console.log("");

//!The call and apply methods

const lufthans = {
  airline: "kenya Airways",
  iataCode: "KH",
  bookings: [],
  //book function
  // book: function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthans.book(234, "Brian Michael");
console.log(lufthans.bookings);

console.log("");
console.log("");
console.log("");

const book = lufthans.book;

const euroline = {
  airline: "Euroair",
  iataCode: "EU",
  bookings: [],
};

//*Doesn't work
// book(234, "Brian Michael");
// euroline.book(234, "Brian michael");

book.call(euroline, 452, "Sarah Muhammed");
console.log(euroline);

const flightData = [234, "Zarah Muhammed"];

book.call(euroline, ...flightData);

//! Bind method

//* the bind method creates the function with the this keyword pointed o the entered method
console.log(book.bind(euroline));
book.bind(euroline)(342, "Michael Schiwatard");
//*OR
const bookair = book.bind(euroline);
bookair(191, "johnson waliboraa");

console.log("");
console.log("");
console.log("");

//*using the bind method when you use objects together with eventlistners

lufthans.plane = 300;
lufthans.buyplane = function () {
  console.log(this);
  this.plane++;
  console.log(this.plane);
};

document
  .querySelector(".buy")
  .addEventListener("click", lufthans.buyplane.bind(lufthans));

//*partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.15, 3000));

//*the rate is already given all is needed is the value
//* Use null because the first argument of bind is this keyword that we do not have
const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(32901));

const tax = rate => {
  return function (value) {
    return value + value * rate;
  };
};

console.log(tax(0.23)(32901));
const AddVOT = tax(0.23);
console.log(AddVOT(100));

//! Immediately invoked function expression
//* function that runs once

(function () {
  console.log("I am just am man who wants to know a lot of stuff");
})();

(() =>
  console.log("Am learning to become a better person each and everyday"))();

//! Closure

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();
