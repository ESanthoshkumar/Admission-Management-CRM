// backend/src/index.js
import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import programsRoutes from "./routes/programs.js";
import allocationsRoutes from "./routes/allocations.js";
import admissionsRoutes from "./routes/admissions.js";
import applicantsRoutes from "./routes/applicants.js";
import setupRoutes from "./routes/setup.js";
import dashboardRoutes from "./routes/dashboard.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Edumerge Admission API (MongoDB) is running!" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// routes
app.use("/api/setup", setupRoutes);
app.use("/api/programs", programsRoutes);
app.use("/api/allocations", allocationsRoutes);
app.use("/api/admissions", admissionsRoutes);
app.use("/api/applicants", applicantsRoutes);
app.use("/api/dashboard", dashboardRoutes);

// connect to MongoDB
connectDB();
import "./models/Institution.js";
import "./models/Campus.js";
import "./models/Department.js";
import "./models/Program.js";
import "./models/SeatMatrix.js";
import "./models/Applicant.js";
import "./models/Admission.js";

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
