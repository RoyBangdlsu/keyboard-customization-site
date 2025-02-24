import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/signup", {
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
    <div
      style={{
        background: "url('../src/assets/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Using the same container class as in Login.jsx */}
      <div className="login-container">
        <h1 className="custom-heading">Sign Up</h1>
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
          {/* Checkbox for terms and conditions */}
          <div className="custom-flex">
            <div className="flex">
              <input type="checkbox" id="terms" name="terms" />
              <label htmlFor="terms" className="white-text">
                I agree to the terms &amp; conditions
              </label>
            </div>
          </div>
          <div>
            <button type="submit" className="custom-button">
              Register
            </button>
          </div>
        </form>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <span style={{ color: "white" }}>
            Already have an account?{" "}
            <Link className="text1" to="/login">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
