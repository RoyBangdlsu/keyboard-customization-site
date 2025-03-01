
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




export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // ✅ Generate a 6-digit temporary password
    const tempPassword = Math.random().toString(36).slice(-6);
    
    // ✅ Hash the temporary password
    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);

    // ✅ Update the user's password to the temporary password
    user.password = hashedTempPassword;
    await user.save();

    // ✅ Send the email with the temporary password
    await sendEmail({
      to: user.email,
      subject: "Your Temporary Password",
      text: `Your temporary password is: ${tempPassword}\n\nUse this password to log in and change it immediately.`,
    });

    res.status(200).json({ message: "Temporary password sent to your email." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error. Try again later." });
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
