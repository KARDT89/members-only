import { Router } from "express";
import { getUsernames } from "../controllers/home.controller.js";


export const homeRouter = new Router()

homeRouter.get("/", getUsernames)

