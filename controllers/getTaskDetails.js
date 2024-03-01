const Task = require("../models/Tasks");

const getAllTasks = async(req,res)=>{
    try {
        const userId = await req.header["userId"]
        const taskDetails = await Task.find({userId:userId})

        if(taskDetails.length < 0){
            return res.status(404).json({
                success:false,
                errorMessage:"No Tasks Found"
            })
        }

        res.status(200).json({
            success:true,
            message:"Tasks Fetched Successfully..",
            taskDetails:taskDetails
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            errorMessage:"Internal Server Error"
        })
    }
}

const getAllTasksByFilter = async (req, res) => {
    try {
       
        const duration = req.query.duration || "";
        const userId = await req.header["userId"]

        if (!["today", "this week", "this month"].includes(duration)) {
            return res.status(400).json({
                success: false,
                errorMessage: "Invalid duration"
            });
        }

        let query = {};
        const currentDate = new Date();
        let startingDate, endingDate;

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

        // fetching taskDetails
        const taskDetails = await Task.find({...query,userId:userId});

        if (taskDetails.length === 0) {
            return res.status(404).json({
                success: false,
                errorMessage: "No Tasks Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task Details Fetched Successfully",
            taskDetails: taskDetails,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            errorMessage: "Internal Server Error",
            duration:duration
        });
    }
}


const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const userId = await req.header["userId"]

        if (!taskId) return res.status(400).json({ success: false, errorMessage: "Bad Request,Missing taskId" });

        const taskDetails = await Task.findById({_id:taskId,userId:userId});

        if (!taskDetails) return res.status(404).json({ success: false, errorMessage: "No Task Found" });

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

module.exports = {getAllTasks, getAllTasksByFilter, getTaskById };
