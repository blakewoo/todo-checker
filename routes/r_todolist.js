var express = require('express');
const todoModuleOrigin = require("../module/m_todo")
let sessionCheck = require("../module/m_verify_user").user_auth
let verifyModuleOrigin = require("../module/m_verify_user")
var router = express.Router();

module.exports=function (maria,mongo) {
    let todoModule = todoModuleOrigin(maria,mongo)
    let sharedAuth = verifyModuleOrigin.target_auth(maria,mongo)

    router.get('/my/daily',sessionCheck,async function(req, res, next) {
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
            console.error(e)
            return res.status(404).send({status:false})
        }
    });

// 일일 TODO 추가
    router.post('/my/daily',sessionCheck,async function(req, res, next) {
        try{
            // get my comment list
            if(!req.body.TARGET_DATE) {
                return res.status(400).send({status:false})
            }
            if(!req.body.DATA) {
                return res.status(400).send({status:false})
            }
            let result = await todoModule.addTodo(req.session.ID,new Date(),req.body.TARGET_DATE,req.body.DATA,"DAILY")
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
    router.put('/my/daily',sessionCheck,async function(req, res, next) {
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
    router.delete('/my/daily',sessionCheck,async function(req, res, next) {
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
    router.get('/my/notification/daily',sessionCheck,async function(req, res, next) {
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
    router.get('/my/notification/monthly',sessionCheck,async function(req, res, next) {
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
    router.post('/my/notification',sessionCheck,async function(req, res, next) {
        try{
            // get my comment list
            if(!req.body.TARGET_DATE) {
                return res.status(400).send({status:false})
            }
            if(!req.body.DATA) {
                return res.status(400).send({status:false})
            }
            let result = await todoModule.addTodo(req.session.ID,new Date(),req.body.TARGET_DATE,req.body.DATA,"NOTIFICATION")
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
    router.put('/my/notification',sessionCheck,async function(req, res, next) {
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
    router.delete('/my/notification',sessionCheck,async function(req, res, next) {
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
    router.get('/my/weekly',sessionCheck,async function(req, res, next) {
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
    router.post('/my/weekly',sessionCheck,async function(req, res, next) {
        try{
            // get my comment list
            if(!req.body.TARGET_DATE) {
                return res.status(400).send({status:false})
            }
            if(!req.body.DATA) {
                return res.status(400).send({status:false})
            }
            let result = await todoModule.addTodo(req.session.ID,new Date(),req.body.TARGET_DATE,req.body.DATA,"WEEKLY")
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
    router.put('/my/weekly',sessionCheck,async function(req, res, next) {
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

// 주간 TODO 삭제
    router.delete('/my/weekly',sessionCheck,async function(req, res, next) {
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

// 월간 TODO 불러들이기
    router.get('/my/monthly',sessionCheck,async function(req, res, next) {
        try{
            // get my comment list
            if(!req.query.date) {
                return res.status(400).send({status:false})
            }
            let result = await todoModule.getMontlyTodo(req.session.ID,new Date(Number(req.query.date)))
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
    router.post('/my/monthly',sessionCheck,async function(req, res, next) {
        try{
            // get my comment list
            if(!req.body.TARGET_DATE) {
                return res.status(400).send({status:false})
            }
            if(!req.body.DATA) {
                return res.status(400).send({status:false})
            }
            let result = await todoModule.addTodo(req.session.ID,new Date(),req.body.TARGET_DATE,req.body.DATA,"MONTHLY")
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
    router.put('/my/monthly',sessionCheck,async function(req, res, next) {
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

// 월간 TODO 삭제
    router.delete('/my/monthly',sessionCheck,async function(req, res, next) {
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

// TARGET TODO 불러들이기
    router.get('/target/daily',sessionCheck,sharedAuth,async function(req, res, next) {
        try{
            if(!req.query.ID) {
                return res.status(400).send({status:false})
            }
            if(!req.query.date) {
                return res.status(400).send({status:false})
            }
            let result = await todoModule.getDailyTodo(req.query.ID,new Date(Number(req.query.date)))
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

    router.get('/target/notification/daily',sessionCheck,sharedAuth,async function(req, res, next) {
        try{
            if(!req.query.ID) {
                return res.status(400).send({status:false})
            }
            if(!req.query.date) {
                return res.status(400).send({status:false})
            }
            let result = await todoModule.getDailyNotificationTodo(req.query.ID,new Date(Number(req.query.date)))
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

    router.get('/target/notification/monthly',sessionCheck,sharedAuth,async function(req, res, next) {
        try{
            if(!req.query.ID) {
                return res.status(400).send({status:false})
            }
            if(!req.query.date) {
                return res.status(400).send({status:false})
            }
            let result = await todoModule.getMonthlyNotificationTodo(req.query.ID,new Date(Number(req.query.date)))
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

    router.get('/target/weekly',sessionCheck,sharedAuth,async function(req, res, next) {
        try{
            if(!req.query.ID) {
                return res.status(400).send({status:false})
            }
            if(!req.query.date) {
                return res.status(400).send({status:false})
            }
            let result = await todoModule.getWeeklyTodo(req.query.ID,new Date(Number(req.query.date)))
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

    router.get('/target/monthly',sessionCheck,sharedAuth,async function(req, res, next) {
        try{
            if(!req.query.ID) {
                return res.status(400).send({status:false})
            }
            if(!req.query.date) {
                return res.status(400).send({status:false})
            }
            let result = await todoModule.getMontlyTodo(req.query.ID,new Date(Number(req.query.date)))
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
    return router
}
// 일일 TODO 불러들이기
