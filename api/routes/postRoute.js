const router = require("express").Router();

router.get("/test", (req, res) => {
	// router code here
	console.log("rout test");
});

router.get("/another-route", (req, res) => {
	// router code here
});

module.exports = router;
// export default router;
