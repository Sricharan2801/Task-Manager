const Task = require("../models/Tasks");

const getAllTasks = async (req, res) => {
    try {
        const taskDetails = await Task.find({})

        if (taskDetails.length === 0) {
            res.status(404).json({
                success: false,
                errorMessage: "No Tasks Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Task Details Fetched Successfully",
            taskDetails: taskDetails
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            errorMessage: "Internal Server Error"
        })
    }
}

const getTaskById = async (req,res) => {
    try {
        const taskId = req.params.taskId;

        if (!taskId) return res.status(409).json({ success: false, errorMessage: "Bad Requets" });

        const taskDetails = await Task.findById(taskId);

        if (taskDetails.length === 0) return res.status(404).json({ success: false, errorMessage: "No Task Found" });

        res.status(200).json({
            success: true,
            message: "Task Details Fetched Successfully",
            taskDetails: taskDetails
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            errorMessage: "Internal Server Error"
        })
    }

}

module.exports = { getAllTasks, getTaskById };