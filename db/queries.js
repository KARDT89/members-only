import pool from "./pool.js";

async function getAllUsers() {
    try {
        const { rows } = await pool.query("SELECT * FROM users");
        return { success: true, data: rows };
    } catch (error) {
        console.error("DB ERROR (getAllUsers):", error);
        return { success: false, message: "Failed to fetch users." };
    }
}

async function getUserByUsername(username) {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM users WHERE username = $1;",
            [username]
        );
        if (rows.length === 0)
            return { success: false, message: "User not found" };
        return { success: true, data: rows };
    } catch (error) {
        console.error("DB ERROR (getUserByUsername):", error);
        return { success: false, message: "Failed to fetch user." };
    }
}

async function getPostsByUserId(id) {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM posts WHERE user_id = $1;",
            [id]
        );
        if (rows.length === 0)
            return { success: false, message: "Posts not found" };
        return { success: true, data: rows };
    } catch (error) {
        console.error("DB ERROR (getPostsByUserId):", error);
        return { success: false, message: "Failed to fetch posts." };
    }
}

async function getUserById(id) {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM users WHERE id = $1;",
            [id]
        );
        if (rows.length === 0)
            return { success: false, message: "User not found" };
        return { success: true, data: rows };
    } catch (error) {
        console.error("DB ERROR (getUserId):", error);
        return { success: false, message: "Failed to fetch user." };
    }
}

async function getPostByPostId(id) {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM posts WHERE id = $1;",
            [id]
        );
        if (rows.length === 0)
            return { success: false, message: "Post not found" };
        return { success: true, data: rows };
    } catch (error) {
        console.error("DB ERROR (getPostByPostId):", error);
        return { success: false, message: "Failed to fetch post." };
    }
}

async function getAllPostsWithUsers() {
    try {
        const { rows } = await pool.query(`
            SELECT p.*, u.username 
            FROM posts p
            JOIN users u ON u.id = p.user_id
            ORDER BY p.created_at DESC;
        `);

        return { success: true, data: rows };
    } catch (error) {
        console.error("DB ERROR (getAllPostsWithUsers):", error);
        return { success: false, message: "Failed to fetch posts." };
    }
}

async function addNewPost(userId, title, description) {
    try {
        await pool.query(
            `
      INSERT INTO posts (user_id, title, description)
      VALUES ($1, $2, $3);
      `,
            [userId, title, description]
        );
        return {
            success: true,
            message: "Successfully created new post",
        };
    } catch (error) {
        // 1. Log detailed error internally
        console.error("DB ERROR (addNewPost):", error);

        // 2. Return a safe error up the chain
        return {
            success: false,
            message: "Failed to create post.",
        };
    }
}

async function getAllPosts() {
    try {
        const { rows } = await pool.query("SELECT * from posts;");
        return { success: true, data: rows };
    } catch (error) {
        console.error("DB ERROR (getAllPosts):", error);
        return { success: false, message: "Failed to fetch posts." };
    }
}

async function updatePostByPostId(id, title, description) {
    try {
        await pool.query(
            `
      UPDATE posts
      SET title = $1, description = $2
      WHERE id = $3
      `,
            [title, description, id]
        );
        return {
            success: true,
            message: "Successfully edited post",
        };
    } catch (error) {
        // 1. Log detailed error internally
        console.error("DB ERROR (updatePostByPostId):", error);

        // 2. Return a safe error up the chain
        return {
            success: false,
            message: "Failed to update post.",
        };
    }
}

export default {
    getAllUsers,
    addNewPost,
    getAllPosts,
    getUserByUsername,
    getUserById,
    getAllPostsWithUsers,
    getPostsByUserId,
    getPostByPostId,
    updatePostByPostId
};
