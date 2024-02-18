const Task = require("../models/Tasks");

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;

        const deletedTask = await Task.findByIdAndDelete(taskId);

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

module.exports = deleteTask;