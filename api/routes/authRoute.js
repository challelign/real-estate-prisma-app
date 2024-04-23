const { register, login, logout } = require("../controller/authController");

const router = require("express").Router();

router.post("/register", register);

router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
