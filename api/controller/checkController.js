const jwt = require("jsonwebtoken");

exports.shouldBeLoggedIn = async (req, res) => {
	console.log("req.userId", req.userId); // get value from verifyToken middleware

	res.status(200).json({ message: "Your are Authenticated" });
};
exports.shouldBeAdmin = async (req, res) => {
	const token = req.cookies.TokenRealEstate;
	if (!token) {
		return res.status(401).json({
			message: "You are not logged in",
		});
	}
	jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
		if (err) {
			return res.status(401).json({
				message: "Token is not valid",
			});
		}
		if (!payload.isAdmin) {
			return res.status(403).json({ message: "You are not Authorized" });
		}
		req.user = payload;
	});
	res.status(200).json({ message: "Your are Authenticated" });
};
