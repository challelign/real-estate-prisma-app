const {
	getPosts,
	getPost,
	updatePost,
	deletePost,
	addPost,
} = require("../controller/postController");
const { verifyToken } = require("../middleware/verifyToken");

const router = require("express").Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
