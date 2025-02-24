import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  try {
    const { type, keyboardSize, keyCapBrand, switchType, total } = req.body; // Use frontend field names

    const newOrder = new Order({
      serviceType: type,  // Convert to match backend field name
      keyboardSize,
      keycapBrand: keyCapBrand,  // Convert to match backend field name
      switchType,
      price: total,  // Convert to match backend field name
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: error.message });
  }
};
