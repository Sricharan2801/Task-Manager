const Task = require("../models/Tasks");

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const { title, selectPriority, checkList, taskList, dueDate } = req.body
        const userId = await req.header["userId"]

        if (!title || !selectPriority || !taskList) {
            return res.status(400).json({
                success: false,
                errorMessage: "Bad Request"
            })
        }

        try {
            await Task.updateOne({ _id: taskId,userId:userId }, {
                $set: { title, selectPriority, checkList,taskList,dueDate }
            })

            res.status(200).json({
                success: true,
                message: "Task Details Updated Sucessfully"
            })

        } catch (error) {

            res.status(500).json({
                success: false,
                errorMessage: "Error in Updating Task"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            errorMessage: "Internal Server Error"
        })
    }
}

module.exports = updateTask;