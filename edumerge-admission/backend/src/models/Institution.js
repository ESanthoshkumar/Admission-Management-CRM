import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true },
}, { timestamps: true });

export default mongoose.model("Institution", institutionSchema);
