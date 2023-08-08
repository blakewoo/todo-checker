const mongo = require("../../../connectors/mongodb")
const md_todo = require("../../../model/md_to-do")

exports.create = async function (obj) {
    try{
        let todo = mongo.model("TODO_LIST",md_todo);
        return await todo.create(obj)
    }
    catch(e) {
        console.log(e)
        return false
    }
}

exports.find = async function(obj) {
    try{
        let todo = mongo.model("TODO_LIST",md_todo);
        return await todo.find(obj)
    }
    catch(e) {
        console.log(e)
        return false
    }
}

exports.updateOne = async function (obj,updateObj) {
    try{
        let todo = mongo.model("TODO_LIST",md_todo);
        await todo.updateOne(obj,updateObj)
        return true
    }
    catch(e) {
        console.log(e)
        return false
    }
}

exports.deleteOne = async function (obj) {
    try{
        let todo = mongo.model("TODO_LIST",md_todo);
        await todo.deleteOne(obj)
        return true
    }
    catch(e) {
        console.log(e)
        return false
    }
}