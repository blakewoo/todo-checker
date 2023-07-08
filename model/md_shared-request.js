const mongoose = require('mongoose');

let todoRequest = new mongoose.Schema({
    OVERSEER_USER_ID: String,
    OVERSEER_EMAIL: String,
    TARGET_USER_ID: String,
    TARGET_EMAIL:String,
    CREATED_DATE: Date,
    STATUS:String
});


module.exports= todoRequest