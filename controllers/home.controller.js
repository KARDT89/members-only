import db from "../db/queries.js"

async function getUsernames(req, res) {
  try {
    const usernames = await db.getAllUsers();
    console.log("Usernames: ", usernames);
    res.json(usernames);  // send it back to the client
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Server error");
  }
}

function getHome(req, res) {
  console.log(req.user);
  res.render("index", { user: req.user })
}


export {
    getUsernames,
    getHome
}