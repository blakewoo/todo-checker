const mongoose = require('mongoose');
const todoList = new mongoose.Schema({
    USER_ID: String,
    TARGET_DATE: Date,
    DATA: String,
    isDone: Boolean
});

module.exports = mongoose.model('TODO_LIST', todoList);