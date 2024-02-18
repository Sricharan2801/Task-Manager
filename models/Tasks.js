const mongoose = require("mongoose");



const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    selectPriority: {
        type: String,
        required: true
    },
    checkList: {
        type: Array,
        required: true
    },
    dueDate: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

const Task = mongoose.model("Task", taskSchema);



module.exports = Task;