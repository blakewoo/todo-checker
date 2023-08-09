module.exports=function(maria,mongo) {
    let module = {}

    module.addRequest = async function (requester,target) {
        try{
            let RequestFind = await maria.user.getUserFromId(requester)
            let ReceiveFind = await maria.user.getUserFromId(target)

            if(ReceiveFind.length===0) {
                return {status:false}
            }

            if(RequestFind[0].ID === ReceiveFind[0].ID) {
                return {status:false}
            }

            let result = await mongo.shared.create({
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

    module.getRequest = async function (requester) {
        try{
            let result = await mongo.shared.find({OVERSEER_USER_ID:requester})
            return {status:true, result:result}
        }
        catch(e) {
            console.error(e)
            return {status:false}
        }
    }

    module.getAcceptRequest = async function (requester) {
        try{
            let result = await mongo.shared.find({OVERSEER_USER_ID:requester,STATUS:"ACCEPT"})
            return {status:true,result:result}
        }
        catch(e) {
            console.error(e)
            return {status:false}
        }
    }

    module.deleteRequest = async function (_id) {
        try{
            await mongo.shared.deleteOne({_id:_id})
            return {status:true}
        }
        catch(e) {
            console.error(e)
            return {status:false}
        }
    }

    module.getReceive = async function (receiver) {
        try{
            let result = await mongo.shared.find({TARGET_USER_ID:receiver})
            return {status:true,result:result}
        }
        catch(e) {
            console.error(e)
            return {status:false}
        }
    }

    module.updateReceive = async function (requester,receiver,status) {
        try{
            let result = await mongo.shared.updateOne({OVERSEER_USER_ID:requester,TARGET_USER_ID:receiver},{STATUS:status})
            return {status:true,result:result}
        }
        catch(e) {
            console.error(e)
            return {status:false}
        }
    }

    module.getChatList = async function(requester) {
        try{
            let result = await mongo.shared.find({"$or":[{OVERSEER_USER_ID:requester},{TARGET_USER_ID:requester}]})
            return {status:true,result:result}
        }
        catch(e) {
            console.error(e)
            return {status:false}
        }
    }

    return module
}