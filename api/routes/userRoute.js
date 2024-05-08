const {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	savePost,
	profilePosts,
} = require("../controller/userController");
const { verifyToken } = require("../middleware/verifyToken");

const router = require("express").Router();

router.get("/", getUsers);
// router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

router.post("/save", verifyToken, savePost);
router.get("/profilePosts", verifyToken, profilePosts);

module.exports = router;
