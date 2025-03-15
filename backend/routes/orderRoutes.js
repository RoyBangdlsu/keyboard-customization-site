import express from "express";
import { placeNewOrder, loadOrders } from "../controllers/orderController.js";

const router = express.Router();

// Route to place a new order
router.post("/placeneworder", placeNewOrder);

// Route to get all orders
router.get('/load/:userEmail', loadOrders);

export default router;