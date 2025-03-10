import React, { useState } from "react";
import { register } from "../services/authService";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await register(userData);
    if (result) {
      alert("Registration Successful!");
    } else {
      alert("Registration Failed!");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="username" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
          <option value="general">General User</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
