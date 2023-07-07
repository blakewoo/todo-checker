

export default function (maria,mongo) {
    var express = require('express');
    var router = express.Router();
    const m_user = require("../module/m_user")

    // This function does not conform to the api specification
    router.post('/verified-user',async function(req, res, next) {
        let result = await m_user(maria,mongo).verifyUser(req.body.ID,req.body.PASSWORD)
        if(result.status) {
            req.session.isLogin = true
            req.session.ID = req.body.ID
            req.session.save(function (err){
                if(err) {
                    return res.send({status:false,reason:"Session store error"})
                }
                else {
                    return res.send(result)
                }
            })
        }
        else {
            return res.send(result)
        }
    });

    return router
}
