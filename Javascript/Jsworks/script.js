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

const lastname = "Michael Smith";
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
