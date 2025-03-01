import { useState } from "react";

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
        setMessage("A reset link has been sent to your email.");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to send request. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="custom-heading">Forgot Password</h1>
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="custom-input"
        />
        <button type="submit" className="custom-button">Reset Password</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ForgotPassword;
