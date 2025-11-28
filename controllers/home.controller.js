import { render } from "ejs";
import pool from "../db/pool.js";
import db from "../db/queries.js";

// for test
async function getUsernames(req, res) {
    try {
        const usernames = await db.getAllUsers();
        console.log("Usernames: ", usernames);
        res.json(usernames); // send it back to the client
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Server error");
    }
}

async function getHome(req, res) {
    try {
        const result = await db.getAllPostsWithUsers();

        if (!result.success) {
            return res.status(500).render("pages/home", {
                user: req.user,
                data: [],
                error: result.message,
            });
        }

        res.status(200).render("pages/home", {
            user: req.user,
            data: result.data,
            error: null,
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).render("pages/home", {
            user: req.user,
            data: [],
            error: "Server error while loading posts.",
        });
    }
}

async function getMembership(req, res) {
    if (req.user) {
        const membershipStatus = await db.getUserById(req.user.id);
        res.render("forms/membership", {
            user: req.user,
            status: membershipStatus.data[0].is_member,
            error: "",
        });
    } else {
        res.redirect("/");
    }
}

async function postMembership(req, res) {
    const secretPassword = "TOP";
    try {
        const { password } = req.body;
        if (password === secretPassword) {
            await pool.query(
                `
                    UPDATE users
                    SET is_member = $1
                    WHERE id = $2
                `,
                [!req.user.is_member, req.user.id]
            );
            return res.redirect("/");
        } else {
            const membershipStatus = await db.getUserById(req.user.id);
            return res.render("forms/membership", {
                user: req.user,
                status: membershipStatus.data[0].is_member,
                error: "Wrong Secret!",
            });
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export { getUsernames, getHome, getMembership, postMembership };
