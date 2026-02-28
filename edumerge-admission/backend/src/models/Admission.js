import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Applicant",
    required: true,
    unique: true,
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
    required: true,
  },
  quotaType: { type: String, enum: ["KCET", "COMEDK", "Management"], required: true },
  seatAllocatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Admission", admissionSchema);
