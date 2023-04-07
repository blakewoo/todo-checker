const mongoose = require("mongoose")
const config = require("../config/config")

module.exports = function () {
    mongoose.set('strictQuery', false);
    if(config.AUTH) {
        mongoose.connect("mongodb://"+config.DATA_DATABASE.ID+":"+config.DATA_DATABASE.PASSWORD+"@"+config.DATA_DATABASE.URL+":"+config.DATA_DATABASE.PORT+"/"+config.DATA_DATABASE.DATABASE+"?authSource=admin")
    }
    else {
        mongoose.connect("mongodb://"+config.DATA_DATABASE.URL+":"+config.DATA_DATABASE.PORT+"/"+config.DATA_DATABASE.DATABASE)
    }

    mongoose.connection.on('connected', function () {
        console.log("[SYSTEM] Mongo DB connected")
    });

    mongoose.connection.on('disconnected', function (err) {
        console.log("[SYSTEM] Mongo DB disconnected")
        console.log(err)
    });
}


