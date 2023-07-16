const chattingModelOrigin = require("../model/md_chatting")

module.exports=function(maria,mongo) {
    let module = {}

    module.addChatting = async function (REQUEST_ID,TARGET_ID,MESSAGE) {
        try{
            await mongo.chatting.create({
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

    module.getChatting = async function (REQUEST_ID,TARGET_ID) {
        try{
            return await mongo.chatting.find({"$or":[{REQUEST_ID: REQUEST_ID},{
                    DESTINATION_ID: TARGET_ID}]
            }).sort({"CREATED":-1});
        }
        catch(e) {
            console.error(e)
            return false
        }
    }
    return module;
}

