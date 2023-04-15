var express = require('express');
var router = express.Router();

router.get('/my',async function(req, res, next) {
    try{

    }
    catch(e){
        return res.status(404).send({status:false})
    }
});

router.post('/my',async function(req, res, next) {
    try{

    }
    catch(e){
        return res.status(404).send({status:false})
    }
});

module.exports = router;

