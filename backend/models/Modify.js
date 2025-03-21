import mongoose from "mongoose";

const ModifySchema = new mongoose.Schema({
  customerName: { type: String, required: true }, 
  customerEmail: { type: String, required: true },
  address: { type: String, required: true },
  requestStatus: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Modify", ModifySchema);
