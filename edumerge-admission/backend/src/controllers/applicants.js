import Applicant from "../models/Applicant.js";

// Create applicant
export const createApplicant = async (req, res) => {
  const { firstName, lastName, category, entryType, quotaType, marks, allotmentNumber } = req.body;

  try {
    const applicant = await Applicant.create({
      firstName,
      lastName,
      category,
      entryType,
      quotaType,
      marks,
      allotmentNumber,
    });

    return res.status(201).json(applicant);
  } catch (error) {
    console.error("Applicant Setup Error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message || "Failed to create applicant" });
  }
};

// List all applicants
export const getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    return res.json(applicants);
  } catch (error) {
    return res.status(500).json({ error: "Failed to load applicants" });
  }
};

// Update applicant status (documents, fees)
export const updateApplicantStatus = async (req, res) => {
  const { id } = req.params;
  const { documentStatus, feeStatus } = req.body;
  try {
    const applicant = await Applicant.findById(id);
    if (!applicant) return res.status(404).json({ error: "Applicant not found" });

    if (documentStatus) applicant.documentStatus = documentStatus;
    if (feeStatus) applicant.feeStatus = feeStatus;

    await applicant.save();
    res.json(applicant);
  } catch (error) {
    res.status(500).json({ error: "Failed to update applicant" });
  }
};
