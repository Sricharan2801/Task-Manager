const Task = require("../models/Tasks");

const getAllTasks = async (req, res) => {
    try {
        // Determine the filter type from the query parameter
        const duration = req.query.duration || "";

        // Validate duration
        if (!["today", "this week", "this month"].includes(duration)) {
            return res.status(400).json({
                success: false,
                errorMessage: "Invalid duration. Accepted values are 'today', 'this week', or 'this month'."
            });
        }

        let query = {};

        // Get the current date
        const currentDate = new Date();

        // Define the start and end date variables for the filter
        let startingDate, endingDate;

        
        if (duration === "today") {
            startingDate = new Date(currentDate)
            startingDate.setHours(0, 0, 0, 0)
            endingDate = new Date(currentDate)
            endingDate.setHours(23, 59, 59, 999)
        } else if (duration === "this week") {
            // Calculate start date 
            startingDate = new Date(currentDate)
            startingDate.setDate(startingDate.getDate() - 7); // 7 days ago
            startingDate.setHours(0, 0, 0, 0); // Start of the day

            // Set end date as the current date
            endingDate = new Date(currentDate)
            endingDate.setHours(23, 59, 59, 999)
        } else if (duration === "this month") {
            // Calculate start date 30 days ago from the current date
            startingDate = new Date(currentDate)
            startingDate.setDate(startingDate.getDate() - 30) // 30 days ago
            startingDate.setHours(0, 0, 0, 0) // Start of the day

            // Set end date as the current date
            endingDate = new Date(currentDate)
            endingDate.setHours(23, 59, 59, 999) // End of the current day
        }

        // Add the createdDate filter to the query
        if (startingDate && endingDate) {
            query.createdDate = { $gte: startingDate, $lte: endingDate };
        }

        // fetching taskDetails
        const taskDetails = await Task.find(query);

        if (taskDetails.length === 0) {
            return res.status(404).json({
                success: false,
                errorMessage: "No Tasks Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task Details Fetched Successfully",
            taskDetails: taskDetails
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            errorMessage: "Internal Server Error"
        });
    }
}


const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId;

        if (!taskId) return res.status(400).json({ success: false, errorMessage: "Bad Request. Missing taskId." });

        const taskDetails = await Task.findById(taskId);

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

module.exports = { getAllTasks, getTaskById };
