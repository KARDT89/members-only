import pool from "../db/pool.js";
import bcrypt from "bcryptjs";

function getSignup(req, res) {
    res.render("forms/sign-up-form");
}
async function postSignup(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2)",
            [req.body.username, hashedPassword]
        );
        res.redirect("/");
    } catch (err) {
        return next(err);
    }
}

function getLogin(req, res) {
    res.render("forms/log-in-form");
}


export { getSignup, postSignup, getLogin };
