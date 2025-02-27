import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import modifyRoutes from "./routes/modifyRoutes.js";
import customizeRoutes from "./routes/customizeRoutes.js"; // Make sure this is used




dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/modify", modifyRoutes);
app.use("/api/customize", customizeRoutes); // Ensure this is added

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



