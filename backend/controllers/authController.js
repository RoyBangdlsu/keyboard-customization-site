
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
import sendEmail from "../utils/sendEmail.js";


export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


dotenv.config();

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Use Gmail's SMTP server
  port: 465, // Secure SMTP
  secure: true, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password from Google
  },
});




const generateTempPassword = () => Math.floor(100000 + Math.random() * 900000).toString();

// 📌 Step 1: Generate & Store Temporary Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate a 6-digit temporary password
    const tempPassword = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);

    // Store temp password in database
    user.tempPassword = hashedTempPassword; // ✅ Save temp password
    await user.save();

    // Send temp password via email
    await sendEmail(
      user.email,
      "Your Temporary Password",
      `Your temporary password is: ${tempPassword}. Use this to reset your password.`
    );

    res.status(200).json({ message: "Temporary password sent to email." });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const verifyTempPassword = async (req, res) => {
  try {
    const { email, tempPassword } = req.body;

    if (!email || !tempPassword) {
      return res.status(400).json({ message: "Email and temporary password are required." });
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.tempPassword) {
      return res.status(400).json({ message: "No temporary password found. Request a new one." });
    }

    // Compare hashed temp password
    const isMatch = await bcrypt.compare(tempPassword, user.tempPassword);
    if (!isMatch) return res.status(400).json({ message: "Incorrect temporary password." });

    // ✅ Generate JWT Token for Auto Login
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Clear temp password from DB after successful login
    user.tempPassword = undefined;
    await user.save();

    // ✅ Send token & user data to frontend
    res.status(200).json({
      message: "Temporary password verified. You are now logged in!",
      token,
      user: { name: user.name, email: user.email },
    });

  } catch (error) {
    console.error("Verify temp password error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// 📌 Step 3: Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.tempPassword = undefined; // Remove temp password
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error." });
  }
};



export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
