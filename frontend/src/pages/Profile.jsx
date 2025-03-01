import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const API_BASE_URL = "https://cobskeebsback.onrender.com";

  // ✅ Fetch user details when the page loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.status === 200) {
          setUser(data);
        } else {
          setError("Failed to fetch user details.");
        }
      } catch (err) {
        setError("Error loading profile.");
      }
    };

    fetchUserData();
  }, [navigate]);

  // ✅ Handle Password Change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();
      if (res.status === 200) {
        setMessage("Password updated successfully.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message || "Failed to change password.");
      }
    } catch (err) {
      setError("Error changing password.");
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h1 className="custom-heading">Profile</h1>

      {user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          {/* Password Change Form */}
          <form onSubmit={handlePasswordChange}>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="custom-input"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="custom-input"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="custom-input"
              required
            />
            <button type="submit" className="custom-button">Change Password</button>
          </form>

          {/* Logout Button */}
          <button onClick={handleLogout} className="custom-button logout-btn">Logout</button>

          {/* Show Messages */}
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
