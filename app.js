//jshint esversion:6
require("dotenv").config();
const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const ejs = require("ejs");

const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/usersDB");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    const newUser = new User({
      email: req.body.username,
      password: hash, //Hash function
    });

    newUser.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.render("secrets");
      }
    });
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password; //Hash function

  User.findOne({ email: username }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            res.render("secrets");
          }
        });
      }
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running at port 3000...");
});
