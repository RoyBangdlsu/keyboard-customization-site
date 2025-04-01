import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Admin.css';

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = "https://cobskeebsback.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      
      // Check if the logged-in user has the admin email
      if (!token || !user || user.email !== "admin@gmail.com") {
        navigate("/login");
        return;
      }
  
      try {
        // Fetch users
        const usersRes = await fetch(`${API_BASE_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (usersRes.ok) {
          setUsers(await usersRes.json());
        } else {
          setError("Failed to load users");
        }
      } catch (err) {
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [navigate]);

  const loadAllOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/loadall`);
      const data = await response.json();
      if (response.ok) {
        setOrders(data.orders); // This will now contain ALL orders
      } else {
        alert('Failed to load orders: ' + data.message);
      }
    } catch (error) {
      alert('Failed to load orders.');
    }
  };

  /*useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
  
        // Fetch user profile to verify admin status
        const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const data = await res.json();
        if (res.status === 200) {
          setUser(data);
          
          // Only load all orders if user is admin
          if (data.isAdmin) {
            await loadAllOrders(); // This will load ALL orders now
          } else {
            // If not admin, redirect or show error
            setError("Admin privileges required.");
            navigate("/"); // Redirect to home or appropriate page
          }
        } else {
          setError("Failed to fetch user details.");
        }
      } catch (err) {
        setError("Error loading profile.");
      }
    };
  
    fetchUserData();
  }, [navigate]); // Add navigate to dependency array*/

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDeleteUser = async (userId) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    
    if (!userData?.isAdmin) {
      setError("Access denied. Admin privileges required.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers(users.filter(user => user._id !== userId));
      } else {
        const data = await res.json();
        setError(data.message || "Failed to delete user.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Server error.");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {loading && <div className="loading">Loading users...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button 
                      onClick={() => handleDeleteUser(user._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;