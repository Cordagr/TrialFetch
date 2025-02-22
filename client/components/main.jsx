import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { UserContextProvider } from "../context/userContext";
import { Toaster } from "react-hot-toast";
import { Provider } from "jotai";
import { useAtom } from "jotai"; 


// Connecting front end to backend server
axios.defaults.baseURL = "https://trail-fetch-backend.vercel.app";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
		<React.StrictMode>
			<BrowserRouter>
			<Provider>
			<UserContextProvider>
				<Toaster
					position="bottom-center"
					toastOptions={{
						duration: 2000,
						style: {
							background: "#333",
							color: "#fff",
						},
					}}
				/>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</UserContextProvider>
				</Provider>
			</BrowserRouter>
		</React.StrictMode>
);