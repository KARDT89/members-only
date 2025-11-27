import db from "../db/queries.js";

function getNewPost(req, res) {
    if (req.user) {
        res.render("forms/add-post-form", { user: req.user });
    } else {
        res.redirect("/");
    }
}

async function postNewPost(req, res) {
    const { title, description } = req.body;
    const userId = req.user.id;
    // 1. Basic validation
    if (!title || !description) {
        return res.status(400).render("forms/add-post-form", {
            user: req.user,
            error: "Title and description are required.",
        });
    }
    try {
        const result = await db.addNewPost(userId, title, description);
        // 2. If DB layer returns failure
        if (!result.success) {
            return res.status(500).render("forms/add-post-form", {
                user: req.user,
                error: result.message,
            });
        }
        return res.redirect("/");
    } catch (error) {
        // 4. Critical catch fallback — always log
        console.error("Controller ERROR (postNewPost):", error);

        return res.status(500).render("forms/add-post-form", {
            user: req.user,
            error: "Something went wrong while creating your post.",
        });
    }
}

function getPosts(req, res) {
    // res.render("add-post-form")
    console.log("getPosts");
}

export { getNewPost, postNewPost, getPosts };
