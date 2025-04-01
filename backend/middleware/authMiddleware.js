import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Import User model

export const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password"); // Get full user data
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};


// ✅ Add isAdmin function
export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from header

  try {
    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the decoded email is admin
    if (decoded.email === "admin@gmail.com") {
      req.user = decoded; // Attach user data to the request
      next(); // Allow access
    } else {
      res.status(403).json({ message: "Not an admin" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};