const mongoose = require('mongoose');
const todoList = new mongoose.Schema({
    USER_ID: String,
    COMMENT_ID: String,
    TARGET_DATE: Date,
    PARENT:mongoose.Schema.Types.ObjectId,
    DATA:String
});

module.exports = mongoose.model('COMMENT_LIST', todoList);