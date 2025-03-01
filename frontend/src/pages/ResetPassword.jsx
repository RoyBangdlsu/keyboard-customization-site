import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = "https://cobskeebsback.onrender.com";

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      if (res.status === 200) {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.message || "Password reset failed.");
      }
    } catch (err) {
      setError("Failed to reset password. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="custom-heading">Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          value={newPassword}
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
          className="custom-input"
        />
        <button type="submit" className="custom-button">Set New Password</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ResetPassword;
