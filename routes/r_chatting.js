var express = require('express');
var router = express.Router();
const chatModuleOrigin = require("../module/m_chatting")
let sessionCheck = require("../module/m_verify_user").user_auth

module.exports=function (maria,mongo) {
    let chatModule = chatModuleOrigin(maria,mongo)
    // let sessionCheck = function (req, res, next) {
    //     if (req.session.isLogin) {
    //         next()
    //     } else {
    //         return res.status(401).send({status: false, reason: "No auth"})
    //     }
    // }


    router.get('/my',sessionCheck,async function(req, res, next) {
        try{
            if(!req.query.targetId){
                return res.status(400).send({status:false})
            }
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

    router.post('/my',sessionCheck,async function(req, res, next) {
        try{
            if(!req.body.targetId){
                return res.status(400).send({status:false})
            }
            if(!req.body.message){
                return res.status(400).send({status:false})
            }
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