// backend/src/routes/applicants.js
import { Router } from "express";
import { createApplicant, getApplicants, updateApplicantStatus } from "../controllers/applicants.js";

const router = Router();

router.post("/", createApplicant);
router.get("/", getApplicants);
router.patch("/:id", updateApplicantStatus);

export default router;
