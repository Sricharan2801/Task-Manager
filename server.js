require("dotenv").config()
const express = require("express");
const databaseConnection = require("./config/databaseConnection");
const app = express();
const PORT = process.env.PORT || 9000

// database connection
databaseConnection()

// health API to check the server
app.get("/health", (req, res) => {
    res.json({
        service: "TASK_MANAGER",
        status: "Active",
        date: new Date()
    })
})

app.listen(PORT, (error) => {
    !error ? console.log(`🔥Server is up and running on port ${PORT} `) :
        console.log('Something went wrong', error);
})