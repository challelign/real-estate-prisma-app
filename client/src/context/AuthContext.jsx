import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
	/* 
    const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem("TokenLocalStorage")) || null
	);

	const updateUser = (data) => {
		setCurrentUser(data);
	};
	useEffect(() => {
		localStorage.setItem("TokenLocalStorage", JSON.stringify(currentUser));
	}, [currentUser]); 
    
    */

	const [currentUser, setCurrentUser] = useState(() => {
		try {
			return JSON.parse(localStorage.getItem("TokenLocalStorage")) || null;
		} catch (error) {
			console.error("Error accessing local storage:", error);
			return null;
		}
	});
	const updateUser = (data) => {
		console.log(data);
		setCurrentUser(data);
	};

	useEffect(() => {
		try {
			localStorage.setItem("TokenLocalStorage", JSON.stringify(currentUser));
		} catch (error) {
			console.error("Error updating local storage:", error);
		}
	}, [currentUser]);
	return (
		<AuthContext.Provider value={{ currentUser, updateUser }}>
			{children}
		</AuthContext.Provider>
	);
};
