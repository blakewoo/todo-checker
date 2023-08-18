

exports.user_auth = function (req,res,next) {
    try{
        if(req.session.isLogin) {
            next()
        }
        else {
            return res.status(401).send({status:false, reason: "No auth"})
        }
    }
    catch(e){
        console.log(e)
        return res.status(401).send({status:false, reason: "Unknown"})
    }
}

exports.user_auth_redirect = function (req,res,next) {
    try{
        if(req.session.isLogin) {
            next()
        }
        else {
            return res.redirect('/');
        }
    }
    catch(e){
        console.log(e)
        return res.redirect('/');
    }
}

exports.user_auth_page = function (req,res,next) {
    try{
        if(req.session.isLogin) {
            next()
        }
        else {
            return res.render('login');
        }
    }
    catch(e){
        console.log(e)
        return res.render('login');
    }
}

// 차후 관리자 페이지 제작 예정
exports.admin_auth = async function (req,res,next) {
    try{
        if(req.session.isAdmin) {
            next()
        }
        else {
            return res.status(401).send({status:false})
        }
    }
    catch(e){
        console.log(e)
        return res.status(401).send({status:false})
    }
}

exports.target_auth = function (maria,mongo) {
    return async function (req,res,next) {
        try{
            if(req.query.ID) {
                let result = await mongo.shared.find({"$or":[{OVERSEER_USER_ID: req.query.ID, TARGET_USER_ID:req.session.ID},{OVERSEER_USER_ID: req.session.ID, TARGET_USER_ID:req.query.ID}]})
                if(result.length!==0) {
                    next()
                }
                else{
                    return res.status(401).send({status:false})
                }
            }
            else {
                return res.status(400).send({status:false,reason:"malform request"})
            }
        }
        catch(e){
            console.log(e)
            return res.status(401).send({status:false})
        }
    }
}

