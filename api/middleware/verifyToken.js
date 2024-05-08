const jwt = require("jsonwebtoken");
const { prisma } = require("../lib/db");
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
		const user = await prisma.user.findUnique({
			where: {
				id: req.userId,
			},
			select: {
				id: true,
				username: true,
				email: true,
				avatar: true,
				password: false, // Exclude the password field
			},
		});

		console.log("USER_FROM_TOKEN=>", user);
		if (!user) {
			// console.log("USER_NOT_FOUND_WITH_THIS_USER_ID=>", req.userId);
			return res.status(401).json({
				message: "Your are not authorized, Please login",
			});
		}
		next();
	});
};
