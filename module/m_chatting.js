const chattingModel = require("../model/md_chatting")

exports.addChatting = async function (REQUEST_ID,TARGET_ID,MESSAGE) {
    try{
        await chattingModel.create({
            REQUEST_ID: REQUEST_ID,
            DESTINATION_ID: TARGET_ID,
            MESSAGE:MESSAGE,
            CREATED: new Date()
        })
        return true
    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.getChatting = async function (REQUEST_ID,TARGET_ID) {
    try{
        return await chattingModel.find({"$or":[{REQUEST_ID: REQUEST_ID},{
            DESTINATION_ID: TARGET_ID}]
        },true,false,"CREATED")
    }
    catch(e) {
        console.error(e)
        return false
    }
}