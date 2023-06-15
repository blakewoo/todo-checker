const mongoose = require('mongoose');
const todoShare = new mongoose.Schema({
    OVERSEER_USER_ID: String,
    OVERSEER_EMAIL: String,
    TARGET_USER_ID: String,
    TARGET_EMAIL:String,
    CREATED_DATE: Date,
    STATUS:String
});

let todoShared = mongoose.model('SHARED_TODO_REQUEST', todoShare);

async function create (query) {
    try{
        return await todoShared.create(query)
    }
    catch(e){
        console.error(e)
        throw e
    }
}

async function find (query,isSort,isDec,attribute) {
    try{
        if(isSort) {
            let sortAtt = {}
            if(isDec) {
                sortAtt[attribute] = -1
            }
            else{
                sortAtt[attribute] = 1
            }
            return await todoShared.find(query).sort(sortAtt)
        }
        else{
            return await todoShared.find(query)
        }
    }
    catch(e) {
        console.log(e)
        throw e
    }
}

async function deleteOne(query) {
    try{
        return await todoShared.deleteOne(query)
    }
    catch(e){
        console.error(e)
        throw e
    }
}

async function updateOne(query,updateObject) {
    try{
        return await todoShared.updateOne(query,updateObject)
    }
    catch(e){
        console.error(e)
        throw e
    }
}

module.exports = {create,find,deleteOne,updateOne}