import Program from "../models/Program.js";
import SeatMatrix from "../models/SeatMatrix.js";

// Create program + seat matrix in one call
export const createProgram = async (req, res) => {
  const {
    name,
    academicYear,
    courseType,
    entryType,
    admissionMode,
    totalIntake,
    kcet,
    comedk,
    management,
    supernumerary,
  } = req.body;

  try {
    // Create program
    const program = await Program.create({
      name,
      academicYear,
      courseType,
      entryType,
      admissionMode,
      department: req.body.departmentId
    });

    // Create seat matrix linked to this program
    const seatMatrix = await SeatMatrix.create({
      program: program._id,
      totalIntake,
      kcet,
      comedk,
      management,
      supernumerary,
    });

    res.status(201).json({
      program,
      seatMatrix,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to create program + seat matrix" });
  }
};

// Get all programs with seat matrix info
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    console.error("Programs Load Error:", error);
    return res.status(500).json({ error: "Failed to load programs" });
  }
};
