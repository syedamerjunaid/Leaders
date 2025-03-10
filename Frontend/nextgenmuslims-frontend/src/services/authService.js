import axios from "axios";
import API_ROUTES from "../config";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_ROUTES.auth}/login`,
      new URLSearchParams({
        username: email,  // ✅ FastAPI expects "username" instead of "email"
        password: password,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }  // ✅ Required for OAuth2
    );
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    return null;
  }
};


export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_ROUTES.auth}/register`, userData, {
      headers: { "Content-Type": "application/json" },  // ✅ Ensure correct headers
    });
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    return null;
  }
};
