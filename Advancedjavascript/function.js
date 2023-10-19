//JAVASCRIPT FUNCTIONS

function greetUser(greetingPrefix, userName = "User") {
  console.log(greetingPrefix + " " + userName + "!");
}

greetUser("Hi", "Max");
greetUser("Hello");

// writing a function that sumsup numbers in a list

function sumUp(...numbers) {
  // the three dots are used to allow multiple inputs
  let result = 0;

  for (const number of numbers) {
    result += number;
  }

  return result;
}

const inputNumbers = [21, 34, 566, 75, 890];

console.log(sumUp(...inputNumbers)); //The three dots are used to convert the array into a list

//More simple way for the first function

function greetUser(greetingPrefix, userName = "User") {
  console.log(`${greetingPrefix} ${userName}!`);
}

greetUser("Hi", "Max");
greetUser("Hello");
