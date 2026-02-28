// backend/src/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/edumerge_admission"
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Force drop the invalid unique index if it exists, so sparse can take over
    try {
      await mongoose.connection.collection('applicants').dropIndex('admissionNumber_1');
      console.log("Dropped strict unique index on admissionNumber.");
    } catch (e) {
      // Ignore if index doesn't exist
    }
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
