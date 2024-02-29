const express = require("express");
const {getInProgressTask,postInProgressTask,
    getAllTasks,deleteInprogressTask,editInProgressTask} = require("../controllers/inProgressTasks")
const router = express.Router();

router.get("/getTask/:taskId",getInProgressTask)
router.post("/createTask",postInProgressTask)
router.get("/allTasks",getAllTasks)
router.delete("/deleteTask/:taskId",deleteInprogressTask)
router.patch("/editTask/:taskId",editInProgressTask)

module.exports = router;