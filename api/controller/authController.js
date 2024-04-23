const { prisma } = require("../lib/db");
const { PrismaClientKnownRequestError } = require("@prisma/client");

const { z, string, number, object } = require("zod");

const bcryptjs = require("bcryptjs");
const { singUpSchema, loginSchema } = require("../schema/userSchema");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
	try {
		const userData = req.body;
		singUpSchema.parse(userData);
		const { username, email, password } = req.body;
		//HASH THE PASSWORD
		const hashedPassword = await bcryptjs.hash(password, 10);
		//CREATE A NEW USER AND SAVE TO DB
		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});
		res.status(201).json({ message: "user created successfully" });
	} catch (error) {
		console.log(error);
		if (error instanceof z.ZodError) {
			// If ZodError, extract individual field errors
			const fieldErrors = {};
			error.errors.forEach((err) => {
				const path = err.path.join(".");
				fieldErrors[path] = err.message;
			});
			res
				.status(400)
				.json({ message: "Validation failed", errors: fieldErrors });
		} else if (error instanceof PrismaClientKnownRequestError) {
			// If PrismaClientKnownRequestError, handle accordingly
			if (
				error.code === "P2002"
				// &&
				// error.meta.modelName === "User" &&
				// error.meta.target === "User_email_key"
			) {
				res.status(400).json({
					message: "Email or username already exists",
					error: error.message,
				});
			} else if (error.code === "P1013") {
				res.status(400).json({
					message: "The provided database string is invalid.",
					error: error.message,
				});
			} else if (error.code === "P2003") {
				res.status(400).json({
					message: "Foreign key constraint failed on the field",
					error: error.message,
				});
			} else if (error.code === "P2007") {
				res.status(400).json({
					message: "Data validation error",
					error: error.message,
				});
			} else if (error.code === "P2012") {
				res.status(400).json({
					message: "Missing a required value ",
					error: error.message,
				});
			} else if (error.code === "P2021") {
				res.status(400).json({
					message: `The table ${user} does not exist in the current database`,
					error: error.message,
				});
			} else if (error.code === "P2036") {
				res.status(400).json({
					message: `Error in external connector`,
					error: error.message,
				});
			} else if (error.code === "P2037") {
				res.status(400).json({
					message: `Too many database connections opened`,
					error: error.message,
				});
			} else {
				res
					.status(400)
					.json({ message: "Database error", error: error.message });
			}
		} else {
			// If unexpected error, handle accordingly
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}
};
exports.login = async (req, res) => {
	try {
		const loginData = req.body;
		loginSchema.parse(loginData);
		const { email, password } = req.body;
		const userFound = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (!userFound) {
			return res.status(404).json({ message: "User not found" });
		}
		const passwordMatch = await bcryptjs.compare(password, userFound.password);
		if (!passwordMatch) {
			return res.status(401).json({ message: "Invalid Credentials" });
		}
		// Generate cookie and send to the user

		const age = 1000 * 60 * 60 * 24 * 7; // 1 week
		const token = jwt.sign(
			{
				id: userFound.id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: age }
		);
		res
			.cookie("tokenRealEstateUser", token, {
				httpOnly: true,
				// secure: true,
				maxAge: age,
			})
			.status(201)
			.json({ message: "login successfully" });
	} catch (error) {
		console.log(error);
		if (error instanceof z.ZodError) {
			// If ZodError, extract individual field errors
			const fieldErrors = {};
			error.errors.forEach((err) => {
				const path = err.path.join(".");
				fieldErrors[path] = err.message;
			});
			res.status(400).json({ message: "Login failed", errors: fieldErrors });
		} else {
			// If unexpected error, handle accordingly
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}
};
exports.logout = (req, res) => {
	res
		.clearCookie("tokenRealEstateUser", {
			httpOnly: true,
			// secure: true,
			maxAge: 0,
		})
		.status(200)
		.json({ message: "User is logout" });
};
