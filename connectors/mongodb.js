const mongoose = require("mongoose")
const config = require("../config/config")

module.exports = function () {
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://"+config.DATA_DATABASE.URL+":"+config.DATA_DATABASE.PORT)

    mongoose.connection.on('connected', function () {
        console.log("Mongo DB connected")
    });

    mongoose.connection.on('disconnected', function (err) {
        console.log("Mongo DB disconnected")
        console.log(err)
    });
}


