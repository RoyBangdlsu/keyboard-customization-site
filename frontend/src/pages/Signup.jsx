import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = "https://keyboard-customization-site1.onrender.com";

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
    <div className="signup-page">
    <div className="signup-container">
      <h1 className="custom-heading">Registration</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="relative-my4">
          <input
            type="text"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="custom-input floating-input"
          />
              <label htmlFor="name" className="floating-label">
              Full Name
            </label>
        </div>
        <div className="relative-my4">
          <input
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="custom-input floating-input"
          />
            <label htmlFor="email" className="floating-label">
              Your Email
            </label>
        </div>
        <div className="relative-my4">
          <input
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="custom-input floating-input"
          />
            <label htmlFor="password" className="floating-label">
              Your Password
            </label>
        </div>
        <div className="custom-flex">
            <div className="flex">
              <input type="checkbox" id="terms" name="terms" />
              <label htmlFor="terms" className="white-text">
                I agree to the terms &amp; conditions
              </label>
            </div>
          </div>
        <button type="submit" className="custom-button">Register</button>
      </form>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <span style={{ color: "white" }}>Already have an account? <Link className="text1" to="/login">Sign In</Link></span>
      </div>
    </div>
    </div>
  );
}

export default Signup;
