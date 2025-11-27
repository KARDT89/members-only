import { Router } from "express";
import { getUsernames, getHome } from "../controllers/home.controller.js";


const router = new Router()

router.get("/", getHome)

export default router;