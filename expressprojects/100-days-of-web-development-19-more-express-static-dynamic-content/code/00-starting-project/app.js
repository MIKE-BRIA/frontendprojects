//build-in packages
const path = require("path");

//Third-party packages
const express = require("express");

//our own files
const defaultRoutes = require("./routes/defaults");
const restRoutes = require("./routes/restaurants");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes);
app.use("/", restRoutes);

//web page error rendering
app.use(function (req, res) {
  res.status(404).render("404");
});

//server page error handling
app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
