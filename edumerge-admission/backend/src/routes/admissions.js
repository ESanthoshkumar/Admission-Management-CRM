// backend/src/routes/admissions.js
import { Router } from "express";
import { confirmAdmission } from "../controllers/admissionConfirm.js";

const router = Router();

router.post("/confirm", confirmAdmission);

export default router;
