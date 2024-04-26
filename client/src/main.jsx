import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CloudinaryScriptContext } from "./components/uploadWidget/UploadWidget.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthContextProvider>
			<CloudinaryScriptContext.Provider value={{ loaded: false }}>
				<ToastContainer
					position="top-right"
					// autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
				<App />;
			</CloudinaryScriptContext.Provider>
		</AuthContextProvider>
	</React.StrictMode>
);
