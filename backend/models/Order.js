import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  keyboardType: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);