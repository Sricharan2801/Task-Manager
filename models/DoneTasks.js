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
    taskList: {
        type: Array,
        required:true
    },
    dueDate: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
})

const DoneTask = mongoose.model("DoneTask", taskSchema);



module.exports = DoneTask;