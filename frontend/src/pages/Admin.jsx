import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Admin.css';

function Admin() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]); // Add orders state
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

        // Fetch orders
        const ordersRes = await fetch(`${API_BASE_URL}/api/orders/loadall`);
        const ordersData = await ordersRes.json();
        if (ordersRes.ok) {
          setOrders(ordersData.orders); // Set the orders state
        } else {
          setError('Failed to load orders: ' + ordersData.message);
        }
  
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));
    
    // Check admin status by email (since we don't have isAdmin field)
    if (!userData || userData.email !== "admin@gmail.com") {
      setError("Access denied. Admin privileges required.");
      return;
    }
  
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res.ok) {
        // Optimistic UI update - remove the user from state immediately
        setUsers(users.filter(user => user._id !== userId));
        setError(""); // Clear any previous errors
      } else {
        const data = await res.json();
        setError(data.message || "Failed to delete user.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Network error. Please try again.");
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Update the order in state
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        ));
      } else {
        const data = await res.json();
        setError(data.message || "Failed to update order status");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {loading && <div className="loading">Loading users and orders...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <div className="main-container">
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
          
          <div className="orders-table-container">
            <h2>All Orders</h2>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Service Type</th>
                  <th>Keyboard Size</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.customerName}</td>
                    <td>{order.customerEmail}</td>
                    <td>{order.serviceType}</td>
                    <td>{order.keyboardSize}</td>
                    <td>${order.price}</td>
                    <td>
                      <select 
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;