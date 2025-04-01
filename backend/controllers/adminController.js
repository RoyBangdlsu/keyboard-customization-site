import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Hardcoded admin check (use environment variables in production!)
  if (email === "admin@gmail.com" && password === "admin") {
    // Generate a REAL JWT token
    const token = jwt.sign(
      { id: "admin", email: "admin@gmail.com", role: "admin" }, // Payload
      process.env.JWT_SECRET, // Sign with your secret key
      { expiresIn: "1h" }     // Token expiry
    );

    // Send the token to the frontend
    res.json({ 
      token, 
      user: { email: "admin@gmail.com", role: "admin" } 
    });
  } else {
    res.status(401).json({ message: "Invalid admin credentials" });
  }
};
// Get all users (for admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password -__v") // Exclude password and version key
      .sort({ createdAt: -1 }); // Sort by newest first
    
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Delete user (for admin)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};
