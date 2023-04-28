var express = require('express');
let verify = require("../module/m_verify_user")
const todoModule = require("../module/m_todo")
var router = express.Router();

// 일일 TODO 불러들이기
router.get('/my/daily',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.query.date) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.getDailyTodo(req.session.ID,new Date(Number(req.query.date)))
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

// 일일 TODO 추가
router.post('/my/daily',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.CREATED_DATE) {
            return res.status(400).send({status:false})
        }
        if(!req.body.DATA) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.addTodo(req.session.ID,req.body.CREATED_DATE,req.body.TARGET_DATE,req.body.DATA,"DAILY")
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

// 일일 TODO 업데이트
router.put('/my/daily',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.TODO_ID) {
            return res.status(400).send({status:false})
        }
        await todoModule.updateTodo(req.body.TODO_ID,req.body.TODO_DATA,"DAILY")
        return res.send({status:true})
    }
    catch(e){
        return res.status(404).send({status:false})
    }
});

// 일일 TODO 삭제
router.delete('/my/daily',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.TODO_ID) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.deleteTodo(req.body.TODO_ID,"DAILY")
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

// 표기될 TODO 불러들이기
router.get('/my/notification/daily',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.query.date) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.getDailyNotificationTodo(req.session.ID,new Date(Number(req.query.date)),"NOTIFICATION")
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

// 표기될 TODO 불러들이기
router.get('/my/notification/monthly',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.query.date) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.getMonthlyNotificationTodo(req.session.ID,new Date(Number(req.query.date)),"NOTIFICATION")
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

// 표기될 TODO 추가
router.post('/my/notification',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.CREATED_DATE) {
            return res.status(400).send({status:false})
        }
        if(!req.body.DATA) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.addTodo(req.session.ID,req.body.CREATED_DATE,req.body.TARGET_DATE,req.body.DATA,"NOTIFICATION")
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

// 표기될 TODO 업데이트
router.put('/my/notification',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.TODO_ID) {
            return res.status(400).send({status:false})
        }
        await todoModule.updateTodo(req.body.TODO_ID,req.body.TODO_DATA,"NOTIFICATION")
        return res.send({status:true})
    }
    catch(e){
        return res.status(404).send({status:false})
    }
});

// 표기될 TODO 삭제
router.delete('/my/notification',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.TODO_ID) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.deleteTodo(req.body.TODO_ID,"NOTIFICATION")
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

// 주간 TODO 불러들이기
router.get('/my/weekly',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.query.date) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.getWeeklyTodo(req.session.ID,new Date(Number(req.query.date)),"WEEKLY")
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

// 주간 TODO 추가
router.post('/my/weekly',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.CREATED_DATE) {
            return res.status(400).send({status:false})
        }
        if(!req.body.DATA) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.addTodo(req.session.ID,req.body.CREATED_DATE,req.body.TARGET_DATE,req.body.DATA,"WEEKLY")
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

// 주간 TODO 업데이트
router.put('/my/weekly',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.TODO_ID) {
            return res.status(400).send({status:false})
        }
        await todoModule.updateTodo(req.body.TODO_ID,req.body.TODO_DATA,"WEEKLY")
        return res.send({status:true})
    }
    catch(e){
        return res.status(404).send({status:false})
    }
});

// 주간 TODO 삭제
router.delete('/my/weekly',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.TODO_ID) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.deleteTodo(req.body.TODO_ID,"WEEKLY")
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

// 월간 TODO 불러들이기
router.get('/my/monthly',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.query.date) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.getMontlyTodo(req.session.ID,new Date(Number(req.query.date)),"MONTHLY")
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

// 월간 TODO 추가
router.post('/my/monthly',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.CREATED_DATE) {
            return res.status(400).send({status:false})
        }
        if(!req.body.DATA) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.addTodo(req.session.ID,req.body.CREATED_DATE,req.body.TARGET_DATE,req.body.DATA,"MONTHLY")
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

// 월간 TODO 업데이트
router.put('/my/monthly',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.TODO_ID) {
            return res.status(400).send({status:false})
        }
        await todoModule.updateTodo(req.body.TODO_ID,req.body.TODO_DATA,"MONTHLY")
        return res.send({status:true})
    }
    catch(e){
        return res.status(404).send({status:false})
    }
});

// 월간 TODO 삭제
router.delete('/my/monthly',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.TODO_ID) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.deleteTodo(req.body.TODO_ID,"MONTHLY")
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

// TARGET TODO 불러들이기
router.get('/target/daily',verify.user_auth,async function(req, res, next) {
    try{
        if(!req.query.date) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.getDailyTodo(req.query.ID,new Date(Number(req.query.date)),"DAILY")
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

router.get('/target/notification',verify.user_auth,async function(req, res, next) {
    try{
        if(!req.query.date) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.getDailyNotificationTodo(req.query.ID,new Date(Number(req.query.date)),"NOTIFICATION")
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

router.get('/target/weekly',verify.user_auth,async function(req, res, next) {
    try{
        if(!req.query.date) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.getTodo(req.query.ID,new Date(Number(req.query.date)),"WEEKLY")
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

router.get('/target/monthly',verify.user_auth,async function(req, res, next) {
    try{
        if(!req.query.date) {
            return res.status(400).send({status:false})
        }
        let result = await todoModule.getTodo(req.query.ID,new Date(Number(req.query.date)),"MONTHLY")
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

module.exports = router;
