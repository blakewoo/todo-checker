var express = require('express');
var router = express.Router();
const todoShare = require("../module/m_todo_share")

router.get('/request',async function(req, res, next) {
    let result = await todoShare.getRequest(req.session.ID)
    if(result) {
        res.send({status:true,result:result})
    }
    else {
        res.send({status:false})
    }
});

router.post('/request',async function(req, res, next) {
    let result = await todoShare.addRequest(req.session.ID,req.body.target)
    if(result) {
        res.send({status:true,result:result})
    }
    else {
        res.send({status:false})
    }
});

router.delete('/request',async function(req, res, next) {

});

router.get('/receive',async function(req, res, next) {
    let result = todoShare.getReceive(req.session.ID)
    if(result) {
        res.send({status:true,result:result})
    }
    else {
        res.send({status:false})
    }
});

module.exports = router;
