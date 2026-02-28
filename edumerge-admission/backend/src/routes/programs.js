// backend/src/routes/programs.js
import { Router } from "express";
import { createProgram, getPrograms } from "../controllers/programs.js";

const router = Router();

router.post("/", createProgram);
router.get("/", getPrograms);

export default router;
