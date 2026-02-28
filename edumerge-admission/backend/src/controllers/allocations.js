import Applicant from "../models/Applicant.js";
import Admission from "../models/Admission.js";
import SeatMatrix from "../models/SeatMatrix.js";
import Program from "../models/Program.js";

// Helper: generate simple 4‑digit serial (0001–9999)
const pad4 = (n) => n.toString().padStart(4, "0");

// Admission number format: INST/2026/UG/CSE/KCET/0001
const generateAdmissionNumber = (institutionCode, year, courseType, programName, quotaType, serial) => {
  const safeProgram = programName.toUpperCase().replace(/\s/g, "").slice(0, 10);
  return `${institutionCode}/${year}/${courseType}/${safeProgram}/${quotaType}/${pad4(serial)}`;
};

export const allocateSeat = async (req, res) => {
  const { applicantId, programId, quotaType, institutionCode = "INST", year = "2026" } = req.body;

  try {
    // 1. Get applicant
    const applicant = await Applicant.findById(applicantId);
    if (!applicant) {
      throw new Error("Applicant not found");
    }

    // 2. Get program
    const program = await Program.findById(programId);
    if (!program) {
      throw new Error("Program not found");
    }

    // 3. Load seat matrix for this program
    const seatMatrix = await SeatMatrix.findOne({ program: programId });
    if (!seatMatrix) {
      throw new Error("Seat matrix not configured for this program");
    }

    // 4. Check quota availability
    const quotaKey = quotaType.toLowerCase();
    const availableQuota = seatMatrix[quotaKey] ?? 0;

    if (availableQuota <= 0) {
      return res.status(400).json({
        error: `Quota ${quotaType} is full`,
      });
    }

    // 5. Check if the applicant is already admitted to ANY program
    const existingAdmission = await Admission.findOne({
      applicant: applicantId,
    });

    if (existingAdmission) {
      return res.status(400).json({
        error: "Applicant is already admitted to a program",
      });
    }

    // 6. Allocate seat (create admission record)
    const admission = await Admission.create({
      applicant: applicantId,
      program: programId,
      quotaType,
    });

    // 7. Decrement quota in seat matrix
    await SeatMatrix.updateOne(
      { program: programId },
      { $inc: { [quotaKey]: -1 } }
    );

    return res.status(201).json({
      success: true,
      admission,
      message: "Seat allocated successfully",
    });
  } catch (error) {
    console.error("Allocation error:", error);
    return res.status(500).json({
      error: "Failed to allocate seat",
      details: error.message,
    });
  }
};
