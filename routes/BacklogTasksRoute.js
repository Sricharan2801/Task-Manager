const express = require("express");
const {getBacklogTask,postBacklogTask,getAllTasks,
    deleteBacklogTask,editBacklogTask} = require("../controllers/backlogTasks")
const router = express.Router();

router.get("/getTask/:taskId",getBacklogTask)
router.post("/createTask",postBacklogTask)
router.get("/allTasks",getAllTasks)
router.delete("/deleteTask/:taskId",deleteBacklogTask)
router.patch("/editTask/:taskId",editBacklogTask)

module.exports = router;