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
    const { customerName, customerEmail, address, keyboardSize, numSwitchLubing, numFilming, numStabilizer, numTapeLayer, caseFoam, PEFoam, total, swtichLubingPrice, filmingPrice, stabilizerPrice, tapeLayerPrice } = req.body; // Use frontend field names

    const email = customerEmail;
    const adminEmail = "rappykarlopi@gmail.com";

    const newRequest = new Modify({
      customerName: customerName, 
      customerEmail: customerEmail,
      address: address, 
      keyboardSize: keyboardSize,
      switchLubing: numSwitchLubing,
      filming: numFilming,
      stabilizers: numStabilizer,
      tapeLayers: numTapeLayer,
      caseFoam: caseFoam,
      PEFoam: PEFoam,
      requestStatus: "Pending",
      price: total,
    });


    await newRequest.save();
    
    // Send Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Customer's email
      subject: "Keyboard Modification Request Confirmation - Cobs Keebs",
      text: `Thank you for using our service!
      \n\nRequest Details: 
      \nKeyboard Size: ${keyboardSize}
      \nNumber of Switch Lubing: ${numSwitchLubing} - ${swtichLubingPrice}
      \nNumber of Filming: ${numFilming} - ${filmingPrice}
      \nNumber of Stabilizers: ${numStabilizer} - ${stabilizerPrice}
      \nNumber of Tape Layers: ${numTapeLayer} - ${tapeLayerPrice}
      \nCase Foam Mod? (₱50): ${caseFoam}
      \nPE Foam Mod? (₱50): ${PEFoam}
      \nTotal: ₱${total}
      \n\nWe will update you once your request is processed!`,
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
          <li>Number of Switch Lubing: ${numSwitchLubing} - ₱${swtichLubingPrice}</li>
          <li>Number of Filming: ${numFilming} - ₱${filmingPrice}</li>
          <li>Number of Stabilizers: ${numStabilizer} - ₱${stabilizerPrice}</li>
          <li>Number of Tape Layers: ${numTapeLayer} - ₱${tapeLayerPrice}</li>
          <li>Case Foam Mod?: ${caseFoam}</li>
          <li>PE Foam Mod?: ${PEFoam}</li>
          <li>Total: ₱${total}</li>
        </ul>
      `
    };
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(adminMailOptions);
    
    res.status(201).json({ message: "Request placed successfully and email sent", newRequest });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: error.message });
  }
};