import mongoose from "mongoose";

const ModifySchema = new mongoose.Schema({
  customerName: { type: String, required: true }, 
  customerEmail: { type: String, required: true },
  address: { type: String, required: true },
  switchLubing: { type: Number, required: true },
  filming: { type: Number, required: true },
  stabilizers: { type: Number, required: true },
  tapeLayers: { type: Number, required: true },
  caseFoam: { type: String, required: true },
  PEFoam: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Modify", ModifySchema);
