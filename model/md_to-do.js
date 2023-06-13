const mongoose = require('mongoose');
const todoList = new mongoose.Schema({
    USER_ID: String,
    CREATED_DATE: Date,
    TARGET_DATE: Date,
    DEAD_LINE:Date,
    DATA: String,
    ORDER: Number,
    TYPE:String,
    IS_DONE: Boolean
});

let todoObj = mongoose.model('TODO_LIST', todoList);

async function create (query) {
    try{
        return await todoObj.create(query)
    }
    catch(e){
        console.error(e)
        throw e
    }
}

async function find(query) {
    try{
        return await todoObj.find(query)
    }
    catch(e){
        console.error(e)
        throw e
    }
}

async function deleteOne(query) {
    try{
        return await todoObj.deleteOne(query)
    }
    catch(e){
        console.error(e)
        throw e
    }
}

async function deleteMany(query){
    try{
        return await todoObj.deleteMany(query)
    }
    catch(e){
        console.error(e)
        throw e
    }
}

async function updateOne(query,updateObject) {
    try{
        return await todoObj.updateOne(query,updateObject)
    }
    catch(e){
        console.error(e)
        throw e
    }
}


module.exports = {create,find,deleteOne,deleteMany,updateOne}