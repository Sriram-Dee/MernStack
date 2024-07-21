import express from "express";
import { regiterUser, verifyUser } from "../controllers/User.js";

const router = express.Router();

router.post("/user/register", regiterUser)
router.post("/user/verify", verifyUser)

export default router;