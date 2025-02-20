import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (res.status === 201) {
      alert("Signup successful! You can now log in.");
      navigate("/login"); // Redirect to Login after signup
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-8 bg-white shadow-xl rounded-lg w-1/3 mx-auto border border-gray-200">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
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
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-800">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
