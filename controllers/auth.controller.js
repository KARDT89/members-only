import pool from "../db/pool.js";

function getSignup(req, res) {
    res.render("forms/sign-up-form")
}
async function postSignup(req, res, next) {
    try {
        await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2)",
            [req.body.username, req.body.password]
        );
        res.redirect("/");
    } catch (err) {
        return next(err);
    }
}

export {
    getSignup,
    postSignup
}