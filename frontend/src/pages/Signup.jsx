import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = "https://cobskeebsback.onrender.com";

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.status === 201) {
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="custom-heading">Sign Up</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="relative-my4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="custom-input"
          />
        </div>
        <div className="relative-my4">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="custom-input"
          />
        </div>
        <div className="relative-my4">
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="custom-input"
          />
        </div>
        <button type="submit" className="custom-button">Register</button>
      </form>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <span>Already have an account? <Link to="/login">Sign In</Link></span>
      </div>
    </div>
  );
}

export default Signup;
