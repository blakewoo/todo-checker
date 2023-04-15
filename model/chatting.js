const mongoose = require('mongoose');
const todoList = new mongoose.Schema({
    REQUEST_ID: String,
    DESTINATION_ID: String,
    MESSAGE: String,
    CREATED:Date
});

module.exports = mongoose.model('CHATTING_LIST', todoList);