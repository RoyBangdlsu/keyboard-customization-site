import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../assets/logo.png"; // Adjust the path as needed

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h2 className="navbar-title">Cobs Keebs</h2>
        </div>
        <Link to="/" className="navbar-navigations">Home</Link>
        <Link to="/about" className="navbar-navigations">About</Link>
        <Link to="/login" className="navbar-navigations">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
