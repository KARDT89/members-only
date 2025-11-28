import { Router } from "express";
import {
    getSignup,
    postSignup,
    getLogin,
} from "../controllers/auth.controller.js";
import passport from "passport";
import { signupValidate } from "../middleware/validate.js";
import { signupValidator } from "../validators/signupValidators.js";

const router = new Router();

router.get("/sign-up", getSignup);
router.post("/sign-up", signupValidator, signupValidate, postSignup);
router.get("/login", getLogin);
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureMessage: true,
    })
);
router.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

export default router;
