const sharedOrigin = require("../model/md_shared-request")
const mariadb = require("./repo/mariaRepo")

module.exports=function(maria,mongo) {
    let module = {}
    let shared = mongo.model("SHARED_TODO_REQUEST",sharedOrigin)

    module.addRequest = async function (requester,target) {
        try{
            let con = await maria.getConnection()
            let RequestFind = await con.query("SELECT ID,EMAIL FROM user WHERE user.ID=?",[requester])
            let ReceiveFind = await con.query("SELECT ID,EMAIL FROM user WHERE user.ID=?",[target])

            if(ReceiveFind.length===0) {
                return {status:false}
            }

            if(RequestFind[0].ID === ReceiveFind[0].ID) {
                return {status:false}
            }

            let result = await shared.create({
                OVERSEER_USER_ID: requester,
                OVERSEER_EMAIL: RequestFind[0].EMAIL,
                TARGET_USER_ID: target,
                TARGET_EMAIL:ReceiveFind[0].EMAIL,
                CREATED_DATE: new Date(),
                STATUS:"Waiting"})

            await con.end()
            return {status:true,result:result}
        }
        catch(e) {
            console.error(e)
            return {status:false}
        }
    }

    module.getRequest = async function (requester) {
        try{
            let result = await shared.find({OVERSEER_USER_ID:requester})
            return {status:true, result:result}
        }
        catch(e) {
            console.error(e)
            return {status:false}
        }
    }

    module.getAcceptRequest = async function (requester) {
        try{
            let result = await shared.find({OVERSEER_USER_ID:requester,STATUS:"ACCEPT"})
            return {status:true,result:result}
        }
        catch(e) {
            console.error(e)
            return {status:false}
        }
    }

    module.deleteRequest = async function (_id) {
        try{
            await shared.deleteOne({_id:_id})
            return {status:true}
        }
        catch(e) {
            console.error(e)
            return {status:false}
        }
    }

    module.getReceive = async function (receiver) {
        try{
            let result = await shared.find({TARGET_USER_ID:receiver})
            return {status:true,result:result}
        }
        catch(e) {
            console.error(e)
            return {status:false}
        }
    }

    module.updateReceive = async function (requester,receiver,status) {
        try{
            let result = await shared.updateOne({OVERSEER_USER_ID:requester,TARGET_USER_ID:receiver},{STATUS:status})
            return {status:true,result:result}
        }
        catch(e) {
            console.error(e)
            return {status:false}
        }
    }

    module.getChatList = async function(requester) {
        try{
            let result = await shared.find({"$or":[{OVERSEER_USER_ID:requester},{TARGET_USER_ID:requester}]})
            return {status:true,result:result}
        }
        catch(e) {
            console.error(e)
            return {status:false}
        }
    }

    return module
}