import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Button from "../components/Button";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Updated keyboard images with direct Google Drive links
  const keyboardImages = [
    "https://drive.google.com/uc?export=view&id=1mqCNuFbfqdOA1VtUDy4H6BX3S_cLf3Nc",
    "https://drive.google.com/uc?export=view&id=19LEoNRkljXV2mk9w8H6Jcl_x1JkijdAA",
    "https://drive.google.com/uc?export=view&id=1AOi1uHPUq-Nom5pNE6Ipr2jeWV3s6VFV",
    "https://drive.google.com/uc?export=view&id=1hyFZbbuLD13EL-PKReF733ffwnEWaY4G"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % keyboardImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + keyboardImages.length) % keyboardImages.length
    );
  };

  return (
    <div className="hero-container">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h2 className="title">KeebCraft Studio</h2>
        <h3 className="subtitle">Design your own mechanical keyboard with ease.</h3>
        <p className="description">
          Welcome to Cobs Keebs, where we bring your ideal keyboard design into reality.
        </p>
        {isLoggedIn ? (
          <Link to="/customize">
            <Button className="start-button">Get Started</Button>
          </Link>
        ) : (
          <Link to="/signup">
            <Button className="start-button">Get Started</Button>
          </Link>
        )}
      </div>

      <div className="hero-carousel">
        <div className="carousel-box">
          <button className="arrow-button left" onClick={prevSlide}>
            &lt;
          </button>

          <img
            src={keyboardImages[currentIndex]}
            alt="Keyboard Carousel"
            className="carousel-image"
          />

          <button className="arrow-button right" onClick={nextSlide}>
            &gt;
          </button>

          {/* Dot indicators below the image */}
          <div className="dots">
            {keyboardImages.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
