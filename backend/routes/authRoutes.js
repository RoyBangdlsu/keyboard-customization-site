import express from "express";
import { signup, login, forgotPassword, getUserProfile, changePassword } from "../controllers/authController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js"; // ✅ Import isAdmin

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/profile", protect, getUserProfile); // Fetch user profile
router.post("/change-password", protect, changePassword); // Update password

router.get("/admin", protect, isAdmin, (req, res) => {
    res.json({ message: "Welcome, Admin!" });
  });

export default router;

