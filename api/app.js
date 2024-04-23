const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors()); // GENERAL WAY
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // THIS IS OPTIONAL
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth/", require("./routes/authRoute"));
app.listen(8800, () => {
	console.log("Server is running!");
});
