const { z } = require("zod");

exports.singUpSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be least 2 character(s) ",
	}),
	email: z.string().email(),
	password: z.string().min(6, {
		message: "Password must be least 6 character(s) ",
	}),
});

exports.loginSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be least 2 character(s) ",
	}),
	password: z.string().min(6, {
		message: "Password must be least 6 character(s) ",
	}),
});

exports.updateSchema = z.object({
	username: z.string().min(3).optional(),
	email: z.string().email().optional(),
	password: z.string().min(6).optional(),
});
/* exports.updateSchema = z.object({
	username: z
		.string()
		.min(2)
		.optional()
		.refine((value) => value.trim().length > 0, {
			message: "Username must be least 2 characters",
		}),

	email: z.string().email().optional(),

	password: z
		.string()
		.min(2)
		.optional()
		.refine((value) => value.trim().length > 6, {
			message: "Password must be least 6 characters",
		}),
}); */
