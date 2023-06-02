const conn = require("../connectors/mariadb")
const bcrypt = require("bcrypt");
const config = require("../config/config")


exports.getUser = async function (ID) {
    let con;
    let userFind = null;
    try{
        con = await conn.getConnection()
        userFind = await con.query("SELECT ID,EMAIL FROM user WHERE user.ID=?",ID)
    }
    catch(e){
        console.log(e)
        return undefined
    }
    finally {
        await con.end()
    }
    return userFind[0]
}

exports.addUser = async function (ID,PASSWORD,EMAIL) {
    let con;
    try{
        con = await conn.getConnection()
        let userFind = await con.query("SELECT ID FROM user WHERE user.ID=?",ID)
        let emailFind = await con.query("SELECT EMAIL FROM user WHERE user.EMAIL=?",EMAIL)
        if(userFind.length !==0) {
            return {status:false,reason:"ID_duplicated"}
        }
        if(emailFind.length !==0) {
            return {status:false,reason:"EMAIL_duplicated"}
        }
        let hash = bcrypt.hashSync(PASSWORD, Number(config.SALT_ROUND))
        await con.query("INSERT INTO user value (?,?,?)", [ID,hash,EMAIL])
    }
    catch(e){
        console.log(e)
        await con.end()
        return {status:false}
    }

    await con.end()
    return {status:true}
}

exports.updateUser = async function (ID,PASSWORD,EMAIL) {
    let con;
    try{
        con = await conn.getConnection()
        let emailFind = await con.query("SELECT EMAIL FROM user WHERE user.EMAIL=? and user.ID!=?",[EMAIL,ID])
        if(emailFind.length !==0) {
            return {status:false,reason:"EMAIL_duplicated"}
        }
        if(PASSWORD!=="" && EMAIL!=="") {
            let hash = bcrypt.hashSync(PASSWORD, Number(config.SALT_ROUND))
            await con.query("UPDATE user SET PASSWORD=?,EMAIL=? WHERE ID=?", [hash,EMAIL,ID])
        }
        else if(PASSWORD!=="") {
            let hash = bcrypt.hashSync(PASSWORD, Number(config.SALT_ROUND))
            await con.query("UPDATE user SET PASSWORD=? WHERE ID=?", [hash,ID])
        }
        else if(EMAIL!==""){
            await con.query("UPDATE user SET EMAIL=? WHERE ID=?", [EMAIL,ID])
        }
    }
    catch(e){
        console.log(e)
        await con.end()
        return {status:false}
    }

    await con.end()
    return {status:true}
}

exports.deleteUser = async function(ID) {
    let con;
    try{
        con = await conn.getConnection()
        await con.query("DELETE FROM user WHERE user.ID=?",ID)
    }
    catch(e){
        console.log(e)
        await con.end()
        return {status:false}
    }

    await con.end()
    return {status:true}
}


exports.verifyUser = async function (ID,PASSWORD) {
    let con;
    let userFind;
    try{
        con = await conn.getConnection()
        userFind = await con.query("SELECT ID,PASSWORD FROM user WHERE user.ID=?",ID)
    }
    catch(e){
        console.log(e)
        return {status:false,reason:"Undefined error"}
    }
    finally {
        await con.end()
    }

    if(userFind.length!==0) {
        if(bcrypt.compareSync(PASSWORD,userFind[0].PASSWORD)){
            return {status:true}
        }
        else {
            return {status:false,reason:"ID or Password"}
        }
    }
    else{
        return {status:false,reason:"ID or Password"}
    }
}

exports.verifyEmail = function (EMAIL) {
    let emailReg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(emailReg.test(EMAIL)) {
        return false
    }
    else {
        return true
    }
}