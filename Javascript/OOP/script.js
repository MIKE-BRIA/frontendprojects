"use strict";

//! Constructor function

//arrow functions don't work for because they don't have the this key word

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const Michael = new Person("Michael", 2002);
console.log(Michael);

const Anita = new Person("Anita", 2004);
console.log(Anita);

//! Prototypes
