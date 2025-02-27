import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log("Sending data:", { token, newPassword }); // Debugging log
  
    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
  
    const data = await res.json();
    console.log("Response received:", data); // Debugging log
  
    if (res.status === 200) {
      alert("Password reset successful! You can now log in.");
      navigate("/login");
    } else {
      alert(data.message);
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
      {message && <p className="text-white mt-4">{message}</p>}
    </div>
  );
}

export default ResetPassword;