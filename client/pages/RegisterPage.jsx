import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post("/register", { name, email, password })
            .then(response => {
                if (response.data.success) {
                    setUser(response.data.user);
                    navigate("/");
                } else {
                    console.error("Registration failed:", response.data.message);
                }
            })
            .catch(error => {
                console.error("Error registering:", error);
            });
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
