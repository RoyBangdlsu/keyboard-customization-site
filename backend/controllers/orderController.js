import Order from "../models/Order.js";
import nodemailer from "nodemailer";

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const placeNewOrder = async (req, res) => {
  try {
    const { 
      customerName, 
      customerEmail,
      address, 
      type, 
      keyboardSize, 
      keyCapBrand, 
      switchType,
      numSwitchLubing,
      switchLubingPrice,
      numFilming,
      filmingPrice,
      numStabilizer,
      stabilizerPrice,
      numTapeLayer,
      tapeLayerPrice,
      caseFoam,
      PEFoam,
      total, 
      keyboardImage, 
      keyCapBrandPrice, 
      keyboardSizePrice, 
      switchTypePrice,
      stabilizerKeys,
      lubingKeys,
      filmingKeys 
    } = req.body;

    const email = customerEmail;
    const adminEmail = "rappykarlopi@gmail.com";

    const newOrder = new Order({
      customerName,
      customerEmail,
      serviceType: type,
      address,
      keyboardSize,
      keycapBrand: keyCapBrand,
      switchType,
      switchLubing: numSwitchLubing,
      lubingKeys: lubingKeys || "None", // Store as string
      filming: numFilming,
      filmingKeys: filmingKeys || "None", // Store as string
      stabilizers: numStabilizer,
      stabilizerKeys: stabilizerKeys || "None", // Store as string
      tapeLayers: numTapeLayer,
      caseFoam,
      PEFoam,
      price: total,
      keyboardImage
    });

    await newOrder.save();
    
    // Email content with formatted key lists
    const formatKeys = (keys) => {
      if (!keys || keys === "None") return "None";
      return keys.split(',').map(key => key.trim()).join(', ');
    };

    // Send Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Order Confirmation - Cobs Keebs",
      html: `
        <p>Thank you for your order!</p>
        <p><strong>Order Details:</strong></p>
        <ul>
          <li>Keyboard Size: ${keyboardSize} - ₱${keyboardSizePrice.toFixed(2)}</li>
          <li>Keycap Brand: ${keyCapBrand} - ₱${keyCapBrandPrice.toFixed(2)}</li>
          <li>Switch Type: ${switchType} - ₱${switchTypePrice.toFixed(2)}</li>
          <li>Switch Lubing: ${numSwitchLubing} keys (${formatKeys(lubingKeys)}) - ₱${switchLubingPrice.toFixed(2)}</li>
          <li>Filming: ${numFilming} keys (${formatKeys(filmingKeys)}) - ₱${filmingPrice.toFixed(2)}</li>
          <li>Stabilizer: ${numStabilizer} keys (${formatKeys(stabilizerKeys)}) - ₱${stabilizerPrice.toFixed(2)}</li>
          <li>Tape Layer: ${numTapeLayer} - ₱${tapeLayerPrice.toFixed(2)}</li>
          <li>Case Foam (₱50): ${caseFoam}</li>
          <li>PE Foam (₱50): ${PEFoam}</li>
          <li>Total: ₱${total.toFixed(2)}</li>
        </ul>
        <p>We will update you once your order is processed!</p>
        <p><strong>Your Custom Keyboard Design:</strong></p>
        <img src="cid:keyboardImage" alt="Custom Keyboard Design" style="max-width: 100%; height: auto;" />
      `,
      attachments: [{
        filename: "keyboard-design.png",
        content: keyboardImage.split("base64,")[1],
        encoding: "base64",
        cid: "keyboardImage",
      }],
    };

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: "New Order Received - Cobs Keebs",
      html: `
        <p>A new order has been placed!</p>
        <p><strong>Order Details:</strong></p>
        <ul>
          <li>Customer Name: ${customerName}</li>
          <li>Customer Email: ${customerEmail}</li>
          <li>Address: ${address}</li>
          <li>Keyboard Size: ${keyboardSize} - ₱${keyboardSizePrice.toFixed(2)}</li>
          <li>Keycap Brand: ${keyCapBrand} - ₱${keyCapBrandPrice.toFixed(2)}</li>
          <li>Switch Type: ${switchType} - ₱${switchTypePrice.toFixed(2)}</li>
          <li>Switch Lubing: ${numSwitchLubing} keys (${formatKeys(lubingKeys)}) - ₱${switchLubingPrice.toFixed(2)}</li>
          <li>Filming: ${numFilming} keys (${formatKeys(filmingKeys)}) - ₱${filmingPrice.toFixed(2)}</li>
          <li>Stabilizer: ${numStabilizer} keys (${formatKeys(stabilizerKeys)}) - ₱${stabilizerPrice.toFixed(2)}</li>
          <li>Tape Layer: ${numTapeLayer} - ₱${tapeLayerPrice.toFixed(2)}</li>
          <li>Case Foam (₱50): ${caseFoam}</li>
          <li>PE Foam (₱50): ${PEFoam}</li>
          <li>Total: ₱${total.toFixed(2)}</li>
        </ul>
        <p><strong>Custom Keyboard Design:</strong></p>
        <img src="cid:keyboardImage" alt="Custom Keyboard Design" style="max-width: 100%; height: auto;" />
      `,
      attachments: [{
        filename: "keyboard-design.png",
        content: keyboardImage.split("base64,")[1],
        encoding: "base64",
        cid: "keyboardImage",
      }],
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(adminMailOptions);
    
    res.status(201).json({ message: "Order placed successfully and email sent", newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: error.message });
  }
};

// Load all orders for a user
export const loadOrders = async (req, res) => {
  try {
    const { customerEmail } = req.params;
    const orders = await Order.find({ customerEmail });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};