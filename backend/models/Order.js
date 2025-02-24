import mongoose from "mongoose";

const OrderNewSchema = new mongoose.Schema({
  serviceType: { type: String, required: true},
  keyboardSize: { type: String, required: true },
  keycapBrand: { type: String, required: true },
  swtichType: { type: String, required: true },
  price: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Order", OrderNewSchema);