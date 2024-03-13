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

console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2030 - this.birthYear);
};

//implementing the prototype inheritence
Michael.calcAge();
Anita.calcAge();

//*setting properties on prototype

Person.prototype.species = "Homo sapiens";
console.log(Anita.species);
console.log(Michael.species);

console.log("");

//! Inheritance between classes in constructor functions

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear, course);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and i study ${this.course}`);
};

const mike = new Student("Mike Milles", 2000, "Computer science");
console.log(mike);
mike.introduce();
mike.calcAge();

Student.prototype.constructor = Student;
console.log("");

//! code challenge

const Carcl = function (make, speed) {
  (this.make = make), (this.speed = speed);
};

Carcl.prototype.acc = function () {
  const newspeed = this.speed + 10;
  console.log(`${this.make} going at ${newspeed}`);
};

Carcl.prototype.brake = function () {
  this.speed -= 15;
  console.log(`${this.make} going at ${this.speed}`);
};

//* creating the EV as a child of Carcl
const EV = function (make, speed, charge) {
  Carcl.call(this, make, speed, speed);
  this.charge = charge;
};

//* linking the EV and Carcl classes
EV.prototype = Object.create(Carcl.prototype);

//*chargebattery function
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

//* EV accelerate and charge drop

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed}km/hr with a charge of ${this.charge}`
  );
};

const AlfaRomeo = new Carcl("AlfaRomeo", 120);
const Mercedes = new Carcl("Mercedes", 95);
const tesla = new EV("Tesla", 120, 23);
tesla.chargeBattery(100);

console.log(tesla);
tesla.brake();
tesla.accelerate();
AlfaRomeo.acc();
AlfaRomeo.brake();
console.log("");
Mercedes.acc();
Mercedes.brake();

//! ES6
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  acc() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/hr`);
  }

  brake() {
    this.speed -= 15;
    console.log(`${this.make} going at ${this.speed} km/hr`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new Car("Ford Mustang", 120);
console.log(ford.speedUS);
ford.acc();
ford.brake();
ford.speedUS = 90;
console.log(ford);

console.log("");
//! Getters and setters

//* This are functions that get and set values

const account = {
  owner: "Jonas",
  movements: [321, 400, 530, 200, 690, 891],

  //*getters
  get latest() {
    return this.movements.slice(-1).pop();
  },

  //*setters
  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
//setters
account.latest = 2700;
console.log(account.latest);

//! ES6 syntax

class Member {
  constructor(fullname, birthyear) {
    this.fullname = fullname;
    this.birthyear = birthyear;
  }

  calcAge() {
    console.log(2030 - this.birthyear);
  }

  greet() {
    console.log(`Hey ${this.fullname}`);
  }

  get age() {
    return 2030 - this.birthyear;
  }

  set fullname(name) {
    console.log(name);
    if (name.includes(" ")) {
      this._fullname = name;
    } else {
      alert(`${name} is not fullname`);
    }
  }

  get fullname() {
    return this._fullname;
  }

  //* Static methods
  static hey() {
    console.log("Hello 👋 everyone who have reported today");
  }
}

const Brian = new Member("Brian Michael", 2002);
console.log(Brian);
Brian.calcAge();
Brian.greet();
console.log(Brian.age);
const Walter = new Member("Walter Owen", 1999);
Member.hey();
// Brian.hey();

//! Static methods
//*Static methods are not added to the prototype
//* That is to mean not all object can access static methodss

//

//! Inheritance from the members class

class Studentcl extends Member {
  constructor(fullname, birthYear, course) {
    super(fullname, birthYear); //always happens first
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullname} and i study ${this.course}`);
  }
}

const Martha = new Studentcl("Martha Smith", 1999, "Computer Science");
console.log(Martha);
Martha.introduce();

console.log("");

//! Another class example

class Account {
  //*Private fields
  #movements = new Array();
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //protected
    this.#pin = pin;
    // this._movements = new Array();
    this.locale = navigator.language;

    console.log(`Thanks for openning a new account with us, ${owner}`);
  }

  getmovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
  }

  withdraw(value) {
    this.deposit(-value);
  }

  _approveLoan(value) {
    return true;
  }

  requestLoan(value) {
    if (this._approveLoan(value)) {
      this.deposit(value);
      console.log(`Your loan has been successfully approved`);
    }
  }
}

const acc1 = new Account("Mike Busman", "USD", 2222);
// console.log(acc1);
// acc1.movements.push(250);

acc1.requestLoan(2000);
acc1.deposit(450);
acc1.withdraw(100);
console.log(acc1.getmovements());

console.log(acc1);
// console.log(acc1.#movements);
