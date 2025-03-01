import express from "express";
import { signup, login, forgotPassword, resetPassword, getUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js"; // Import middleware

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", protect, getUserProfile); // ✅ NEW: Get logged-in user's profile

export default router;
