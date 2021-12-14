const {
  express,
  session,
  passport,
  passportLocalMongoose,
  GoogleStrategy,
  FacebookStrategy,
  app,
  findOrCreate,
} = require("../imports");

// ################################################
// #          IMPOSTAZIONI PASSPORT               #
// ################################################
const { User } = require("../Users");

const setPassport = () => {
  passport.use(User.createStrategy());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  //Inizializzazione startegia Google
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          console.log(profile);
          return cb(err, user);
        });
      }
    )
  );
  //Inizializzazione startegia Facebook
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/secrets",
      },
      function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );
};

module.exports = setPassport;
