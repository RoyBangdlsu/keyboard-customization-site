import mongoose from "mongoose";

const OrderNewSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  keyboardType: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Order", OrderNewSchema);