const { User } = require("../Users");

const {
  express,
  session,
  passport,
  passportLocalMongoose,
  app,
  ejs,
  mongoose,
} = require("../imports");

const getHome = (req, res) => {
  res.render("home");
};

const getLogin = (req, res) => {
  res.render("login");
};

const getRegister = (req, res) => {
  res.render("register");
};

const getSecrets = (req, res) => {
  let isLogged = false;
  User.find({ secret: { $ne: null } }, (err, foundUsers) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUsers) {
        if (req.isAuthenticated()) {
          isLogged = true;
        } else {
          isLogged = false;
        }
        res.render("secrets", { usersWithSecrets: foundUsers, isLogged });
      }
    }
  });
};

const getSubmit = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/");
  }
};

const getLogout = (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports = {
  getHome,
  getLogin,
  getRegister,
  getSecrets,
  getSubmit,
  getLogout,
};
