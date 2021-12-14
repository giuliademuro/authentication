// ################################################
// #          IMPOSTAZIONI MONGOOSE               #
// ################################################

const { mongoose, passportLocalMongoose, findOrCreate } = require("./imports");

//Creazione schema per la collezione del databse (moongoose.Schema permette l'utilizzo di plugin)
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  facebookId: String,
  secret: String,
});

userSchema.plugin(passportLocalMongoose); //Estensione al pacchetto passport-local-mongoose
userSchema.plugin(findOrCreate); //Estensione al pacchetto find-or-create

const User = mongoose.model("User", userSchema); //Creazione del modello che utilizza lo schema precedentemente creato

module.exports = { User };
