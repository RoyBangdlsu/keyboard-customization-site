import { NavLink, useNavigate } from "react-router-dom";
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
        setUser(JSON.parse(storedUser));
      } else {
        fetch("https://cobskeebsback.onrender.com/api/auth/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.name) {
              setUser(data);
              localStorage.setItem("user", JSON.stringify(data));
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/home", { replace: true });
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h2 className="navbar-title">Cobs Keebs</h2>
        </div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            "navbar-navigations" + (isActive ? " active" : "")
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            "navbar-navigations" + (isActive ? " active" : "")
          }
        >
          About
        </NavLink>
        {isLoggedIn ? (
          <>
          <NavLink
              to="/customize"
              className={({ isActive }) =>
                "navbar-navigations" + (isActive ? " active" : "")
              }
            >
              Customize
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                "navbar-navigations" + (isActive ? " active" : "")
              }
            >
              {user?.name}
            </NavLink>
            <button onClick={handleLogout} className="navbar-navigations logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                "navbar-navigations" + (isActive ? " active" : "")
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                "navbar-navigations" + (isActive ? " active" : "")
              }
            >
              Signup
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
