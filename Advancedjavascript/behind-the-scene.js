//Adding things to an array

const hobbies = ["sport", "cooking"];

hobbies.push("coding");

console.log(hobbies);

const person = { age: 45 };

function getAge(p) {
  p.age -= 18;
  return p.age;
  //return p.age - 20;
}

console.log(getAge({ ...person }));
console.log(person);
