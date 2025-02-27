import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

const HomePage = () => {
    const { user, logout } = useContext(UserContext);

    return (
        <div>
            <h1>Welcome to TrailFetch</h1>
            {user ? (
                <div>
                    <p>Hello, {user.name}!</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <p>Please log in to access more features.</p>
            )}
        </div>
    );
};

export default HomePage;
