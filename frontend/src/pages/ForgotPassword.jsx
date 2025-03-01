import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const API_BASE_URL = "https://cobskeebsback.onrender.com";

  // Step 1: Request temporary password
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
        setMessage("A temporary password has been sent to your email.");
        setStep(2);
      } else {
        setError(data.message || "Failed to send email.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  // Step 2: Verify Temporary Password
  const handleVerifyTempPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/verify-temp-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tempPassword }),
      });

      const data = await res.json();
      if (res.status === 200) {
        setMessage("Temporary password verified! You can now log in.");
        
        // ✅ Redirect to login after success
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.message || "Incorrect temporary password.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="custom-heading">Forgot Password</h1>

      {step === 1 && (
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="custom-input"
            required
          />
          <button type="submit" className="custom-button">Send Temporary Password</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyTempPassword}>
          <input
            type="text"
            placeholder="Enter Temporary Password"
            value={tempPassword}
            onChange={(e) => setTempPassword(e.target.value)}
            className="custom-input"
            required
          />
          <button type="submit" className="custom-button">Verify</button>
        </form>
      )}

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ForgotPassword;
