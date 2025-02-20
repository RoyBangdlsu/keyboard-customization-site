import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/"); // Redirect to Home after login
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-8 bg-white shadow-xl rounded-lg w-1/3 mx-auto border border-gray-200">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-800">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;