"use strict";

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
