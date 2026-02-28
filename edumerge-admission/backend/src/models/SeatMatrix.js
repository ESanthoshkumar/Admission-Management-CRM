import mongoose from "mongoose";

const seatMatrixSchema = new mongoose.Schema({
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
    required: true,
    unique: true,
  },
  totalIntake: { type: Number, required: true, min: 1 },
  kcet: { type: Number, required: true, min: 0 },
  comedk: { type: Number, required: true, min: 0 },
  management: { type: Number, required: true, min: 0 },
  supernumerary: { type: Number, default: 0, min: 0 },
}, {
  timestamps: true,
  validate: {
    validator: function () {
      return this.kcet + this.comedk + this.management === this.totalIntake;
    },
    message: "KCET + COMEDK + Management must equal total intake",
  },
});

export default mongoose.model("SeatMatrix", seatMatrixSchema);
