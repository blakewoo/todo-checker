const mongoose = require('mongoose');
const todoList = new mongoose.Schema({
    OVERSEER_USER_ID: String,
    TARGET_USER_ID: String,
    TARGET_EMAIL:String,
    CREATED_DATE: Date
});

module.exports = mongoose.model('SHARED_TODO', todoList);