import axios from "axios";
import API_ROUTES from "../config";

export const register = async (userData) => {
  try {
    console.log("🔹 Registering user:", userData);  // ✅ Log request data
    const response = await axios.post(`${API_ROUTES.auth}/register`, userData, {
      headers: { "Content-Type": "application/json" },  // ✅ Ensure correct headers
    });
    console.log("✅ Registration Success:", response.data);  // ✅ Log response
    return response.data;
  } catch (error) {
    console.error("❌ Registration Error:", error.response?.data || error.message);  // Log error details
    return null;
  }
};


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

