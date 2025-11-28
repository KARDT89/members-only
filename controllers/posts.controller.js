import db from "../db/queries.js";

function getNewPost(req, res) {
    if (req.user) {
        res.render("forms/add-post-form", { user: req.user, old: {} });
    } else {
        res.redirect("/");
    }
}

async function getEditPost(req, res) {
    if (req.user) {
        const oldData = await db.getPostByPostId(req.params.id);
        res.render("forms/edit-post-form", {
            user: req.user,
            old: oldData.data[0],
        });
    } else {
        res.redirect("/");
    }
}

async function postEditPost(req, res) {
    const { title, description } = req.body;
    const { id } = req.params;
    if (!title || !description) {
        return res.status(400).render("forms/edit-post-form", {
            user: req.user,
            error: "Title and description are required.",
            old: { title, description },
        });
    }
    try {
        const result = await db.updatePostByPostId(id, title, description)
        // 2. If DB layer returns failure
        if (!result.success) {
            return res.status(500).render("forms/edit-post-form", {
                user: req.user,
                error: result.message,
                old: { title, description },
            });
        }
        return res.redirect("/posts/manage");
    } catch (error) {
        // 4. Critical catch fallback — always log
        console.error("Controller ERROR (postEditPost):", error);

        return res.status(500).render("forms/edit-post-form", {
            user: req.user,
            error: "Something went wrong while updating your post.",
            old: { title, description },
        });
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
            old: { title, description },
        });
    }
    try {
        const result = await db.addNewPost(userId, title, description);
        // 2. If DB layer returns failure
        if (!result.success) {
            return res.status(500).render("forms/add-post-form", {
                user: req.user,
                error: result.message,
                old: { title, description },
            });
        }
        return res.redirect("/");
    } catch (error) {
        // 4. Critical catch fallback — always log
        console.error("Controller ERROR (postNewPost):", error);

        return res.status(500).render("forms/add-post-form", {
            user: req.user,
            error: "Something went wrong while creating your post.",
            old: { title, description },
        });
    }
}

async function getManagePosts(req, res) {
    if (req.user) {
        const userPosts = await db.getPostsByUserId(req.user.id);
        res.render("pages/manage", { user: req.user, data: userPosts.data });
    } else {
        res.redirect("/");
    }
}

export { getNewPost, postNewPost, getManagePosts, getEditPost, postEditPost };
