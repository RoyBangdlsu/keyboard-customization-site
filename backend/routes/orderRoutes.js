import express from "express";
import { placeNewOrder, loadOrders, loadAllOrders } from "../controllers/orderController.js";

const router = express.Router();

// Route to place a new order
router.post("/placeneworder", placeNewOrder);

// Route to get orders for a specific customer
router.get('/load/:customerEmail', loadOrders);

// New route to get all orders
router.get('/loadall', loadAllOrders);

export default router;