import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  academicYear: { type: String, required: true }, // "2026"
  courseType: { type: String, enum: ["UG", "PG"], required: true },
  entryType: { type: String, enum: ["Regular", "Lateral"], required: true },
  admissionMode: { type: String, enum: ["Government", "Management"], required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
}, { timestamps: true });

export default mongoose.model("Program", programSchema);
