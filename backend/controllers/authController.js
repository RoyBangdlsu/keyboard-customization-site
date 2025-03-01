
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";


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


import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

const generateTempPassword = () => Math.floor(100000 + Math.random() * 900000).toString();

// 📌 Step 1: Send Temporary Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate and hash temp password
    const tempPassword = generateTempPassword();
    user.tempPassword = await bcrypt.hash(tempPassword, 10);
    await user.save();

    // Send email
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

// 📌 Step 2: Verify Temporary Password
export const verifyTempPassword = async (req, res) => {
  try {
    const { email, tempPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(tempPassword, user.tempPassword);
    if (!isMatch) return res.status(400).json({ message: "Incorrect temporary password" });

    res.status(200).json({ message: "Temporary password verified." });

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
