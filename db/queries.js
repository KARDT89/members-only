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

export default {
    getAllUsers,
    addNewPost,
    getAllPosts,
    getUserByUsername
};
