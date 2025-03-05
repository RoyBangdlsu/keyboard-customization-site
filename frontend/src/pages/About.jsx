import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        <p className="justified">
          Hi, I'm Coby—the team behind Cobs Keebs! I'm a one-man team, handling everything from picking parts and recommending boards to modifying and building them. I'm just a university student who happens to love building keyboards.
        </p>
        <p className="justified">
          Thank you to all the people who have supported me and my small passion project of a business! To all my friends and family who continue to give unprecedented amounts of support and to all my clients—I couldn't have made it this far without you. Thank you for entrusting me with building your dream boards, and here's to building many more in the future!
        </p>
      </div>
      <div className="below-section">
        <div className="image-wrapper">
          <img
            src="https://i.imgur.com/ufYIf61.jpeg"
            alt="Keyboard Below"
            className="below-image"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
