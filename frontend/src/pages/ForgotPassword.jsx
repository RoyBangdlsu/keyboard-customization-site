import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter temp password, Step 3: Reset new password
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_BASE_URL = "https://cobskeebsback.onrender.com"; // Update with your backend URL

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
        setStep(2); // Move to step 2 (verify temp password)
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
      const res = await fetch("https://cobskeebsback.onrender.com/api/auth/verify-temp-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tempPassword }),
      });
  
      const data = await res.json();
      if (res.status === 200) {
        setMessage("Temporary password verified! You are now logged in.");
        
        // ✅ Store JWT Token for authentication
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
  
        // ✅ Redirect to Homepage or Dashboard
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(data.message || "Incorrect temporary password.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };
  

  // Step 3: Reset to a new password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();
      if (res.status === 200) {
        setMessage("Password reset successful! Please log in.");
      } else {
        setError(data.message || "Password reset failed.");
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

      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="custom-input"
            required
          />
          <button type="submit" className="custom-button">Set New Password</button>
        </form>
      )}

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ForgotPassword;
