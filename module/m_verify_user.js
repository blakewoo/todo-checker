

exports.user_auth = function (req,res,next) {
    try{
        if(req.session.isLogin) {
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

exports.admin_auth = async function (req,res,next) {
    try{

    }
    catch(e){
        console.log(e)
    }
    finally {

    }
}
