function getNewPost(req, res) {
    if (req.user) {
        res.render("forms/add-post-form", { user: req.user });
    } else {
        res.redirect("/")
    }
}

function postNewPost(req, res) {
    // res.render("add-post-form")
    console.log("postNewPosts");
}

function getPosts(req, res) {
    // res.render("add-post-form")
    console.log("getPosts");
}

export { getNewPost, postNewPost, getPosts };
