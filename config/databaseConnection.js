const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Task-Manager"
    })

    console.log("Connected to database..");

  } catch (error) {
    console.log("Error in connecting to database", error);
  }
}

module.exports = databaseConnection;