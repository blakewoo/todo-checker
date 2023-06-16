const shared = require("../model/md_shared-request")
const mariadb = require("./repo/mariaRepo")

exports.addRequest = async function (requester,target) {
    try{
        let RequestFind = await mariadb("SELECT ID,EMAIL FROM user WHERE user.ID=?","SINGLE",[requester])
        let ReceiveFind = await mariadb("SELECT ID,EMAIL FROM user WHERE user.ID=?","SINGLE",[target])

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

        return {status:true,result:result}
    }
    catch(e) {
        console.error(e)
        return {status:false}
    }
}

exports.getRequest = async function (requester) {
    try{
        let result = await shared.find({OVERSEER_USER_ID:requester})
        return {status:true, result:result}
    }
    catch(e) {
        console.error(e)
        return {status:false}
    }
}

exports.getAcceptRequest = async function (requester) {
    try{
        return await shared.find({OVERSEER_USER_ID:requester,STATUS:"ACCEPT"})
    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.deleteRequest = async function (_id) {
    try{
        await shared.deleteOne({_id:_id})
        return {status:true}
    }
    catch(e) {
        console.error(e)
        return {status:false}
    }
}

exports.getReceive = async function (receiver) {
    try{
        return await shared.find({TARGET_USER_ID:receiver})
    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.updateReceive = async function (requester,receiver,status) {
    try{
        return await shared.updateOne({OVERSEER_USER_ID:requester,TARGET_USER_ID:receiver},{STATUS:status})
    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.getChatList = async function(requester) {
    try{
        return await shared.find({"$or":[{OVERSEER_USER_ID:requester},{TARGET_USER_ID:requester}]})
    }
    catch(e) {
        console.error(e)
        return false
    }
}