require("dotenv").config()
const express = require("express");
const cors = require("cors")
const databaseConnection = require("./config/databaseConnection");

// routes....
const usersRoute = require("./routes/usersRoute")
const tasksRoute = require("./routes/tasksRoute")
const backlogTasksRoute = require("./routes/BacklogTasksRoute")
const inProgressTasksRoute = require("./routes/InProgressRoutes")
const doneTasksRoute = require("./routes/DoneTasksRoute")

// middlewares
const verifyToken = require("./middlewares/userAutherization");
const { routeNotFound, errorHandler } = require("./middlewares/errorHandling")

const app = express();
const PORT = process.env.PORT || 9000

// database connection
databaseConnection()

app.use(express.json())
app.use(cors())

// API's
app.use("/api/v1/registration", usersRoute);
app.use("/api/v1/authentication", usersRoute);
app.use("/api/v1/updateUser",verifyToken,usersRoute);
app.use("/api/v1/postTask", verifyToken, tasksRoute);
app.use("/api/v1/getTask", verifyToken, tasksRoute);
app.use("/api/v1/updateTask", verifyToken, tasksRoute);
app.use("/api/v1/deleteTask", verifyToken, tasksRoute);
app.use("/api/v1/backlogTasks",verifyToken,backlogTasksRoute);
app.use("/api/v1/inProgressTasks",verifyToken,inProgressTasksRoute);
app.use("/api/v1/doneTasks",verifyToken,doneTasksRoute);



// health API to check the server
app.get("/health", (req, res) => {
    res.json({
        service: "TASK_MANAGER",
        status: "Active",
        date: new Date()
    })
})

// handles undefined routes
app.use(routeNotFound);
app.use(errorHandler)


app.listen(PORT, (error) => {
    !error ? console.log(`🔥Server is up and running on port ${PORT} `) :
        console.log('Something went wrong', error);
})

