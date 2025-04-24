import { Router } from "express";
import { custom, normal } from "../controllers/generate.controller.js";
import validateURL from "../middlewares/validateurl.middleware.js";

const router = Router();

router.post("/", validateURL, normal);

router.post("/custom", validateURL, custom);

export default router;
