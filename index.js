import express from "express";
const app = express();
const PORT = 3000;
import userRoutes from "./routers/users.js";
import taskRoutes from "./routers/tasks.js";

function authMiddleware(req, res, next) {
    if (req.query.auth != "true") {
        console.log(req.query.auth)
        res.send("login first please!");
    } else {
        next();
    }
}

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.listen(PORT, () => console.log("app is listening on port ", PORT));