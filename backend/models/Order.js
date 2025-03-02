import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true }, 
  customerEmail: { type: String, required: true }, 
  address: { type: String, required: true },
  serviceType: { type: String, required: true },
  keyboardSize: { type: String, required: true },
  keycapBrand: { type: String, required: true },
  switchType: { type: String, required: true },
  price: { type: Number, required: true },
  orderStatus: { type: String, required: true },
  keyboardImage: { 
    data: Buffer, // Binary data for the image
    contentType: String // MIME type of the image (e.g., 'image/jpeg')
  }
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);