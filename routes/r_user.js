var express = require('express');
var router = express.Router();

const userModule = require("../module/m_user")

router.get('/', function(req, res, next) {
    
});

router.post('/', async function(req, res, next) {
    try{
        let result = await userModule.addUser(req.body.ID,req.body.PASSWORD,req.body.EMAIL);
        return res.send(result)
    }
    catch(e){
        console.log(e)
        return res.send({status:false,reason:"unknown"})
    }
});

router.put('/', function(req, res, next) {

});

router.delete('/', function(req, res, next) {

});

module.exports = router;
