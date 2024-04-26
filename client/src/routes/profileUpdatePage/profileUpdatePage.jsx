import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
function ProfileUpdatePage() {
	const { updateUser, currentUser } = useContext(AuthContext);
	const [avatar, setAvatar] = useState([]);

	console.log(avatar);
	const [cloudName] = useState("melodie");
	const [uploadPreset] = useState("chaestate");
	const [folder] = useState("avatars");

	const [uwConfig] = useState({
		cloudName,
		uploadPreset,
		folder,
		multiple: false, //restrict upload to a single file
		maxImageFileSize: 5000000, //restrict file size to less than 5MB
	});

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		const fromData = new FormData(e.target);
		const { username, email, password } = Object.fromEntries(fromData);
		const requestData = {
			username,
			email,
		};
		// Only include the password field in the request if it's not empty
		if (password) {
			requestData.password = password;
		}
		if (avatar) {
			requestData.avatar = avatar[0];
		}
		console.log(requestData);
		//   "https://res.cloudinary.com/melodie/image/upload/v1714050748/avatars/j9fbtqkw8phampyrmlsq.jpg";

		try {
			const res = await apiRequest.put(
				`/users/${currentUser.userInfo.id}`,

				requestData
			);
			/* const res = await apiRequest.put(`/users/${currentUser.userInfo.id}`, {
				username,
				email,
				password,
			}); */
			updateUser(res.data);
			navigate("/profile");

			toast.success("User created successfully !", {
				position: "top-center",
			});
			console.log(res.data);
		} catch (error) {
			console.log(error);
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
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="profileUpdatePage">
			<div className="formContainer">
				<form onSubmit={handleSubmit}>
					<h1>Update Profile</h1>
					<div className="item">
						<label htmlFor="username">Username</label>
						<input
							id="username"
							disabled={isLoading}
							defaultValue={currentUser?.userInfo.username}
							name="username"
							type="text"
						/>
					</div>
					<div className="item">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							name="email"
							disabled={isLoading}
							defaultValue={currentUser?.userInfo.email}
							type="email"
						/>
					</div>
					<div className="item">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							disabled={isLoading}
							name="password"
							type="password"
						/>
					</div>
					{error && <span className="">{error}</span>}

					<button disabled={isLoading}>Update</button>
				</form>
			</div>
			<div className="sideContainer">
				<img
					src={avatar[0] || currentUser.userInfo.avatar || "/noava.png"}
					alt="Avatar Cloudinary"
					className="avatar"
				/>

				<UploadWidget uwConfig={uwConfig} setState={setAvatar} />
			</div>
		</div>
	);
}

export default ProfileUpdatePage;
