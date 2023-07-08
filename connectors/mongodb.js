const mongoose = require("mongoose")
const config = require("../config/config")

let conn;
mongoose.set('strictQuery', false);
if(config.AUTH) {
    conn = mongoose.createConnection("mongodb://"+config.DATA_DATABASE.ID+":"+config.DATA_DATABASE.PASSWORD+"@"+config.DATA_DATABASE.URL+":"+config.DATA_DATABASE.PORT+"/"+config.DATA_DATABASE.DATABASE+"?authSource=admin")
}
else {
    conn = mongoose.createConnection("mongodb://"+config.DATA_DATABASE.URL+":"+config.DATA_DATABASE.PORT+"/"+config.DATA_DATABASE.DATABASE)
}
module.exports = conn

