var express = require('express');
var router = express.Router();
const m_userOrigin = require("../module/m_user")
const m_todoOrigin = require("../module/m_todo")
let sessionCheck = require("../module/m_verify_user").user_auth

module.exports=function (maria,mongo) {
    let m_user = m_userOrigin(maria,mongo)
    let m_todo = m_todoOrigin(maria,mongo)

    router.get('/my',sessionCheck, async function(req, res, next) {
        try{
            let result = await m_user.getUser(req.session.ID);
            return res.send({status:true,result:result})
        }
        catch(e){
            console.log(e)
            return res.status(400).send({status:false,reason:"unknown"})
        }
    });

    router.post('/my', async function(req, res, next) {
        try{
            if(m_user.verifyEmail(req.body.EMAIL)){
                return res.status(400).send({status:false,reason:"malformed email"})
            }
            let result = await m_user.addUser(req.body.ID,req.body.PASSWORD,req.body.EMAIL);
            return res.send(result)
        }
        catch(e){
            console.log(e)
            return res.status(400).send({status:false,reason:"unknown"})
        }
    });

    router.put('/my',sessionCheck, async function(req, res, next) {
        try{
            let passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,25}$/;
            if(m_user.verifyEmail(req.body.EMAIL)){
                return res.status(400).send({status:false,reason:"malformed email"})
            }
            if(req.body.PASSWORD !== req.body.PASSWORD_CONFIRM){
                return res.status(400).send({status:false,reason:"Not match password"})
            }
            if(req.body.PASSWORD !== "" && !passwordReg.test(req.body.PASSWORD)){
                return res.status(400).send({status:false,reason:"malformed password"})
            }

            let result = await m_user.updateUser(req.session.ID,req.body.PASSWORD,req.body.EMAIL);
            return res.send(result)
        }
        catch(e){
            console.log(e)
            return res.send({status:false,reason:"unknown"})
        }
    });

    router.delete('/my',sessionCheck,async function(req, res, next) {
        try {
            // Remove to-dos
            await m_todo.deleteUserTodos(req.session.ID);
            // Remove user information
            await m_user.deleteUser(req.session.ID);
            // Remove session
            req.session.isLogin = null
            req.session.ID = null
            return res.send({status:true})
        }
        catch(e) {
            console.log(e)
            return res.send({status:false,reason:"unknown"})
        }
    });

    return router
}


