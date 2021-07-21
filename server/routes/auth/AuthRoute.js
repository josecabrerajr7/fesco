const express           = require("express");
const router            = express.Router();

const AuthController   = require("../../controllers/AuthController");

router.route("/login")
      .post(AuthController.login_user);


module.exports = router;
