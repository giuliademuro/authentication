require("dotenv").config(); //Configurazione variabili d'ambiente

const express = require("express"); //Richiesta pacchetto express.js

//Richieste per gestire le sessioni, autorizzazioni e i cookies
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

//Richieste per autenticazioni da applicazioni esterne (Google, Facebook)
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const app = express(); //Inizializzazione app

const ejs = require("ejs"); //Richiesta pacchetto ejs

//Richieste mongoose
const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const router = express.Router();

module.exports = {
  express,
  session,
  passport,
  passportLocalMongoose,
  GoogleStrategy,
  FacebookStrategy,
  app,
  ejs,
  mongoose,
  findOrCreate,
  router,
};
