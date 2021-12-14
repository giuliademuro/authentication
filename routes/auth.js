const { express, router, passport } = require("../imports");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/secrets");
  }
);

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/secrets",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/secrets");
  }
);

module.exports = router;
