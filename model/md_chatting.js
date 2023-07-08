const mongoose = require('mongoose');

const chattingList = new mongoose.Schema({
    REQUEST_ID: String,
    DESTINATION_ID: String,
    MESSAGE: String,
    CREATED:Date
});

module.exports = chattingList