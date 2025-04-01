import jwt from "jsonwebtoken";
import User from "../models/User.js";

// General auth protection
export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1]; // Get token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Admin check (uses email from .env)
export const isAdmin = (req, res, next) => {
  const adminEmail = process.env.ADMIN_EMAIL; // e.g., "admin@gmail.com"
  
  if (req.user?.email === adminEmail) {
    next(); // Grant access
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};