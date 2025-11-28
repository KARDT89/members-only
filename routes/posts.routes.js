import { Router } from "express";
import {
    getNewPost,
    postNewPost,
    getManagePosts,
    getEditPost,
    postEditPost,
} from "../controllers/posts.controller.js";

const router = new Router();

router.get("/manage", getManagePosts); // "your posts" page
router.get("/new", getNewPost); // add post form
router.post("/new", postNewPost); // submit new post
router.get("/edit/:id", getEditPost); // Edit post get
router.post("/edit/:id", postEditPost); // Edit post POST
// router.post("/delete/:id", getEditPost); // Delete post

export default router;
