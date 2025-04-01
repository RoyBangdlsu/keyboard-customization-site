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

  // Replace the admin shortcut with a proper API call
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Special handling for admin (optional - could just use regular login flow)
    if (email === "admin@gmail.com" && password === "admin") {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/admin");
      } else {
        alert(data.message);
      }
      return;
    }
  
    // Regular user login
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
    if (res.ok) {
      // Add virtual isAdmin property based on email
      const userData = {
        ...data.user,
        isAdmin: data.user.email === "admin@gmail.com"
      };
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate(userData.isAdmin ? "/admin" : "/");
    } else {
      alert(data.message);
    }
  };
  

  return (
    <div className="login-page">
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