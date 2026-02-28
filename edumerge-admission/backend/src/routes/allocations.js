// backend/src/routes/allocations.js
import { Router } from "express";
import { allocateSeat } from "../controllers/allocations.js";

const router = Router();

router.post("/allocate", allocateSeat);

export default router;
