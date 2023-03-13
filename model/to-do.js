const mongoose = require('mongoose');
const todoList = new mongoose.Schema({
    USER_ID: String,
    CREATED_DATE: Date,
    DEAD_LINE:Date,
    DATA: String,
    order: Number,
    isDone: Boolean
});

module.exports = mongoose.model('TODO_LIST', todoList);