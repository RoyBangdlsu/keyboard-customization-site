import express from "express";
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.send("Order API is working!");
});

export default router; // ✅ Ensure this line is present
