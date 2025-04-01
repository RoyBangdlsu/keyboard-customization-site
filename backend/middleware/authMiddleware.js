import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Import User model

// authMiddleware.js
export const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // For admin user (identified by email)
      if (decoded.email === "admin@gmail.com") {
        req.user = {
          _id: decoded.userId,
          email: decoded.email,
          isAdmin: true // We're adding this virtually
        };
        return next();
      }

      // Regular user lookup
      req.user = await User.findById(decoded.userId).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
      
      // Add virtual isAdmin property
      req.user.isAdmin = req.user.email === "admin@gmail.com";
      
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user?.email === "admin@gmail.com") {
    return next();
  }
  res.status(403).json({ message: "Admin privileges required" });
};