// backend/src/routes/setup.js
import express from "express";
import { getSetupData, createInstitution, createCampus, createDepartment } from "../controllers/setup.js";

const router = express.Router();

router.get("/", getSetupData);
router.post("/institution", createInstitution);
router.post("/campus", createCampus);
router.post("/department", createDepartment);

export default router;
