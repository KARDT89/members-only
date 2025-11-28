import { validationResult } from "express-validator";

export function signupValidate(req, res, next) {
    const errors = validationResult(req);
    console.log(errors.errors);

    if (!errors.isEmpty()) {
        return res
            .status(400)
            .render("forms/sign-up-form", {
                errors: errors.array(),
                username: req.body.username,
                password: req.body.password,
                confirmPassword: req.body["confirm-password"],
            });
    }

    next();
}
