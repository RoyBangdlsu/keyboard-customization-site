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
  if (req.user && req.user.email === "admin@gmail.com") { // Check admin status
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};
