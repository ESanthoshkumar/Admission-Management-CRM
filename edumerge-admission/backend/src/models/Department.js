import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    campus: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true },
}, { timestamps: true });

export default mongoose.model("Department", departmentSchema);
