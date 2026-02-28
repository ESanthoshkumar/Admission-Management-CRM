import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/edumerge_admission");
        console.log(`MongoDB connected: ${conn.connection.host}`);

        await conn.connection.collection("applicants").dropIndex("admissionNumber_1");
        console.log("Successfully dropped admissionNumber index");

        process.exit(0);
    } catch (error) {
        if (error.codeName === 'IndexNotFound') {
            console.log("Index already dropped or not found.");
        } else {
            console.error(error);
        }
        process.exit(0);
    }
};

connectDB();
