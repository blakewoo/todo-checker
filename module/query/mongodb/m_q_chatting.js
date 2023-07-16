const mongo = require("../../../connectors/mongodb")
const chatting = require("../../../model/md_chatting")

exports.create = async function(obj) {
    try{
        let chat = mongo.model("CHATTING_LIST",chatting);
        await chat.create(obj)
        return true
    }
    catch(e) {
        console.log(e)
        return false
    }
}

exports.find = async function(obj) {
    try{
        let chat = mongo.model("CHATTING_LIST",chatting);
        let result = await chat.find(obj)
        return result
    }
    catch(e) {
        console.log(e)
        return false
    }
}

exports.updateOne = async function(obj,updateObj) {
    try{
        let chat = mongo.model("CHATTING_LIST",chatting);
        await chat.updateOne(obj,updateObj)
        return true
    }
    catch(e) {
        console.log(e)
        return false
    }
}

exports.deleteOne = async function(obj) {
    try{
        let chat = mongo.model("CHATTING_LIST",chatting);
        await chat.deleteOne(obj)
        return true
    }
    catch(e) {
        console.log(e)
        return false
    }
}
