import db from "../db/queries.js"

export async function getUsernames(req, res) {
  try {
    const usernames = await db.getAllUsers();
    console.log("Usernames: ", usernames);
    res.json(usernames);  // send it back to the client
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Server error");
  }
}


export default {
    getUsernames
}