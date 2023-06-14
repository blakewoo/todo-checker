const mongoose = require('mongoose');
const chattingList = new mongoose.Schema({
    REQUEST_ID: String,
    DESTINATION_ID: String,
    MESSAGE: String,
    CREATED:Date
});

let chattingObj = mongoose.model('CHATTING_LIST', chattingList);

async function create(query) {
    try{
        return await chattingObj.create(query)
    }
    catch(e) {
        console.log(e)
        throw e
    }
}

async function find(query,isSort,isDec,attribute) {
    try{
        if(isSort) {
            if(isDec) {
                let sortAtt = {}
                sortAtt[attribute] = -1

                return await chattingObj.find(query).sort(sortAtt)
            }
            else{
                let sortAtt = {}
                sortAtt[attribute] = 1

                return await chattingObj.find(query).sort(sortAtt)
            }
        }
        else{
            return await chattingObj.find(query)
        }
    }
    catch(e) {
        console.log(e)
        throw e
    }
}

module.exports = {create,find}