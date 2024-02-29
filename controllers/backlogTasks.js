const BacklogTask = require("../models/BacklogTasks")

const postBacklogTask = async (req, res) => {
    try {
        const { title, selectPriority, checkList, taskList, dueDate } = req.body;
        const userId = await req.header("userId")

        if (!title || !selectPriority || !taskList) {
            return res.status(409).json({
                success: false,
                errorMessage: "Bad Request"
            })
        }

        const newTask = new BacklogTask({
            title, selectPriority, checkList, taskList,
            dueDate, userId
        });

        try {
            await newTask.save();
            res.status(200).json({
                success: true,
                message: "Task Created Successfully!!",
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                errorMessage: "Error in creating Task!!",
                error: error
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            errorMessage: "Internal Server Error"
        })
    }
}
const getAllTasks = async (req, res) => {
    try {
        const userId = await req.header("userId")
        const tasks = await BacklogTask.find({userId:userId})

        if (tasks.length < 0) {
            return res.status(404).json({
                success: false,
                errorMessage: "No Tasks Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Tasks Fetched Successfully",
            tasks: tasks
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            errorMessage: "Internal Server Error"
        })
    }
}

const getBacklogTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const userId = await req.header("userId")

        if (!taskId) return res.status(400).json({ success: false, errorMessage: "Bad Request,Missing taskId." })
        const taskDetails = await BacklogTask.findById({_id:taskId,userId:userId});

        if (!taskDetails) return res.status(404).json({ success: false, errorMessage: "No Task Found" });

        res.status(200).json({
            success: true,
            message: "Task Details Fetched Successfully",
            tasks: taskDetails
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            errorMessage: "Internal Server Error"
        })
    }
}

const deleteBacklogTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const userId = await req.header("userId")
        const deletedTask = await BacklogTask.findOneAndDelete({_id:taskId,userId:userId});
        

        if (!deletedTask) return res.status(404).json({ success: false, errorMessage: "Task Not Found" });

        res.status(200).json({
            success: true,
            message: "Task Deleted SuccessFully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            errorMessage: "Internal Server Error"
        })
    }
}

const editBacklogTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const { title, selectPriority, checkList, taskList, dueDate } = req.body
        const userId = await req.header("userId")


        if (!title || !selectPriority || !taskList) {
            return res.status(400).json({
                success: false,
                errorMessage: "Bad Request"
            })
        }

        try {
            await BacklogTask.updateOne({ _id: taskId,userId:userId }, {
                $set: { title, selectPriority, checkList, taskList, dueDate }
            })

            res.status(200).json({
                success: true,
                message: "Task Details Updated Sucessfully"
            })

        } catch (error) {

            res.status(500).json({
                success: false,
                errorMessage: "Error in Updating Backlog Task"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            errorMessage: "Internal Server Error"
        })
    }
}

module.exports = { getBacklogTask, postBacklogTask, getAllTasks, deleteBacklogTask, editBacklogTask }