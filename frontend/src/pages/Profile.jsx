import { useEffect, useState } from "react";



function Profile() {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <div className="p-8 bg-white shadow-xl rounded-lg w-1/3 mx-auto border border-gray-200 mt-10">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p className="text-lg"><strong>Name:</strong> {user.name}</p>
      <p className="text-lg"><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default Profile;
