import { Router } from "express";
import { getSignup, postSignup } from "../controllers/auth.controller.js";

const router = new Router()

router.get("/sign-up", getSignup)
router.post("/sign-up", postSignup)

export default router;