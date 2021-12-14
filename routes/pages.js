const { express, router } = require("../imports");
const {
  getHome,
  getLogin,
  getRegister,
  getSubmit,
  getLogout,
  getSecrets,
} = require("../controllers/getControllers");

const {
  postRegister,
  postLogin,
  postSubmit,
} = require("../controllers/postControllers");

router.get("/", getHome);

router.route("/register").get(getRegister).post(postRegister);
router.route("/login").get(getLogin).post(postLogin);

router.get("/secrets", getSecrets);
router.route("/submit").get(getSubmit).post(postSubmit);

router.get("/logout", getLogout);

module.exports = router;
