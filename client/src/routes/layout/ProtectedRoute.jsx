import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const ProtectedRoute = () => {
	const { currentUser } = useContext(AuthContext);
	useEffect(() => {
		if (!currentUser) {
			<Navigate to="/login" />;
		}
	}, [currentUser]);

	console.log(currentUser);
	return (
		<>
			{currentUser && currentUser?.userInfo?.username ? (
				<div className="layout">
					<div className="navbar">
						<Navbar />
					</div>
					<div className="content">
						<Outlet />
					</div>
				</div>
			) : (
				<Navigate to="/login" />
			)}
		</>
	);
};

export default ProtectedRoute;
