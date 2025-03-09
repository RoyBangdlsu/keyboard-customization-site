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
    const { customerName, customerEmail, address, type, keyboardSize, keyCapBrand, switchType, total, keyboardImage, keyCapBrandPrice, keyboardSizePrice, switchTypePrice } = req.body; // Use frontend field names

    const email = customerEmail;
    const adminEmail = "OWNER_EMAIL@gmail.com";
    const imageBuffer = Buffer.from(keyboardImage.split(",")[1], "base64");

    const newOrder = new Order({
      customerName: customerName, 
      customerEmail: customerEmail,
      address: address, 
      serviceType: type,
      keyboardSize: keyboardSize,
      keycapBrand: keyCapBrand,
      switchType: switchType,
      price: total,
      orderStatus: "Pending",
      keyboardImage: {
        data: imageBuffer, // Store the image as Buffer
        contentType: "image/png", // Set the MIME type (e.g., 'image/png')
      },
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
          <li>Type: ${type}</li>
          <li>Keyboard Size: ${keyboardSize} - ₱${keyboardSizePrice}</li>
          <li>Keycap Brand: ${keyCapBrand} - ₱${keyCapBrandPrice}</li>
          <li>Switch Type: ${switchType} - ₱${switchTypePrice}</li>
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
          <li>Type: ${type}</li>
          <li>Keyboard Size: ${keyboardSize} - ₱${keyboardSizePrice}</li>
          <li>Keycap Brand: ${keyCapBrand} - ₱${keyCapBrandPrice}</li>
          <li>Switch Type: ${switchType} - ₱${switchTypePrice}</li>
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
export const getOrders = async (req, res) => {
  try {
    const { customerEmail } = req.params;

    // Find all designs for the user
    const orders = await Order.find({ customerEmail });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
