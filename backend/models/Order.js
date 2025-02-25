import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  serviceType: { type: String, required: true },
  keyboardSize: { type: String, required: true },
  keycapBrand: { type: String, required: true },
  switchType: { type: String, required: true },
  switchLubing: { type: Number, required: true },
  filming: { type: Number, required: true },
  stabilizers: { type: Number, required: true },
  tapeLayers: { type: Number, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);