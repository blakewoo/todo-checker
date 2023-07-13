const maria = require("../../../connectors/mariadb")

exports.getUserFromId = async function (ID) {
    try{
        let con = await maria.getConnection();
        let result = await con.query("SELECT ID,EMAIL FROM user WHERE user.ID=?",ID)
        await con.end()
        return result;
    }
    catch(e){
        console.error(e)
    }
}

exports.getUserFromEmail = async function (EMAIL) {
    try{
        let con = await maria.getConnection();
        let result = await con.query("SELECT ID,EMAIL FROM user WHERE user.EMAIL=?",EMAIL)
        await con.end()
        return result;
    }
    catch(e){
        console.error(e)
    }
}

exports.getUserFromEmailAndID = async function (ID,EMAIL) {
    try{
        let con = await maria.getConnection();
        let result = await con.query("SELECT EMAIL FROM user WHERE user.EMAIL=? and user.ID!=?",[EMAIL,ID])
        await con.end()
        return result;
    }
    catch(e){
        console.error(e)
    }
}

exports.createUser = async function (ID,PASSWORD_HASH,EMAIL) {
    try{
        let con = await maria.getConnection();
        await con.query("INSERT INTO user value (?,?,?)",[ID,PASSWORD_HASH,EMAIL])
        await con.end()
        return true;
    }
    catch(e){
        console.error(e)
        return false;
    }
}

exports.updateUserPasswordFromId = async function (ID,PASSWORD_HASH) {
    try{
        let con = await maria.getConnection();
        await con.query("UPDATE user SET PASSWORD=? WHERE ID=?", [PASSWORD_HASH,ID])
        await con.end()
        return true;
    }
    catch(e){
        console.error(e)
        return false;
    }
}

exports.updateUserEmailFromId = async function (ID,EMAIL) {
    try{
        let con = await maria.getConnection();
        await con.query("UPDATE user SET EMAIL=? WHERE ID=?", [EMAIL,ID])
        await con.end()
        return true;
    }
    catch(e){
        console.error(e)
        return false
    }
}

exports.updateUserEmailAndPasswordFromId = async function (ID,PASSWORD_HASH,EMAIL) {
    try{
        let con = await maria.getConnection();
        await con.query("UPDATE user SET PASSWORD=?,EMAIL=? WHERE ID=?", [PASSWORD_HASH,EMAIL,ID])
        await con.end()
        return true;
    }
    catch(e){
        console.error(e)
        return false
    }
}

exports.deleteUserFromId = async function (ID) {
    try{
        let con = await maria.getConnection();
        await con.query("DELETE FROM user WHERE user.ID=?",ID)
        await con.end()
        return true;
    }
    catch(e){
        console.error(e)
        return false
    }
}