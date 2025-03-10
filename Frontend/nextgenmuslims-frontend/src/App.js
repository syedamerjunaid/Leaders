import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";  // Add some CSS for styling
import Library from "./components/Library";
import Auth from "./components/Auth";
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
            <li><Link to="/library">Library</Link></li>
            <li><Link to="/forum">Forum</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/mentorship">Mentorship</Link></li>
            <li><Link to="/payment">Payment</Link></li>
            <li><Link to="/programs">Programs</Link></li>
            <li><Link to="/training">Training</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/library" element={<Library />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/community" element={<Community />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/training" element={<Training />} />
          <Route path="/" element={<h2>Welcome! Select a service above.</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
