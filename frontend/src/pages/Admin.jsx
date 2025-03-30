import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = "https://cobskeebsback.onrender.com";

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!token || !storedUser?.isAdmin) {
        navigate("/");
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUsers(data);
        } else {
          setError(data.message || "Failed to load users.");
          navigate("/");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Server error.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <h1 className="custom-heading">Admin Dashboard</h1>
      <button onClick={handleLogout} className="custom-button logout-btn">Logout</button>

      {loading && <p>Loading users...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user._id}>
              <strong>{user.name}</strong> ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Admin;
