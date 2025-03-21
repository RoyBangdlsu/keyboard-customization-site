import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "./navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // ✅ Use stored user data
      } else {
        fetch("https://cobskeebsback.onrender.com/api/auth/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.name) {
              setUser(data);
              localStorage.setItem("user", JSON.stringify(data)); // ✅ Store user data
            }
          })
          .catch(() => {
            setIsLoggedIn(false);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          });
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null); // ✅ Navigate to Login Page after Logout
    navigate("/login", { replace: true });
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h2 className="navbar-title">Cobs Keebs</h2>
        </div>
        <Link to="/" className="navbar-navigations">Home</Link>
        <Link to="/about" className="navbar-navigations">About</Link>
        <Link to="/customize" className="navbar-navigations">Customize</Link>
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="navbar-navigations">{user?.name}</Link>
            <button onClick={handleLogout} className="navbar-navigations logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-navigations">Login</Link>
            <Link to="/signup" className="navbar-navigations">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
