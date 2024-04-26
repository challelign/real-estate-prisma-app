const {
	shouldBeLoggedIn,
	shouldBeAdmin,
} = require("../controller/checkController");
const { verifyToken } = require("../middleware/verifyToken");

const router = require("express").Router();

router.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn);

router.get("/should-be-admin", shouldBeAdmin);

module.exports = router;
