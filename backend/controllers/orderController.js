import Order from "../models/Order.js";

export const placeNewOrder = async (req, res) => {
  try {
    const { type, keyboardSize, keyCapBrand, switchType, numSwitchLubing, numFilming, numStabilizer, numTapeLayer, total } = req.body; // Use frontend field names

    const newOrder = new Order({
      serviceType: type,  // Convert to match backend field name
      keyboardSize: keyboardSize,
      keycapBrand: keyCapBrand,  // Convert to match backend field name
      switchType: switchType,
      switchLubing: numSwitchLubing,
      filming: numFilming,
      stabilizers: numStabilizer,
      tapeLayers: numTapeLayer,
      price: total,  // Convert to match backend field name
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: error.message });
  }
};