// backend/src/models/Applicant.js
import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  category: { type: String, enum: ["GM", "SC", "ST", "OBC"], required: true },
  entryType: { type: String, enum: ["Regular", "Lateral"], required: true },
  quotaType: { type: String, enum: ["KCET", "COMEDK", "Management"], required: true },
  marks: { type: Number, min: 0, max: 100 },
  allotmentNumber: { type: String }, // for Government
  documentStatus: {
    type: String,
    enum: ["Pending", "Submitted", "Verified"],
    default: "Pending",
  },
  feeStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
  admissionNumber: { type: String, unique: true, sparse: true }, // once generated
}, { timestamps: true });

export default mongoose.model("Applicant", applicantSchema);
