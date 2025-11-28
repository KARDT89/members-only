import { Router } from "express";
import { getHome, getMembership, postMembership, getAdmin } from "../controllers/home.controller.js";

const router = new Router();

router.get("/", getHome);
router.get("/membership", getMembership);
router.post("/membership", postMembership);
router.get("/admin", getAdmin);

export default router;
