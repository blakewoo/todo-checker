var express = require('express');
let verify = require("../module/m_verify_user")
const commentModule = require("../module/m_comment")
var router = express.Router();

// TODO 불러들이기
router.get('/my',verify.user_auth,function(req, res, next) {
    try{
        // get my comment list

    }
    catch(e){
        return res.status(404).send({status:false})
    }
});

// TODO 추가
router.post('/my',verify.user_auth,async function(req, res, next) {
    try{
        // get my comment list
        if(!req.body.USER_ID) {
            return res.status(400).send({status:false})
        }
        if(!req.body.TARGET_DATE) {
            return res.status(400).send({status:false})
        }
        if(!req.body.PARENT) {
            return res.status(400).send({status:false})
        }
        if(!req.body.DATA) {
            return res.status(400).send({status:false})
        }
        await commentModule.addComment(req.body.USER_ID,req.body.TARGET_DATE,req.body.PARENT,req.body.DATA)
        return res.send({status:true})
    }
    catch(e){
        return res.status(404).send({status:false})
    }
});

// TODO 업데이트
router.put('/',verify.user_auth, function(req, res, next) {

});

// TODO 삭제
router.delete('/',verify.user_auth, function(req, res, next) {

});

module.exports = router;
