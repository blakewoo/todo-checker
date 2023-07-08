var express = require('express');
var router = express.Router();
const chatModuleOrigin = require("../module/m_chatting")

module.exports=function (maria,mongo) {
    let chatModule = chatModuleOrigin(maria,mongo)

    router.get('/my',async function(req, res, next) {
        try{
            let result = await chatModule.getChatting(req.session.ID,req.query.targetId)
            if (result) {
                return res.send({status:true,result:result})
            }
            else {
                return res.send({status:false})
            }
        }
        catch(e){
            return res.status(404).send({status:false})
        }
    });

    router.post('/my',async function(req, res, next) {
        try{
            let result = await chatModule.addChatting(req.session.ID,req.body.targetId,req.body.message)
            if (result) {
                return res.send({status:true})
            }
            else {
                return res.send({status:false})
            }
        }
        catch(e){
            return res.status(404).send({status:false})
        }
    });
    return router
}