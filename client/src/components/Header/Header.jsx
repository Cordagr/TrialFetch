import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const Header = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">Trail Fetch</Link>
          </div>
          <nav className="nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/search">Search Trails</Link></li>
              {user ? (
                <>
                  <li><span>Welcome, {user.name}</span></li>
                  <li><button onClick={logout}>Logout</button></li>
                </>
              ) : (
                <li><Link to="/login">Login</Link></li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
