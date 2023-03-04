var express = require('express');
var router = express.Router();

const m_user = require("../module/m_user")

router.get('/my', async function(req, res, next) {
    try{
        let result = await m_user.getUser(req.session.ID);
        return res.send({status:true,result:result})
    }
    catch(e){
        console.log(e)
        return res.send({status:false,reason:"unknown"})
    }
});

router.post('/my', async function(req, res, next) {
    try{
        if(m_user.verifyEmail(req.body.EMAIL)){
            return res.send({status:false,reason:"malformed email"})
        }
        let result = await m_user.addUser(req.body.ID,req.body.PASSWORD,req.body.EMAIL);
        return res.send(result)
    }
    catch(e){
        console.log(e)
        return res.send({status:false,reason:"unknown"})
    }
});

router.put('/my', async function(req, res, next) {
    try{
        if(m_user.verifyEmail(req.body.EMAIL)){
            return res.send({status:false,reason:"malformed email"})
        }
        if(req.body.PASSWORD !== req.body.PASSWORD_CONFIRM){
            return res.send({status:false,reason:"Not match password"})
        }

        let result = await m_user.updateUser(req.session.ID,req.body.PASSWORD,req.body.EMAIL);
        return res.send(result)
    }
    catch(e){
        console.log(e)
        return res.send({status:false,reason:"unknown"})
    }
});

router.delete('/', function(req, res, next) {

});

module.exports = router;
