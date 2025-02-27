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
    
    
    
    // Send Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Customer's email
      subject: "Order Confirmation - Cobs Keebs",
      text: `Thank you for your order!\n\nOrder Details:\nType: ${type}\nKeyboard Size: ${keyboardSize}\nKeycap Brand: ${keyCapBrand}\nSwitch Type: ${switchType}\nTotal: ₱${total}\n\nWe will update you once your order is processed!`,
    };

    await transporter.sendMail(mailOptions);
    
    
    
    res.status(201).json({ message: "Order placed successfully and email sent", newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: error.message });
  }
};
