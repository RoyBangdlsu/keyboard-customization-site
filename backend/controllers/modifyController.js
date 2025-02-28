import Modify from "../models/Modify.js";
import nodemailer from "nodemailer";

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other email providers
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email app password
  },
});


export const placeRequest = async (req, res) => {
  try {
    const { customerName, customerEmail, address, keyboardSize, numSwitchLubing, numFilming, numStabilizer, numTapeLayer, total } = req.body; // Use frontend field names

    const email = customerEmail;

    const newRequest = new Modify({
      customerName: customerName, 
      customerEmail: customerEmail,
      address: address, 
      keyboardSize: keyboardSize,
      switchLubing: numSwitchLubing,
      filming: numFilming,
      stabilizers: numStabilizer,
      tapeLayers: numTapeLayer,
      price: total,
    });


    await newRequest.save();
    
    // Send Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Customer's email
      subject: "Keyboard Modification Request Confirmation - Cobs Keebs",
      text: `Thank you for using our service!\n\nRequest Details: \nKeyboard Size: ${keyboardSize}\nNumber of Switch Lubing: ${numSwitchLubing}\nNumber of Filming: ${numFilming}\nNumber of Stabilizers: ${numStabilizer}\nNumber of Tape Layers: ${numTapeLayer}\nTotal: ₱${total}\n\nWe will update you once your request is processed!`,
    };
    await transporter.sendMail(mailOptions);
    
    res.status(201).json({ message: "Request placed successfully and email sent", newRequest });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: error.message });
  }
};