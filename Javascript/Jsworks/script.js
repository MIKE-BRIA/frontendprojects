"use strict";
/*
function calcAge(birthyear) {
  const age = 2030 - birthyear;
  console.log(lastname);
  function printAge() {
    const output = `${lastname} You are ${age} years old and born in ${birthyear}`;
    console.log(output);

    if (birthyear >= 2000 && birthyear <= 2020) {
      const str = `Oh, and you're a Genz, ${lastname}`;
      console.log(str);
    }
  }
  printAge();
  return age;
}

const Lastname = "Michael Smith";
calcAge(2002);
*/
// console.log(this);
//* arrow functions don't own the this keyword they use the parent function
const jonas = {
  year: 2000,
  calcAge: () => {
    console.log(this);
  },
};

jonas.calcAge();

//* functions with names own the this keyword because it's pointed to the owner
const brin = {
  year: 2000,
  calcAge: function () {
    console.log(2045 - this.year);
  },
};

brin.calcAge();

const matilda = {
  year: 2005,
};

matilda.calcAge = brin.calcAge;

matilda.calcAge();

let lastname = "Willis ";
let oldlastname = lastname;

lastname = "Brivian";

console.log(lastname, oldlastname);

const jessica = {
  firstname: "Jessica",
  lastname: "Michael",
  age: 32,
};

const marriedjessica = jessica;

marriedjessica.lastname = "Obungu";

console.log("Before marriage :", jessica);
console.log("Aftermarriage :", marriedjessica);

//*copying of objects
const jessica2 = {
  firstname: "Jessica",
  lastname: "Michael",
  age: 32,
  family: ["Mike", "John", "Suzzan"],
};

//* a shallow copy of jessica
const jessicacopy = Object.assign({}, jessica2);
jessicacopy.firstname = "Owen Daay";
jessicacopy.lastname = "Debian";
jessicacopy.age = 45;
jessicacopy.family.push("mary", "John");
console.log(jessica2);
console.log(jessicacopy);

//*Deep copy of jessica
