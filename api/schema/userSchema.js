const { z } = require("zod");

exports.singUpSchema = z.object({
	username: z.string().min(3, {
		message: "Username must be least 3 character(s) ",
	}),
	email: z.string().email(),
	password: z.string().min(6, {
		message: "Password must be least 6 character(s) ",
	}),
});

exports.loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6, {
		message: "Password must be least 6 character(s) ",
	}),
});
