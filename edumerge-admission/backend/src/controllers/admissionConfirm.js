import Applicant from "../models/Applicant.js";

const pad4 = (n) => n.toString().padStart(4, "0");

const generateAdmissionNumber = (institutionCode, year, courseType, programName, quotaType, serial) => {
  const safeProgram = (programName || "").toUpperCase().replace(/\s/g, "").slice(0, 10);
  return `${institutionCode}/${year}/${courseType}/${safeProgram}/${quotaType}/${pad4(serial)}`;
};

export const confirmAdmission = async (req, res) => {
  const { applicantId, institutionCode = "INST", year = "2026" } = req.body;

  try {
    const applicant = await Applicant.findById(applicantId);
    if (!applicant) {
      return res.status(404).json({ error: "Applicant not found" });
    }

    if (applicant.feeStatus !== "Paid") {
      return res.status(400).json({ error: "Admission can be confirmed only after fee is Paid" });
    }

    if (applicant.admissionNumber) {
      return res.status(400).json({ error: "Admission number already generated" });
    }

    // In a real app, you can pull program name from Admission → Program lookup
    // For demo, we fake a program name
    const programName = "CSE";
    const courseType = "UG";
    const quotaType = applicant.quotaType; // KCET / COMEDK / Management

    // In real app: fetch the actual program object instead of hard‑coding
    const serial = 1; // in real app, derive this from count or DB counter

    const admissionNumber = generateAdmissionNumber(
      institutionCode,
      year,
      courseType,
      programName,
      quotaType,
      serial
    );

    applicant.admissionNumber = admissionNumber;
    await applicant.save();

    return res.json({
      success: true,
      admissionNumber,
      message: "Admission confirmed",
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to confirm admission" });
  }
};
