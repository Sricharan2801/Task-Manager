const express = require("express");
const createTask = require("../controllers/taskPosting");
const { getAllTasks, getTaskById } = require("../controllers/getTaskDetails");
const updateTask = require("../controllers/updateTask");
const deleteTask = require("../controllers/deleteTask");

const router = express.Router();

// creating task
router.post("/createTask", createTask);

// getting task's
router.get("/allTasks", getAllTasks);
router.get("/task/:taskId", getTaskById);

// updating task
router.patch("/edit/:taskId", updateTask);

// deleting task
router.delete("/:taskId", deleteTask);

module.exports = router;