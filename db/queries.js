import pool from "./pool.js";

async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}


export default {
    getAllUsers
}