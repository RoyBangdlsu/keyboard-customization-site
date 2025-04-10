import express from "express";
import { 
  placeNewOrder, 
  loadOrders, 
  loadAllOrders, 
  deleteOrder,
  updateOrderStatus 
} from "../controllers/orderController.js";

const router = express.Router();

// Route to place a new order
router.post("/placeneworder", placeNewOrder);

// Route to get orders for a specific customer
router.get('/load/:customerEmail', loadOrders);

// Route to get all orders
router.get('/loadall', loadAllOrders);

// Route to delete an order
router.delete('/delete/:orderId', deleteOrder);

// Route to update order status
router.patch('/:orderId/status', updateOrderStatus);

export default router;