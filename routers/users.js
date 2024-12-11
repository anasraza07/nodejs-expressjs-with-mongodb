import express from "express";
const router = express.Router();

const users = [{
    fullname: "Anas Raza",
    id: 1,
    email: "ar470684@gmail.com",
}]

router.get("/", (req, res) => {
    res.status(200).json({
        error: false,
        data: users,
        msg: "users fetched successfully",
    })
})

router.get("/:id", (req, res) => {
    const user = users.find(user => user.id == req.params.id)
    if (!user) {
        return res.status(404).json({
            error: true,
            data: null,
            msg: "user not found"
        })
    }

    res.status(200).json({
        error: false,
        data: user,
        msg: "user found successfully",
    })
})

router.post("/", (req, res) => {
    const { fullname, email } = req.body;
    users.push({ fullname, email, id: users.length + 1 });

    res.status(201).json({
        error: false,
        data: users,
        msg: "user added successfully",
    })
})

router.put("/:id", (req, res) => {
    const { fullname, email } = req.body;
    console.log(fullname, email)
    const user = users.find(data => data.id == req.params.id);
    if(!user) return res.status(404).json({
        error: true,
        data: null,
        msg: "user not found",
    })

    if(fullname) user.fullname = fullname;
    if(email) user.email = email;

    res.status(201).json({
        error: false,
        data: user,
        msg: "user updated successfully",
    })
})

export default router;