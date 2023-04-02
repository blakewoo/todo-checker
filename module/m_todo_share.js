const shared = require("../model/shared-request")
const conn = require("../connectors/mariadb")

exports.addRequest = async function (requester,target) {
    try{
        let con = await conn.getConnection()
        let RequestFind = await con.query("SELECT ID,EMAIL FROM user WHERE user.ID=?",requester)
        let ReceiveFind = await con.query("SELECT ID,EMAIL FROM user WHERE user.ID=?",target)

        await shared.create({
            OVERSEER_USER_ID: requester,
            OVERSEER_EMAIL: RequestFind.EMAIL,
            TARGET_USER_ID: target,
            TARGET_EMAIL:ReceiveFind.EMAIL,
            CREATED_DATE: new Date(),
            STATUS:"Waiting"})

        return true
    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.getRequest = async function () {
    try{

    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.deleteRequest = async function () {

}

exports.addReceive = async function () {
    try{

    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.getReceive = async function () {
    try{

    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.deleteReceive = async function () {

}