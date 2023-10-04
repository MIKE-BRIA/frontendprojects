//placing input using the terminal in node.js

/*....................

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

*/

//WORKING WITH FILES IN NODE.JS READING AND WRITING

//READING AND WRITING FILES SYNCHRONOUSLY
const { error } = require("console");
const fs = require("fs");

//Reading file
let textIn = fs.readFileSync("./files/input.txt", "utf-8");
console.log(textIn);

//writing on files
let content = `Data read from input.txt: ${textIn}. \nDate created ${new Date()}`;
fs.writeFileSync("./files/output.txt", content);

//READING AND WRITING FILES ASYNHRONOUSLY

fs.readFile("./files/start.txt", "utf-8", (error1, data1) => {
  console.log(data1);

  fs.readFile(`./files/${data1}.txt`, `utf-8`, (error2, data2) => {
    console.log(data2);

    fs.readFile(`./files/append.txt`, `utf-8`, (error3, data3) => {
      console.log(data3);
    });
  });
});

console.log("Reading file........");
