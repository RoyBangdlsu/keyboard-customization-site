import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check against hardcoded admin credentials
  if (email === "admin@gmail.com" && password === "admin") {
    // First check if this email exists in the database
    const adminUser = await User.findOne({ email: "admin@gmail.com" });
    
    // If not, create a basic admin record (optional)
    if (!adminUser) {
      const newAdmin = await User.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: await bcrypt.hash("admin", 10)
      });
    }

    // Generate token
    const token = jwt.sign(
      { 
        userId: adminUser?._id || "admin", // Use either DB ID or fallback
        email: "admin@gmail.com"
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ 
      token, 
      user: { 
        name: "Admin",
        email: "admin@gmail.com",
        isAdmin: true // Virtually added
      } 
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
