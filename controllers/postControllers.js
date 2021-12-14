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

const postRegister = (req, res) => {
  User.register(
    { username: req.body.username },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          //Doppie parentesi permettono di chiamare immediatamente una funzione all'interno della prima
          res.redirect("/secrets");
        });
      }
    }
  );
};

const postLogin = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    //Metodo integrato passport
    if (!err) {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    } else {
      console.log(err);
    }
  });
};

const postSubmit = (req, res) => {
  const secret = req.body.secret;

  User.findById(req.user.id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (user) {
        user.secret = secret;
        user.save(() => res.redirect("/secrets"));
      }
    }
  });
};

module.exports = { postRegister, postLogin, postSubmit };
