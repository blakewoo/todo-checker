const chattingModelOrigin = require("../model/md_chatting")

module.exports=function(maria,mongo) {
    let module = {}
    let chattingModel = mongo.model("CHATTING_LIST",chattingModelOrigin)

    module.addChatting = async function (REQUEST_ID,TARGET_ID,MESSAGE) {
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

    module.getChatting = async function (REQUEST_ID,TARGET_ID) {
        try{
            return await chattingModel.find({"$or":[{REQUEST_ID: REQUEST_ID},{
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

