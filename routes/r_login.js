var express = require('express');
var router = express.Router();
const m_user = require("../module/m_user")

// This function does not conform to the api specification
router.post('/verified-user',async function(req, res, next) {
    let result = await m_user.verifyUser(req.body.ID,req.body.PASSWORD)
    if(result.status) {
        req.session.isLogin = true
        req.session.ID = req.body.ID
    }
    return res.send(result)
});

module.exports = router;
