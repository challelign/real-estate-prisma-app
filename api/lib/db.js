const { PrismaClient } = require("@prisma/client");

let prisma;
if (!prisma) {
	prisma = new PrismaClient({
		log: ["info", "query", "warn", "error"],
	});
}

exports.prisma = prisma;
