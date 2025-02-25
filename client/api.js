import axios from 'axios';

// Set the base URL for axios from the environment variable
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/api/auth/register', userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post('/api/auth/login', userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Add more API calls as needed