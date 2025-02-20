import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("/login", { email, password })
            .then(response => {
                if (response.data.success) {
                    setUser(response.data.user);
                    navigate("/");
                } else {
                    console.error("Login failed:", response.data.message);
                }
            })
            .catch(error => {
                console.error("Error logging in:", error);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
