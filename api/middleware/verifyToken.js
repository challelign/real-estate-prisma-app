const jwt = require("jsonwebtoken");
exports.verifyToken = async (req, res, next) => {
	const token = req.cookies.TokenRealEstate;
	if (!token) {
		return res.status(401).json({
			message: "You are not logged in",
		});
	}
	jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
		if (err) {
			return res.status(403).json({
				message: "Token is not valid",
			});
		}
		console.log(payload.id);
		req.userId = payload.id;
		console.log("req.userId from VerifyToken Fun", req.userId);
		next();
	});
};
