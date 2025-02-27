
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


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 3600000; // 1 hour validity

    await user.save();

    // Reset password URL
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Email options
    const mailOptions = {
      from: `"Cobs Keebs Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click the link below to reset your password:\n\n${resetURL}\n\nIf you did not request this, please ignore this email.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("✅ Password reset email sent!");
    res.status(200).json({ message: "Password reset email sent!" });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};





export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find user by reset token
    const user = await User.findOne({ 
      resetToken: token, 
      resetTokenExpire: { $gt: Date.now() } // Ensure token is still valid
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and remove reset token
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpire = null;

    // Save changes
    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("❌ Reset password error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


