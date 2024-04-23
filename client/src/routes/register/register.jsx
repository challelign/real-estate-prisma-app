import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
// const backendBaseUrl = process.env.BACKEND_BASE_URL;

function Register() {
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const username = formData.get("username");
		const email = formData.get("email");
		const password = formData.get("password");
		try {
			const res = await axios.post(`http://localhost:8800/api/auth/register`, {
				username,
				email,
				password,
			});
			navigate("/login");
			toast.success("Success Notification !", {
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
						{Object.keys(errors).map(
							(key, index) => setError(`${key}: ${errors[key]}`)
							// setError(`${errors[key]}`)
						)}
					</div>
				);
				// Display or handle the validation errors as needed
			} else if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				console.error("Error:", error.response.data.message);
				setError(error.response.data.message);
				// Display the error message in your UI or handle it as needed
			} else {
				console.error("Error:", error.message);
				setError(error.message);
			}
		}
	};
	return (
		<div className="register">
			<div className="formContainer">
				<form onSubmit={handleSubmit}>
					<h1>Create an Account</h1>
					<input name="username" type="text" placeholder="Username" />
					<input name="email" type="text" placeholder="Email" />
					<input name="password" type="password" placeholder="Password" />
					{error && <span>{error}</span>}
					<button>Register</button>
					<Link to="/login">Do you have an account?</Link>
				</form>
			</div>
			<div className="imgContainer">
				<img src="/bg.png" alt="" />
			</div>
		</div>
	);
}

export default Register;
