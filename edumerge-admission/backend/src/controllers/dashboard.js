import Applicant from "../models/Applicant.js";
import Admission from "../models/Admission.js";
import SeatMatrix from "../models/SeatMatrix.js";
import Program from "../models/Program.js";

export const getDashboardStats = async (req, res) => {
    try {
        const totalApplicants = await Applicant.countDocuments();
        const pendingDocuments = await Applicant.countDocuments({ documentStatus: "Pending" });
        const pendingFees = await Applicant.countDocuments({ feeStatus: "Pending" });
        const totalAdmissions = await Admission.countDocuments();

        // Seat matrix aggregation
        const seatMatrices = await SeatMatrix.find().populate("program");

        let totalIntake = 0;
        let kcetFilled = 0;
        let comedkFilled = 0;
        let managementFilled = 0;

        // We can calculate filled by subtracting current matrix remaining from initial, or by counting admissions
        // The current SeatMatrix remaining is stored in the DB, so filled = initial - remaining.
        // Wait, the schema just stores the *remaining* count in SeatMatrix: `kcet: { type: Number, required: true }`.
        // That means we don't know initial from SeatMatrix alone unless we store it.
        // However, Admission collection has the exact counts!
        const admissions = await Admission.find();

        admissions.forEach(adm => {
            if (adm.quotaType === "KCET") kcetFilled++;
            if (adm.quotaType === "COMEDK") comedkFilled++;
            if (adm.quotaType === "Management") managementFilled++;
        });

        seatMatrices.forEach(sm => {
            totalIntake += sm.totalIntake;
        });

        res.json({
            totalApplicants,
            totalIntake,
            totalAdmissions,
            pendingDocuments,
            pendingFees,
            quotaWiseFilled: {
                KCET: kcetFilled,
                COMEDK: comedkFilled,
                Management: managementFilled
            },
            remainingSeats: totalIntake - totalAdmissions
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
};
