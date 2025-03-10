import axios from "axios";
import API_ROUTES from "../config";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_ROUTES.auth}/login`, {
      email,
      password,
    });
    return response.data; // Token or user data
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_ROUTES.auth}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error);
    return null;
  }
};
