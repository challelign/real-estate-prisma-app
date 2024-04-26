const { prisma } = require("../lib/db");
const bcryptjs = require("bcryptjs");
const { PrismaClientKnownRequestError } = require("@prisma/client");

const { z, string, number, object } = require("zod");
const { singUpSchema, updateSchema } = require("../schema/userSchema");

exports.getUsers = async (req, res, next) => {
	try {
		const users = await prisma.user.findMany({});
		console.log(users);
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to get users" });
	}
};

exports.getUser = async (req, res, next) => {
	const id = req.params.id;
	try {
		const user = await prisma.user.findUnique({
			where: { id },
		});
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		console.log(error);

		res.status(500).json({ message: "Failed to get user" });
	}
};

exports.updateUser = async (req, res, next) => {
	const id = req.params.id;
	const tokenUserId = req.userId;
	const userData = req.body;
	console.log("userData=>", userData);

	const { password, avatar, ...inputs } = req.body;
	if (id !== tokenUserId) {
		return res.status(404).json({ message: "Not Authorized!" });
	}
	let hashedPassword = null;

	const userExist = await prisma.user.findUnique({
		where: { id },
	});
	if (!userExist) {
		return res.status(404).json({ message: "User dose not exist" });
	}
	// Parse the input data using the update schema
	try {
		updateSchema.parse(userData);
	} catch (error) {
		// Handle validation errors
		console.log("Validation error:", error);
		const fieldErrors = {};
		error.errors.forEach((err) => {
			const path = err.path.join(".");
			fieldErrors[path] = err.message;
		});
		return res
			.status(400)
			.json({ message: "Validation failed", errors: fieldErrors });
	}
	try {
		if (password) {
			hashedPassword = await bcryptjs.hash(password, 10);
		}
		const updatedUser = await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				...inputs,
				...(hashedPassword && { password: hashedPassword }),
				...(avatar && { avatar }),
			},
		});
		const { password: userPassword, ...userInfo } = updatedUser;

		return res.status(201).json({ message: "User updated!", userInfo });
	} catch (error) {
		console.log(error);
		// res.status(500).json({ message: "Failed to update user" });

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
			if (error.code === "P2002") {
				res.status(400).json({
					message: "Email or username already exists",
					error: error.message,
				});
			} else if (error.code === "P2025") {
				res.status(400).json({
					message: "User not found.",
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

exports.deleteUser = async (req, res, next) => {
	const id = req.params.id;
	const tokenUserId = req.userId;

	if (id !== tokenUserId) {
		return res.status(404).json({ message: "Not Authorized!" });
	}
	try {
		const user = await prisma.user.delete({
			where: { id },
		});
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(201).json({ message: "User deleted!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to delete user" });
	}
};
