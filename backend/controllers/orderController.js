import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  try {
    const { serviceType, keyboardSize, keycapBrand, switchType, price } = req.body;

    const newOrder = new Order({
      serviceType,
      keyboardSize,
      keycapBrand,
      switchType,
      price,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: error.message });
  }
};