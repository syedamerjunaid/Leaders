import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";  
import Auth from "./components/Auth";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";  // ✅ Import ProtectedRoute
import Library from "./components/Library";
import Forum from "./components/Forum";
import Community from "./components/Community";
import Mentorship from "./components/Mentorship";
import Payment from "./components/Payment";
import Programs from "./components/Programs";
import Training from "./components/Training";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <h2>NextGen Muslims</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/auth">Auth</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 Protected Routes - Only logged-in users can access these */}
          <Route element={<ProtectedRoute />}>
            <Route path="/library" element={<Library />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/community" element={<Community />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/training" element={<Training />} />
          </Route>

          <Route path="/" element={<h2>Welcome! Select a service above.</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
