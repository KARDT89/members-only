import express from "express";
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";
import homeRouter from "./routes/home.routes.js";

const app = new express();
const PORT = 3000;

const LocalStrategy = passportLocal.Strategy

app.use((req, res, next) => {
    console.log(`API Endpoint: ${req.method} ${req.originalUrl}`)
    next()
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));

app.set('views', './views')
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

// app.use("/", homeRouter);

app.get("/", (req, res) => res.render("index"));
// app.get("/sign-up", (req, res) => res.render("sign-up-form"));
// app.post("/sign-up", async (req, res, next) => {
//   try {
//     await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
//       req.body.username,
//       req.body.password,
//     ]);
//     res.redirect("/");
//   } catch(err) {
//     return next(err);
//   }
// });

// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
//       const user = rows[0];

//       if (!user) {
//         return done(null, false, { message: "Incorrect username" });
//       }
//       if (user.password !== password) {
//         return done(null, false, { message: "Incorrect password" });
//       }
//       return done(null, user);
//     } catch(err) {
//       return done(err);
//     }
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//     const user = rows[0];

//     done(null, user);
//   } catch(err) {
//     done(err);
//   }
// });


app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`running at http://localhost:${PORT}`);
});
