import mongoose from 'mongoose';

const DesignSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  designName: { type: String, required: true },
  layout: { type: String, required: true },
  bodyColor: { type: String, required: true },
  keycapsColor: { type: String, required: true },
  switchType: { type: String, required: true },
  keycapBrand: { type: String, required: true },
  keyboardImage: { type: String, required: true },
  keyAddOns: { type: String }, // Stored as JSON string
  caseFoam: { type: String, default: "No" },
  PEFoam: { type: String, default: "No" },
  numTapeLayer: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Design', DesignSchema);