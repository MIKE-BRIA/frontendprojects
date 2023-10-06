const http = require("http");

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

server.listen(3000);

//USING EXPRESS JS IN OUR CODE

const express = require("express");

const app = express();

app.get("/currenttime"); // localhost:3000/currenttime

app.listen(3000);

function handleRequest(request, response) {
  if (request.url === "/currenttime") {
    response.statusCode = 200;
    response.end("<h1>" + new Date().toISOString() + "</h1>");
  } else if (request.url === "/") {
    response.statusCode = 200;
    response.end("<h1>Hello Everyone Here<h1>");
  }
}