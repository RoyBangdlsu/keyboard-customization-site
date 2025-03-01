import express from "express";
import { signup, login, forgotPassword, getUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js"; // Import middleware

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/profile", protect, getUserProfile); // Fetch user profile
router.post("/change-password", protect, changePassword); // Update password

export default router;
