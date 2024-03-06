'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//!Accounts Transactions
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">💲${mov}</div>
      </div>    
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
    // console.log(`${i + 1} ${movement}`);
  });
};

// displayMovements(account1.movements);

//! accounts balance

const calcBalance = acc => {
  acc.balance = acc.movements.reduce((acc, move) => acc + move, 0).toFixed(2);
  // acc.balance = balance;
  labelBalance.textContent = `💲${acc.balance} `;
};

// calcBalance(account1.movements);

//! Accounts username

const createusername = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createusername(accounts);
// console.log(accounts);

//! calc accounts summary

//*deposits,withdrawals and interest

const calcSummary = acc => {
  const income = acc.movements
    .filter(move => move > 0)
    .reduce((acc, move) => acc + move, 0)
    .toFixed(2);

  labelSumIn.textContent = `💲${income}`;
  // return income;

  const withdrawal = acc.movements
    .filter(move => move < 0)
    .reduce((acc, move) => acc + move, 0)
    .toFixed(2);

  labelSumOut.textContent = `💲${Math.abs(withdrawal)}`;

  const interest = acc.movements
    .filter(move => move > 0)
    .map(move => (move * acc.interestRate) / 100)
    .filter(move => move > 1)
    .reduce((acc, move) => acc + move, 0)
    .toFixed(2);

  labelSumInterest.textContent = `💲${interest}`;
};

//*function to update Ui

const updateUI = acc => {
  //display movements
  displayMovements(acc.movements);
  //display balance
  calcBalance(acc);
  //display summary
  calcSummary(acc);
};

// calcSummary(account1.movements);

//! Event handlers

//*Login
let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display Ui and message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;
    inputLoginPin.value = '';
    inputLoginUsername.value = '';

    inputLoginPin.blur();

    updateUI(currentAccount);

    console.log('login');
  }
});
// console.log(currentAccount);

//*Transfer money

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recacc = accounts.find(acc => acc.username === inputTransferTo.value);

  console.log(amount, recacc);

  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  if (
    amount > 0 &&
    recacc &&
    currentAccount.balance >= amount &&
    recacc?.username !== currentAccount.username
  ) {
    // console.log("transferred");
    currentAccount.movements.push(-amount);
    recacc.movements.push(amount);

    updateUI(currentAccount);
    // updateUI(recacc);
  }

  console.log(recacc.balance);
  console.log(currentAccount, recacc);
});

//*Requesting a loan

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    //updateUi

    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});
//* Close account

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    console.log(index);

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
  console.log(accounts);
});

//*sorting

let sorted = false;

btnSort.addEventListener('click', e => {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
