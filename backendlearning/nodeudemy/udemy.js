/*const http = require("http");

function handleRequest(request, response) {
  if (request.url === "/currenttime") {
    response.statusCode = 200;
    response.end("<h1>" + new Date().toISOString() + "</h1>");
  } else if (request.url === "/") {
    response.statusCode = 200;
    response.end("<h1>Hello Everyone Here<h1>");
  }
}

const server = http.createServer(handleRequest);

server.listen(3000);*/

//USING EXPRESS JS IN OUR CODE

const fs = require("fs"); //package for working with files
const path = require("path"); //package for working with paths for packages and files

const express = require("express"); // express.js package

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
}); // localhost:3000/currenttime

app.get("/", function (req, res) {
  res.send(
    "<form action='/store-user' method='POST'><label>Your name: </label><input type='text' name='username'><button>Submit</button></form>"
  );
}); //localhost:3000/

//storing the users data in a json file known as users.json
app.post("/store-user", function (req, res) {
  const userName = req.body.username;

  const filePath = path.join(__dirname, "data", "users.json");

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  existingUsers.push(userName);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send("<h1>Username stored!</h1>");
});

//outputing the stored users names
app.get("/users", function (req, res) {
  const filePath = path.join(__dirname, "data", "users.json");

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  let responseData = "<ul>"; //to create a list

  //loop through the list so as to output independent names
  for (const user of existingUsers) {
    responseData += "<li>" + user + "</li>";
  }

  responseData += "</ul>"; //closing the list

  res.send(responseData);
});

app.listen(3000);
