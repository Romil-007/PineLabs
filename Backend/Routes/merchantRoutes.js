import express from "express";
import { createMerchant } from "../Controllers/merchantController.js";

const router = express.Router();

router.post("/", createMerchant);

export default router;
