var express = require('express');
let verify = require("../module/m_verify_user")
const todoModule = require("../module/m_todo")
var router = express.Router();

// TODO 불러들이기
router.get('/my',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.query.date) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.getTodo(req.session.ID,new Date(Number(req.query.date)))
        if(result) {
            return res.send({status:true,result:result})
        }
        else {
            return res.status(404).send({status:false})
        }
    }
    catch(e){
        return res.status(404).send({status:false})
    }
});

// TODO 추가
router.post('/my',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.CREATED_DATE) {
            return res.status(400).send({status:false})
        }
        if(!req.body.DATA) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.addTodo(req.session.ID,req.body.CREATED_DATE,req.body.TARGET_DATE,req.body.DATA)
        if(!result) {
            return res.send({status:false})
        }
        else {
            return res.send({status:true,result:result})
        }
    }
    catch(e){
        return res.status(404).send({status:false})
    }
});

// TODO 업데이트
router.put('/my',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.TODO_ID) {
            return res.status(400).send({status:false})
        }
        await todoModule.updateTodo(req.body.TODO_ID,req.body.TODO_DATA)
        return res.send({status:true})
    }
    catch(e){
        return res.status(404).send({status:false})
    }
});

// TODO 삭제
router.delete('/my',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.TODO_ID) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.deleteTodo(req.body.TODO_ID)
        if(result) {
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

module.exports = router;
