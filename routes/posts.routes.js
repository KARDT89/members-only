import { Router } from "express";

const router = new Router()

router.get("/posts", getPosts);          // "your posts" page
router.get("/posts/new", getNewPost);    // add post form
router.post("/posts/new", postNewPost);  // submit new post

export default router;