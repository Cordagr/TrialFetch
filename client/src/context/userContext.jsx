import axios from "../../api.js";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const fetchUser = async () => {
      console.log("Fetching user profile...");
      try {
        const { data } = await axios.get('/api/auth/profile');
        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      console.log("Logging out...");
      await axios.post('/api/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};
