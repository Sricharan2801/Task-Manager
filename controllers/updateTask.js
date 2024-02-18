const Task = require("../models/Tasks");

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const { title, selectPriority, checkList, dueDate } = req.body;

        if (!title || !selectPriority || !checkList || !dueDate) {
            return res.status(400).json({
                success: false,
                errorMessage: "Bad Request"
            })
        }

        try {
            await Task.updateOne({_id:taskId}, {
                $set: { title, selectPriority, checkList, dueDate }
            })

            res.status(200).json({
                success:true,
                message:"Task Details Updated Sucessfully"
            })

        } catch (error) {

            res.status(500).json({
                success:false,
                errorMessage:"Error in Updating Task"
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