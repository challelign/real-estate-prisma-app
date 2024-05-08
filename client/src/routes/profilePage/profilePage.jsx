import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/LoadingSkeleton/Loading";
import Card from "../../components/card/Card";

function ProfilePage() {
	const posts = useLoaderData();

	const navigate = useNavigate();
	const { updateUser, currentUser } = useContext(AuthContext);

	const handleLogout = async () => {
		console.log("logout");
		try {
			await apiRequest.post(`/auth/logout`);
			// localStorage.removeItem("UserData");
			updateUser(null);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="profilePage">
			<div className="details">
				<div className="wrapper">
					<div className="title">
						<h1>User Information</h1>
						<Link to="/profile/update">
							<button>Update Profile</button>
						</Link>
					</div>
					<div className="info">
						<span>
							Avatar:
							<img src={currentUser?.userInfo?.avatar || "/noava.png"} alt="" />
						</span>
						<span>
							Username: <b>{currentUser?.userInfo?.username}</b>
						</span>
						<span>
							E-mail: <b>{currentUser?.userInfo?.email}</b>
						</span>
						<button onClick={handleLogout}>Logout</button>
					</div>
					<div className="title">
						<h1>My List</h1>

						<Link to="/add">
							<button>Create New Post</button>
						</Link>
					</div>
					{/* <List /> */}

					<Suspense
						fallback={
							<>
								<h3>Loading Posts ... It wont be long</h3>
								<Loading />
							</>
						}
					>
						<Await
							resolve={posts.postResponse}
							errorElement={<p>Error loading posts!</p>}
						>
							{(postResponse) => <List posts={postResponse.data.userPosts} />}
						</Await>
					</Suspense>
					<div className="title">
						<h1>Saved List</h1>
					</div>
					{/* <List /> */}
					<Suspense
						fallback={
							<>
								<h3>Loading Posts ... It wont be long</h3>
								<Loading />
							</>
						}
					>
						<Await
							resolve={posts.postResponse}
							errorElement={<p>Error loading posts!</p>}
						>
							{(postResponse) => <List posts={postResponse.data.savedPosts} />}
						</Await>
					</Suspense>
				</div>
			</div>
			<div className="chatContainer">
				<div className="wrapper">
					<Chat />
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
