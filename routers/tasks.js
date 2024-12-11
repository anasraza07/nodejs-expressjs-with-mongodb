import express from "express";
const router = express.Router();

const tasks = [
    { id: 1, task: "HTML learn karna", status: "pending" },
    { id: 2, task: "CSS practice karna", status: "completed" },
    { id: 3, task: "JavaScript basics revise karna", status: "onhold" },
    { id: 4, task: "React project start karna", status: "pending" },
    { id: 5, task: "Backend ke concepts samajhna", status: "completed" },
    { id: 6, task: "Portfolio design finalize karna", status: "onhold" },
    { id: 7, task: "DSA questions solve karna", status: "pending" },
    { id: 8, task: "Git aur GitHub sikhna", status: "completed" },
    { id: 9, task: "API integration practice karna", status: "onhold" },
    { id: 10, task: "Dark chocolate khareedna", status: "completed" }
];

router.get("/", (req, res) => {
    const { status } = req.query
    let filteredTasks;

    if (status == "completed") {
        filteredTasks = tasks.filter(task => task.status == "completed")
    } else if (status == "pending") {
        filteredTasks = tasks.filter(task => task.status == "pending")
    } else {
        filteredTasks = tasks;
    }
    
    res.send(filteredTasks);
});

router.get("/:id", (req, res) => {
    const task = tasks.find(task => task.id == req.params.id)
    if (!task) return res.status(404).json({
        error: true,
        data: null,
        msg: "task not found"
    })

    res.status(200).json({
        error: true,
        data: task,
        msg: "task found successfully"
    })
});

router.post("/", (req, res) => {
    const { task, status } = req.body;

    if (!task && !status) res.status(404).json({
        error: true,
        data: null,
        msg: "invalid data"
    })

    tasks.push({ task, status, id: tasks.length + 1 })
    res.status(201).json({
        error: false,
        data: tasks,
        msg: "user added successfully"
    })
})

router.put("/:id", (req, res) => {
    const { task, status } = req.body;
    const taskObj = tasks.find(taskObj => taskObj.id == req.params.id);
    if (!taskObj) return res.status(404).json({
        error: true,
        data: null,
        msg: "task not found"
    })

    if (taskObj) taskObj.task = task;
    if (taskObj) taskObj.status = status;
    res.status(200).json({
        error: false,
        data: taskObj,
        msg: "task updated successfully"
    })
})

export default router;