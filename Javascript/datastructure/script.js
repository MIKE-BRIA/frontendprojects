"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = "20:00",
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIng, ...otherIng) {
    console.log(mainIng);
    console.log(otherIng);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

//!Looping Objects
//* Property names

const properties = Object.keys(restaurant.openingHours);

console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}

console.log(openStr);

//* Property values

const Values = Object.values(restaurant.openingHours);
console.log(Values);

const entries = Object.entries(restaurant.openingHours);
console.log(entries);

//*looping over the object

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

// console.log();

// for (const day of Object.keys(restaurant.openingHours)) {
//   console.log(day);
// }

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// //*for-of-loop

// for (const item of menu) {
//   console.log(item);
// }

// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}}`);
// }

// // console.log(restaurant.mainMenu?.[0] ?? "That does not exist");
// console.log(restaurant.mainMenu?.[(0, 2)] ?? "That does not exist");
// function order() {
//   console.log("hello");
// }

// order();
//* for loop in javascript
// for (let i = 0; i < menu.length; i++) {
//   console.log(menu[i]);
// }

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

//*calculate average odds

const odds = Object.values(game.odds);
let average = 0;

for (const odd of odds) {
  average += odd;
}

console.log(odds);

average /= odds.length;

console.log(average);

//*print content of object to the console

for (const [team, odd] of Object.entries(game.odds)) {
  console.log(team, odd);
}

// const [player1, player2] = game.players;

// console.log(player1);
// console.log(player2);

// const [gk, ...otherplayers] = player1;
// console.log(gk, otherplayers);

// const allplayers = [...player1, ...player2];
// console.log(allplayers);

// const player1Final = [...player1, "Thiago", "Coutinho", "oluku"];
// console.log(player1Final);

// const { team1, x: draw, team2 } = game.odds;
// console.log(team1);
// console.log(draw);
// console.log(team2);

// console.log("----- OR -----");

// console.log(3 > 9 || "john");

// console.log("----- AND -----");

// console.log(0 && 9);
// console.log("john" && 9);

// //example of and operator in work

// if (restaurant.orderPizza) {
//   restaurant.orderPizza("mushroom", "Spinach");
// }

// restaurant.orderPizza && restaurant.orderPizza("mushroom", "Spinach");

// //*Nullish operator

// restaurant.guest = "";

// const guest = restaurant.guest ?? 10;
// console.log(guest);

// restaurant.orderPizza("mushroom", "kwikwah", "suupuuu", "olives");

// //* 1. DESTRUCTURING
// //* Rest pattern and parameters
// //!rest patterns are just like spread operators it's only that they are used on the left side
// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];

// console.log(pizza, risotto, otherFood);

// //* Rest in objects
// const { thu, ...otherdays } = { ...restaurant.openingHours };

// console.log(thu, otherdays);

// //* 2. FUNCTIONS

// const add = function (...numbers) {
//   console.log(numbers);
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//     console.log(sum);
//   }
// };

// add(1, 2, 3);
// add(1, 2, 3, 4, 5, 6, 7, 8);
// add(1, 2, 3, 9, 8, 7, 6, 5, 4, 3, 2);
//* spread operator
// const arr = [7, 8, 9];

// const newArr = [1, 2, 3, ...arr];
// console.log(newArr);
// console.log(...newArr);

// const newMenu = [...restaurant.mainMenu, "Gnocci"];
// console.log(newMenu);

//*copy array
// const mainMenuCopy = [...restaurant.mainMenu];

//*join 2 arrays

// const doubleMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(doubleMenu);

//*iterables

// const name = "Brian Michael";

// const letters = [...name];
// console.log(letters);

// const ingredients = [
//   prompt("let's make pasta! ingredient 1?"),
//   prompt("ingredient 2?"),
//   prompt("ingredient 3"),
// ];

// console.log(ingredients);

// restaurant.orderPasta(...ingredients);

//* spread operator with objects

// const newrestaurant = { ...restaurant, founder: "Brian Michael" };

// console.log(newrestaurant);
// //*object destructuring function
// restaurant.orderDelivery({
//   time: "10:22",
//   address: "Vola bell brus, 21",
//   mainIndex: 0,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: "bulla mikka vill, 901",
// });

// //*OBJECT DESTRUCTURING
// const { name, openingHours, mainMenu } = restaurant;
// console.log(name, openingHours, mainMenu);

// const {
//   name: restaurantName = [], //empty array is default values
//   openingHours: hours,
//   mainMenu: menu,
// } = restaurant;

// console.log(restaurantName, hours, menu);

// //*mutating variables

// let a = 111;
// let b = 999;

// const obj = { a: 23, b: 7, c: 14 };

// ({ a, b } = obj);
// console.log(a);
// console.log(b);

// //*nested objects
// const {
//   fri: { open: morning, close: evening },
// } = openingHours;
// console.log(morning, evening);
// //*Array destructuring

// let [a, b, c, d] = restaurant.categories;
// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);

// [a, b, c, d] = [d, b, c, a];

// console.log("");

// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);

// console.log("");

// console.log(restaurant.order(2, 1));
// const [starter, main] = restaurant.order(2, 1);
// console.log(main);
// console.log(starter);
