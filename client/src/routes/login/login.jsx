import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
function Login() {
	const { updateUser } = useContext(AuthContext);

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		const formData = new FormData(e.target);
		const username = formData.get("username");
		const password = formData.get("password");
		try {
			const res = await apiRequest.post(`/auth/login`, {
				username,
				password,
			});
			// this code is replace with contextApi
			// localStorage.setItem("UserData", JSON.stringify(res.data));

			updateUser(res.data);
			navigate("/home");
			toast.success("Login successfully !", {
				position: "top-center",
			});
			console.log(res.data);
		} catch (error) {
			console.log(error);
			// setError(err.response.message);
			if (error.response && error.response.data && error.response.data.errors) {
				const errors = error.response.data.errors;
				console.error("Validation Errors:", errors);
				return (
					<div>
						{Object.keys(errors).map((key, index) =>
							setError(`${errors[key]}`)
						)}
					</div>
				);
			} else if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				console.error("Error:", error.response.data.message);
				setError(error.response.data.message);
			} else {
				console.error("Error:", error.message);
				setError(error.message);
			}
			setError(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="login">
			<div className="formContainer">
				<form onSubmit={handleSubmit}>
					<h1>Welcome back</h1>
					<input
						name="username"
						disabled={isLoading}
						type="text"
						placeholder="Username"
					/>
					<input name="password" type="password" placeholder="Password" />
					{error && <span>{error}</span>}
					<button disabled={isLoading}> Login</button>
					<Link to="/register">{"Don't"} you have an account?</Link>
				</form>
			</div>
			<div className="imgContainer">
				<img src="/bg.png" alt="" />
			</div>
		</div>
	);
}

export default Login;
