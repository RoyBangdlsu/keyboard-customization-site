import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import "./Login.css";

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
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");

      // ✅ If admin, redirect to admin page
      if (email === "admin@gmail.com" && password === "admin") {
        navigate("/admin");
      } else {
        navigate("/"); // ✅ Regular user goes to home
      }
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
            <Link to='' className="text1">Forgot Password?</Link>
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