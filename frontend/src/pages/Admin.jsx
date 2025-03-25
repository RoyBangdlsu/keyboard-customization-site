import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const API_BASE_URL = "https://cobskeebsback.onrender.com";

  /*useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.status === 200) {
          setUsers(data);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [navigate]);*/

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {/*users.map((user) => (
          <li key={user._id}>{user.name} ({user.email})</li>
        ))*/}
      </ul>
    </div>
  );
}

export default Admin;
