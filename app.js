// ################################################
// #          IMPORTAZIONE VARIABILI              #
// ################################################
const {
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
} = require("./imports");

const setPassport = require("./controllers/passport");
const pages = require("./routes/pages");
const auth = require("./routes/auth");

//Utilizzo middleware generali
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//Utilizzo middleware per creazione e inizializzazione delle sessioni
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ################################################
// #          IMPOSTAZIONI MONGOOSE               #
// ################################################
mongoose.connect("mongodb://localhost:27017/usersDB"); //Connessione al Database usersDB

setPassport();

// ################################################
// #          IMPOSTAZIONE RICHIESTE              #
// ################################################

app.use("/", pages);
app.use("/auth", auth);

app.listen(3000, () => {
  console.log("Server is running at port 3000...");
});
