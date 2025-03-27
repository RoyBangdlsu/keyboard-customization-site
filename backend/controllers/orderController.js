import Order from "../models/Order.js";
import nodemailer from "nodemailer";

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other email providers
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email app password
  },
});

export const placeNewOrder = async (req, res) => {
  try {
    const { customerName, 
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
      switchTypePrice } = req.body; // Use frontend field names

    const email = customerEmail;
    const adminEmail = "rappykarlopi@gmail.com";

    const newOrder = new Order({
      customerName: customerName, 
      customerEmail: customerEmail,
      serviceType: type,
      address: address, 
      keyboardSize: keyboardSize,
      keycapBrand: keyCapBrand,
      switchType: switchType, 
      switchLubing: numSwitchLubing,
      filming: numFilming,
      stabilizers: numStabilizer,
      tapeLayers: numTapeLayer,
      caseFoam: caseFoam,
      PEFoam: PEFoam,
      price: total,
      keyboardImage: keyboardImage
    });

    await newOrder.save();
    
    // Send Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Customer's email
      subject: "Order Confirmation - Cobs Keebs",
      html: `
        <p>Thank you for your order!</p>
        <p><strong>Order Details:</strong></p>
        <ul>
          <li>Keyboard Size: ${keyboardSize} - ₱${keyboardSizePrice.toFixed(2)}</li>
          <li>Keycap Brand: ${keyCapBrand} - ₱${keyCapBrandPrice.toFixed(2)}</li>
          <li>Switch Type: ${switchType} - ₱${switchTypePrice.toFixed(2)}</li>
          <li>Switch Lubing: ${numSwitchLubing} - ₱${switchLubingPrice.toFixed(2)}</li>
          <li>Filming: ${numFilming} - ₱${filmingPrice.toFixed(2)}</li>
          <li>Stabilizer: ${numStabilizer} - ₱${stabilizerPrice.toFixed(2)}</li>
          <li>Tape Layer: ${numTapeLayer} - ₱${tapeLayerPrice.toFixed(2)}</li>
          <li>Case Foam (₱50): ${caseFoam}</li>
          <li>PE Foam (₱50): ${PEFoam}</li>
          <li>Total: ₱${total}</li>
        </ul>
        <p>We will update you once your order is processed!</p>
        <p><strong>Your Custom Keyboard Design:</strong></p>
        <img src="cid:keyboardImage" alt="Custom Keyboard Design" style="max-width: 100%; height: auto;" />
      `,
      attachments: [
        {
          filename: "keyboard-design.png",
          content: keyboardImage.split("base64,")[1], // Remove the Base64 prefix
          encoding: "base64",
          cid: "keyboardImage", // Content ID to reference in the HTML
        },
      ],
    };

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail, // Send to the admin
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
          <li>Switch Lubing: ${numSwitchLubing} - ₱${switchLubingPrice.toFixed(2)}</li>
          <li>Filming: ${numFilming} - ₱${filmingPrice.toFixed(2)}</li>
          <li>Stabilizer: ${numStabilizer} - ₱${stabilizerPrice.toFixed(2)}</li>
          <li>Tape Layer: ${numTapeLayer} - ₱${tapeLayerPrice.toFixed(2)}</li>
          <li>Case Foam (₱50): ${caseFoam}</li>
          <li>PE Foam (₱50): ${PEFoam}</li>
          <li>Total: ₱${total}</li>
        </ul>
        <p><strong>Custom Keyboard Design:</strong></p>
        <img src="cid:keyboardImage" alt="Custom Keyboard Design" style="max-width: 100%; height: auto;" />
      `,
      attachments: [
        {
          filename: "keyboard-design.png",
          content: keyboardImage.split("base64,")[1], // Remove the Base64 prefix
          encoding: "base64",
          cid: "keyboardImage", // Content ID to reference in the HTML
        },
      ],
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

    // Find all designs for the user
    const orders = await Order.find({ customerEmail });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find and delete the design by ID
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
