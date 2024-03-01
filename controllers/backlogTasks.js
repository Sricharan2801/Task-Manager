const BacklogTask = require("../models/BacklogTasks")

const postBacklogTask = async (req, res) => {
    try {
        const { title, selectPriority, checkList, taskList, dueDate } = req.body;
        const userId = await req.headers["userId"]

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
        const duration = req.query.duration || "";
        const userId = await req.headers["userId"]
      
        if (!["today", "this week", "this month"].includes(duration)) {
            return res.status(400).json({
                success: false,
                errorMessage: "Invalid duration. Accepted values are 'today', 'this week', or 'this month'."
            });
        }
        let query = {};
        const currentDate = new Date();
        let startingDate, endingDate

        if (duration === "today") {
            startingDate = new Date(currentDate)
            startingDate.setHours(0, 0, 0, 0)
            endingDate = new Date(currentDate)
            endingDate.setHours(23, 59, 59, 999)
        } else if (duration === "this week") {
            startingDate = new Date(currentDate)
            startingDate.setDate(startingDate.getDate() - 7)
            startingDate.setHours(0, 0, 0, 0)

            endingDate = new Date(currentDate)
            endingDate.setHours(23, 59, 59, 999)
        } else if (duration === "this month") {
            startingDate = new Date(currentDate)
            startingDate.setDate(startingDate.getDate() - 30)
            startingDate.setHours(0, 0, 0, 0)

            endingDate = new Date(currentDate)
            endingDate.setHours(23, 59, 59, 999)
        }

        if (startingDate && endingDate) {
            query.createdDate = { $gte: startingDate, $lte: endingDate };
        }


        const tasks = await BacklogTask.find({...query,userId:userId})

        if (tasks.length === 0) {
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
        const userId = await req.headers["userId"]
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
        const userId = await req.headers["userId"]
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
        const userId = await req.headers["userId"]


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