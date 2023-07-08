var express = require('express');
var router = express.Router();
const todoShareOrigin = require("../module/m_todo_share")

module.exports = function (maria,mongo) {
    let todoShare = todoShareOrigin(maria,mongo)

    router.get('/request',async function(req, res, next) {
        let result = await todoShare.getRequest(req.session.ID)
        if(result.status) {
            return res.send({status:true,result:result.result})
        }
        else {
            return res.send({status:false})
        }
    });

    router.get('/request/accept',async function(req, res, next) {
        let result = await todoShare.getAcceptRequest(req.session.ID)
        if(result.status) {
            return res.send({status:true,result:result.result})
        }
        else {
            return res.send({status:false})
        }
    });

    router.post('/request',async function(req, res, next) {
        let result = await todoShare.addRequest(req.session.ID,req.body.target)
        if(result.status) {
            return res.send({status:true,result:result.status})
        }
        else {
            return res.send({status:false})
        }
    });

    router.delete('/request',async function(req, res, next) {
        let result = await todoShare.deleteRequest(req.body.target)
        if(result.status) {
            return res.send({status:true})
        }
        else {
            return res.send({status:false})
        }
    });

    router.get('/receive',async function(req, res, next) {
        let result = await todoShare.getReceive(req.session.ID)
        if(result.status) {
            return res.send({status:true,result:result.result})
        }
        else {
            return res.send({status:false})
        }
    });

    router.put('/receive',async function(req, res, next) {
        let result = await todoShare.updateReceive(req.body.requester,req.session.ID,req.body.state)
        if(result.status) {
            return res.send({status:true,result:result.result})
        }
        else {
            return res.send({status:false})
        }
    });

    router.get('/chatlist',async function(req, res, next) {
        let result = await todoShare.getChatList(req.session.ID)
        if(result.status) {
            return res.send({status:true,result:result.result,myId:req.session.ID})
        }
        else {
            return res.send({status:false})
        }
    });
    return router
}
