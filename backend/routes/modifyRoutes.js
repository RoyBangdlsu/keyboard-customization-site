import express from "express";
import { placeRequest } from "../controllers/modifyController.js";

const router = express.Router();

// Route to place a new order
router.post("/placerequest", placeRequest);

// Route to get all orders
//router.get("/", getOrders);

export default router;