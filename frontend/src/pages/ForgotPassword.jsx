import { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import navigate

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ Add this

  const API_BASE_URL = "https://cobskeebsback.onrender.com";

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
        setMessage("Temporary password verified! You are now logged in.");

        // ✅ Store JWT Token for authentication
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Redirect to Homepage after 2 seconds
        setTimeout(() => navigate("/"), 2000);
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
