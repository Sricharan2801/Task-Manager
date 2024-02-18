const Task = require("../models/Tasks");

const createTask = async (req, res) => {
    try {
        const { title, selectPriority, checkList, dueDate } = req.body;

        if (!title || !selectPriority || !checkList || !dueDate) {
            return res.status(409).json({
                success: false,
                errorMessage: "Bad Request"
            })
        }

        const newTask = new Task({title,selectPriority,checkList,dueDate});

        try {
            await newTask.save();
            res.status(200).json({
                success:true,
                message:"Task Created Successfully!!"
            })
            
        } catch (error) {
            res.status(500).json({
                success:false,
                errorMessage:"Error in creating job!!",
                error:error
            })
        }


    } catch (error) {
        res.status(500).json({
            errorMessage: "Internal Server Error"
        })
    }
}

module.exports = createTask;