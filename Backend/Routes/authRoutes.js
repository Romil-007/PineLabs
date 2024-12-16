import express from "express";
import { login, register } from "../Controllers/authController";

const router = express.Router();

router.post("/login", login);
router.post("send-otp");
router.post("verify-otp");
router.post("/register", register);

export default router;
