import express from "express";
import { placeOrder } from "../controllers/orderController.js";

const router = express.Router();

// Route to place a new order
router.post("/placeorder", placeOrder);

// Route to get all orders
//router.get("/", getOrders);

export default router;