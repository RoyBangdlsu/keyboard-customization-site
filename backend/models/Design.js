import mongoose from 'mongoose';

const DesignSchema = new mongoose.Schema({
  userEmail: { type: String, required: true }, 
  designName: { type: String, required: true }, 
  layout: { type: String, required: true },
  bodyColor: { type: String, required: true }, 
  keycapsColor: { type: String, required: true }, 
  switchType: { type: String, required: true }, 
  keycapBrand: { type: String, required: true }, 
  keyboardImage: { 
    data: Buffer, // Binary data for the image
    contentType: String // MIME type of the image (e.g., 'image/jpeg')
  }
}, { timestamps: true });

export default mongoose.model('Design', DesignSchema);