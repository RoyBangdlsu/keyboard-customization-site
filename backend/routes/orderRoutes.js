import express from "express";
import { placeNewOrder } from "../controllers/orderController.js";

const router = express.Router();

// Route to place a new order
router.post("/placeneworder", placeNewOrder);

// Route to get all orders
//router.get("/", getOrders);

export default router;