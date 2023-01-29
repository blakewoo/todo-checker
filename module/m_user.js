const conn = require("../connectors/mariadb")
const bcrypt = require("bcrypt");
const config = require("../config/config")

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
        return {status:true}
    }
    catch(e){
        console.log(e)
    }
    finally {
        await con.end()
    }
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