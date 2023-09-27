//placing input using the terminal in node.js

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Please enter your name: ", (name) => {
  console.log("You entered: " + name);
  rl.close(); //used for closing the terminal interface
});

rl.on("close", () => {
  console.log("Interface closed and am here to understand you");
  process.exit(0);
});
