const { prisma } = require("../lib/db");

exports.getPosts = async (req, res) => {
	try {
		const posts = await prisma.post.findMany({});
		res.status(200).json(posts);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Failed to get posts" });
	}
};
exports.getPost = async (req, res) => {
	const id = req.params.id;
	try {
		const post = await prisma.post.findUnique({
			where: {
				id,
			},
			include: {
				user: {
					select: {
						id: true,
						username: true,
						email: true,
						avatar: true,
					},
				},
				postDetail: true,
				imagesPost: true,
			},
		});
		res.status(200).json(post);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Failed to get post" });
	}
};
exports.addPost = async (req, res) => {
	const body = req.body;
	const tokenUserId = req.userId;
	console.log(body);
	console.log("AddPost from From the Frontend", body);

	console.log("tokenUserIdCREATE_POST", tokenUserId);

	if (!tokenUserId) {
		return res.status(404).json({ message: "Your are not authorized" });
	}

	// console.log("imagesPost", body.imagesPost);
	try {
		const newPost = await prisma.post.create({
			data: {
				...body.postData,
				userId: tokenUserId,
				// for imagesPost and postDetail may be creating independent controller is best
				postDetail: {
					create: body.postDetail,
				},
				imagesPost: {
					create: body.postData.imagesPost.map((url) => ({
						url,
					})),
				},
			},
			include: {
				postDetail: true,
				imagesPost: true,
			},
		});
		res.status(200).json({ message: "Post created successfully", newPost });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Failed to add posts" });
	}
};
exports.deletePost = async (req, res) => {
	try {
		const tokenUserId = req.userId;
		const postId = req.params.id;
		if (!tokenUserId) {
			return res.status(404).json({ message: "Your are not loggedin" });
		}

		const post = await prisma.post.findUnique({
			where: {
				id: postId, // if post is 1 to 1 relation we can use userId = tokenUserId, but 1 user have many post
			},
		});
		console.log("=====>post===>", post);

		if (post.userId !== tokenUserId) {
			return res.status(404).json({ message: "Your are not authorized" });
		}
		const deletePost = await prisma.post.delete({
			where: {
				id: postId,
				userId: tokenUserId,
			},
		});
		res.status(200).json({ message: "Post delete successfully" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Failed to delete posts" });
	}
};
exports.updatePost = async (req, res) => {
	try {
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Failed to update posts" });
	}
};
