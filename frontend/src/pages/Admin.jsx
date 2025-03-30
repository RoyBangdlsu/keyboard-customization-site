import { useEffect, useState } from "react";

function Admin() {
  const [users, setUsers] = useState([]);
  const API_BASE_URL = "https://cobskeebsback.onrender.com";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/users`);
        const data = await res.json();
        if (res.status === 200) {
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Roy test</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
