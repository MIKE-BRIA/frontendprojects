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
  const newspeed = this.speed - 5;
  console.log(`${this.make} going at ${newspeed}`);
};

const EV = function (make, speed, charge) {
  Carcl.call(this, make, speed, speed);
  this.charge = charge;
};

const AlfaRomeo = new Carcl("AlfaRomeo", 120);
const Mercedes = new Carcl("Mercedes", 95);
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
