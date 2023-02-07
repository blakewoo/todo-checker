var express = require('express');
let verify = require("../module/m_verify_user")
var router = express.Router();

router.get('/my',verify.user_auth,function(req, res, next) {
    try{
        // get my todolist
    }
    catch(e){
        return res.status(401).send({status:false})
    }
});

router.post('/', async function(req, res, next) {

});

router.put('/', function(req, res, next) {

});

router.delete('/', function(req, res, next) {

});

module.exports = router;
