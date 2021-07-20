const express           = require("express");
const router            = express.Router();

const UsersController   = require("../../controllers/UserControllers");

router.get("/", (req, res) => {
    console.log("User API Routes Works");
    res.json({ success: true });
});

router.route("/users")
      .get(UsersController.users_get_all)
      .post(UsersController.post_user);

module.exports = router;