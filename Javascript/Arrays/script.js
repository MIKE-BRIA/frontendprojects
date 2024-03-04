"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";

  movements.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>    
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
    // console.log(`${i + 1} ${movement}`);
  });
};

displayMovements(account1.movements);
/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//! Looping arrays(for each)

//* for of

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement < 0) {
    console.log(`Movement ${i + 1}: You have withdrawn ${Math.abs(movement)}`);
  } else {
    console.log(`Movement ${i + 1}: You have deposited ${Math.abs(movement)}`);
  }
}
console.log("");

console.log("---------FOREACH----------");

//* for each

movements.forEach((movement, i) => {
  if (movement < 0) {
    console.log(
      `Movement ${i + 1}: You have withdrawn ${Math.abs(movement)} 🤑`
    );
  } else {
    console.log(
      `Movement ${i + 1}: You have deposited ${Math.abs(movement)} 💳`
    );
  }
});

console.log("");
//* forEach in maps and sets
//MAP
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach((currency, i) => {
  console.log(`${i}: ${currency}`);
});

//SET

const currenciesUnique = new Set([
  "USD",
  "GBP",
  "KSH",
  "EUR",
  "USD",
  "GBP",
  "RND",
  "KSH",
]);

console.log(currenciesUnique);
//*sets do not have the index(i)
currenciesUnique.forEach((currency, i) => {
  console.log(`You are using ${currency}`);
});

//!ARRRAY METHODS


let arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

//!slice method
//*doesn't mutate/change the original array
console.log(arr.slice(2));
console.log(arr.slice(2, 6));
console.log(arr.slice(-3));
console.log(arr.slice(2, -3));
console.log(arr.slice());
console.log([...arr]);

console.log("");

//!splice method
//*mutates/chenges the original array
//*splice method is used for deleting items in an array
// console.log(arr.splice(3));
arr.splice(-3);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

console.log("");
//!Reverse method
//*mutates the original array
//reverses the arrangement of the array
const arr2 = ["j", "k", "y", "q", "r", "p"];
console.log(arr2);
console.log(arr2.reverse());
console.log(arr2);

console.log("");

//!CONCAT method
//*used to join 2 arrays together
//* the orginal array is not mutated

console.log(arr, arr2);
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

console.log("");

//!JOIN method

console.log(letters.join("-"));

console.log("");
//!AT method

const arr3 = [23, 13, 17, 19];
console.log(arr3[0]);
console.log(arr3.at(0));

//getting the last array element
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1));

console.log("");
*/
