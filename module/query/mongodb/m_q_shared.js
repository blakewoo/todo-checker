const mongo = require("../../../connectors/mongodb")
const shared = require("../../../model/md_shared-request")

exports.create = async function (obj) {
    try{
        let share = mongo.model("SHARED_TODO_REQUEST",shared);
        await share.create({obj})
        return true
    }
    catch(e) {
        console.log(e)
        return false
    }
}

exports.find = async function (obj) {
    try{
        let share = mongo.model("SHARED_TODO_REQUEST",shared);
        let result = await share.find(obj)
        return result
    }
    catch(e) {
        console.log(e)
        return false
    }
}

exports.deleteOne = async function (obj) {
    try{
        let share = mongo.model("SHARED_TODO_REQUEST",shared);
        await share.deleteOne(obj)
        return true
    }
    catch(e) {
        console.log(e)
        return false
    }
}

exports.updateOne = async function (obj,updateObj) {
    try{
        let share = mongo.model("SHARED_TODO_REQUEST",shared);
        await share.updateOne(obj,updateObj)
        return true
    }
    catch(e) {
        console.log(e)
        return false
    }
}