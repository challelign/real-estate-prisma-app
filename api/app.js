const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = {
	// Specify the exact origin of your frontend application , this will also set the cookie to the  browser
	origin: "http://localhost:5173",
	credentials: true,
};
const app = express();
// app.use(cors()); // GENERAL WAY
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth/", require("./routes/authRoute"));
app.listen(8800, () => {
	console.log("Server is running!");
});
