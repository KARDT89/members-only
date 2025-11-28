import { body } from "express-validator";

export const signupValidator = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required!")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 chars"),

    body("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 6 characters"),
    body("confirm-password").custom((value, { req }) => {
        return value === req.body.password;
    }).withMessage("password not same!"),
];
