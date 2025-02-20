import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  res.send("Customization API working!");
});

export default router; // ✅ Ensure this line is present
