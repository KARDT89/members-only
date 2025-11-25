import { Router } from "express";
import { getUsernames } from "../controllers/home.controller.js";


const homeRouter = new Router()

homeRouter.get("/", getUsernames)

export default homeRouter