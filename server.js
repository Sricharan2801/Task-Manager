require("dotenv").config()
const express = require("express");
const cors = require("cors")
const databaseConnection = require("./config/databaseConnection");

// routes....
const usersRoute = require("./routes/usersRoute");
const tasksRoute = require("./routes/tasksRoute")

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
app.use("/api/v1/postTask", verifyToken, tasksRoute);
app.use("/api/v1/getTask", verifyToken, tasksRoute);
app.use("/api/v1/updateTask", verifyToken, tasksRoute);
app.use("/api/v1/deleteTask", verifyToken, tasksRoute);

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

