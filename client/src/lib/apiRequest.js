import axios from "axios";

const apiRequest = axios.create({
	baseURL: "http://localhost:8800/api",
	/*  if it is true we need to add node js app.js to this
	 app.use(cors({ origin: "http://localhost:5173" credentials: true }))  */
	withCredentials: true,
});

export default apiRequest;
