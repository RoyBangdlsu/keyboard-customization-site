// Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-700 text-white p-5 shadow-lg flex justify-between items-center rounded-b-lg">
      <h1 className="text-3xl font-extrabold">🎹 Keyboard Customizer</h1>
      <div className="flex gap-6 text-lg">
        <Link to="/" className="hover:text-yellow-300 transition duration-200">Home</Link>
        <Link to="/about" className="hover:text-yellow-300 transition duration-200">About</Link>
        <Link to="/customize" className="hover:text-yellow-300 transition duration-200">Customize</Link>
        <Link to="/order" className="hover:text-yellow-300 transition duration-200">Order</Link>
        <Link to="/login" className="hover:text-yellow-300 transition duration-200">Login</Link>
        <Link to="/signup" className="hover:text-yellow-300 transition duration-200">Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;