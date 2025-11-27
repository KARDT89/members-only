import { Router } from "express";
import { getNewPost, postNewPost, getPosts } from "../controllers/posts.controller.js";

const router = new Router()

router.get("/", getPosts);          // "your posts" page
router.get("/new", getNewPost);    // add post form
router.post("/new", postNewPost);  // submit new post

export default router;