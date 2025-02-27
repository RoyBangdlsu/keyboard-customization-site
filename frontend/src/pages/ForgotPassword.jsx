import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="login-container">
      <h1 className="custom-heading">Forgot Password</h1>
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <div className="relative-my4">
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="custom-input floating-input"
          />
        </div>
        <div>
          <button type="submit" className="custom-button">Reset Password</button>
        </div>
      </form>
      {message && <p className="text-white mt-4">{message}</p>}
    </div>
  );
}

export default ForgotPassword;