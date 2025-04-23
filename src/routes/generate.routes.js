import { Router } from "express";
import { custom, normal } from "../controllers/generate.controller.js";

const router = Router();

router.post("/", normal);

router.post("/custom", custom);

export default router;
