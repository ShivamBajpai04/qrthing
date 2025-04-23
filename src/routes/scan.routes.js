import { Router } from "express";
import { analyse } from "../controllers/scan.controller.js";

const router = Router();

router.post("/", analyse);

export default router;
