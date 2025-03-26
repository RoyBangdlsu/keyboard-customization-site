import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_BASE_URL = "https://cobskeebsback.onrender.com";

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.status === 200) {
        setMessage("A temporary password has been sent to your email. Use it to log in.");
      } else {
        setError(data.message || "Failed to send email.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="custom-heading">Forgot Password</h1>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div className="relative-my4">
            <input
              type="email"
              value={email}
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              className="custom-input floating-input"
              required
            />
            <label htmlFor="email" className="floating-label">Enter your email</label>
          </div>
          <button type="submit" className="custom-button">
            Send Temporary Password
          </button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <div style={{ textAlign: "center" }}>
          <span style={{ color: "white" }}>
            Remembered your password? <Link className="text1" to="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
