import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // 👁️ Eye Icons for Password Toggle
import './Profile.css';

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
  const [designs, setDesigns] = useState([]); // State to store designs
  const [orders, setOrders] = useState([]); // State to store orders

  const navigate = useNavigate();
  const API_BASE_URL = "https://cobskeebsback.onrender.com";

  // ✅ Fetch user details, designs, and orders when the page loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch user profile
        const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.status === 200) {
          setUser(data);
          // Load designs and orders after user data is fetched
          await loadDesigns(data.email);
          await loadOrders(data.email);
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

  // ✅ Handle Load Designs
  const loadDesigns = async (userEmail) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/designs/load/${userEmail}`);
      const data = await response.json();
      if (response.ok) {
        setDesigns(data.designs);
      } else {
        alert('You have no designs: ' + data.message);
      }
    } catch (error) {
      alert('Failed to load designs.');
    }
  };

  // ✅ Handle Load Orders
  const loadOrders = async (customerEmail) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/load/${customerEmail}`);
      const data = await response.json();
      if (response.ok) {
        setOrders(data.orders);
      } else {
        alert('You have no orders: ' + data.message);
      }
    } catch (error) {
      alert('Failed to load orders.');
    }
  };

  // ✅ Handle View Design
  const viewDesign = (design) => {
    navigate("/customize", { state: { design } });
  };

  // ✅ Handle Delete Design
  const deleteDesign = async (designId) => {
    if (window.confirm('Are you sure you want to delete this design?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/designs/delete/${designId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setDesigns((prevDesigns) => prevDesigns.filter((design) => design._id !== designId));
          alert('Design deleted successfully!');
        } else {
          alert('Failed to delete design.');
        }
      } catch (error) {
        console.error('Error deleting design:', error);
        alert('An error occurred while deleting the design.');
      }
    }
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <h1>Profile</h1>

        {user ? (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            {/* Password Change Form */}
            <form onSubmit={handlePasswordChange} className="password-form">
              {/* Old Password Input */}
              <div className="input-group">
                <label>Old Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="custom-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggle-password"
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
              </div>

              {/* New Password Input */}
              <div className="input-group">
                <label>New Password</label>
                <div className="password-wrapper">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="custom-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="toggle-password"
                  >
                    {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password Input */}
              <div className="input-group">
                <label>Confirm New Password</label>
                <div className="password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="custom-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="toggle-password"
                  >
                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="custom-button">Change Password</button>
            </form>

            {/* Show Messages */}
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

      {/* Load Designs */}
      <div className="load-designs">
        <h2 className="designs-title">Your Designs</h2>
        {designs.length > 0 ? (
          <div className="designs-list">
            {designs.map((design) => (
              <div key={design._id} className="design-item">
                <h3>{design.designName}</h3>
                <img
                  src={design.keyboardImage}
                  alt={design.designName}
                />
                <p>Layout: {design.layout}</p>
                <p>Switch Type: {design.switchType}</p>
                <p>Keycap Brand: {design.keycapBrand}</p>
                <div className="design-buttons">
                  <button onClick={() => viewDesign(design)}>View</button>
                  <button 
                    onClick={() => deleteDesign(design._id)} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-designs">No designs found.</p>
        )}
      </div>

      {/* Load Orders */}
      <div className="load-orders">
        <h2>Your Orders</h2>
        {orders.length > 0 ? (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-item">
                <p>Customer Name: {order.customerName}</p>
                <p>Customer Email: {order.customerEmail}</p>
                <p>Address: {order.address}</p>
                <p>Service Type: {order.serviceType}</p>
                <p>Keyboard Size: {order.keyboardSize}</p>
                <p>Keycap Brand: {order.keycapBrand}</p>
                <p>Switch Type: {order.switchType}</p>
                <p>Order Status: {order.orderStatus}</p>
                <p>Price: ₱{order.price}</p>
                <img
                  src={order.keyboardImage}
                  alt="Custom Keyboard Design"
                  style={{ width: '410px', height: 'auto' }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;