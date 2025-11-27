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
        const result = await db.getAllPosts();
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

export { getUsernames, getHome };
