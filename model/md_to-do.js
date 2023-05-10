const mongoose = require('mongoose');
const todoList = new mongoose.Schema({
    USER_ID: String,
    CREATED_DATE: Date,
    TARGET_DATE: Date,
    DEAD_LINE:Date,
    DATA: String,
    ORDER: Number,
    TYPE:String,
    IS_DONE: Boolean
});

module.exports = mongoose.model('TODO_LIST', todoList);