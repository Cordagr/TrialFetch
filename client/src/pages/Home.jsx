import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";

const HomePage = () => {
    const { user, logout, loading } = useContext(UserContext);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home-container">
            <h1>Welcome to Trail Fetch</h1>
            {user ? (
                <div className="user-info">
                    <h2>Hello, {user.name}!</h2>
                    <p>Email: {user.email}</p>
                    <button onClick={logout} className="logout-btn">Logout</button>
                    <div>
                        <Link to="/search">Search Trails</Link>
                    </div>
                </div>
            ) : (
                <div className="auth-links">
                    <p>Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to access more features.</p>
                    <Link to="/search">Search Trails</Link>
                </div>
            )}
        </div>
    );
};

export default HomePage;
