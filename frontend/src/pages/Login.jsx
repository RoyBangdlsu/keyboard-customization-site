import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./Login.css";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = "https://cobskeebsback.onrender.com"; 

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ name: data.user.name , email: data.user.email})); // ✅ Store user name
      alert("Login successful!");
      navigate("/");
      window.location.reload(); // ✅ Ensure Navbar updates immediately
    } else {
      alert(data.message || "Login failed.");
    }
  };

  return (
    <div
      style={{
        background: "url('https://i.imgur.com/OM3MMmv.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="login-container">
        <h1 className="custom-heading">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative-my4">
            <BiUser className="input-icon"/>
            <input
              type="email"
              value={email}
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              className="custom-input floating-input"
            />
            <label htmlFor="email" className="floating-label">Your Email</label>
          </div>
          <div className="relative-my4">
            <AiOutlineUnlock className="input-icon" />
            <input
              type="password"
              value={password}
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              className="custom-input floating-input"
            />
            <label htmlFor="password" className="floating-label">Your Password</label>
          </div>
          <div className="custom-flex">
            <div className="flex">
              <input type="checkbox" id="" name="" />
              <label htmlFor="Remember Me" className="white-text">Remember Me</label>
            </div>
            <Link to='/forgot-password' className="text1">Forgot Password?</Link>
          </div>
          <div>
            <button 
              type="submit" 
              className="custom-button"
            >
              Login
            </button>
          </div>
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "white" }}>Don't have an account? <Link className="text1" to="/signup">Register</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
