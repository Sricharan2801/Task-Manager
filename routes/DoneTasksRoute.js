const express = require("express");
const { getDoneTask, postDoneTask, getAllTasks,
    deleteDoneTask,editDoneTask } = require("../controllers/doneTasks")
const router = express.Router();

router.get("/getTask/:taskId", getDoneTask)
router.post("/createTask", postDoneTask)
router.get("/allTasks", getAllTasks)
router.delete("/deleteTask/:taskId", deleteDoneTask)
router.patch("/editTask/:taskId",editDoneTask)

module.exports = router;