import { Router } from "express";
import { getHome, getMembership, postMembership } from "../controllers/home.controller.js";

const router = new Router();

router.get("/", getHome);
router.get("/membership", getMembership);
router.post("/membership", postMembership);

export default router;
