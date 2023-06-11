const bcrypt = require("bcrypt");
const config = require("../config/config")
const mariaDB = require("./repo/mariaRepo")


exports.getUser = async function (ID) {
    try{
        let userFind = await mariaDB("SELECT ID,EMAIL FROM user WHERE user.ID=?","SINGLE",[ID])
        return userFind[0]
    }
    catch(e){
        console.log(e)
        return undefined
    }
}

exports.addUser = async function (ID,PASSWORD,EMAIL) {
    try{
        let userFind = await mariaDB("SELECT ID FROM user WHERE user.ID=?","SINGLE",[ID])
        let emailFind = await mariaDB("SELECT EMAIL FROM user WHERE user.EMAIL=?","SINGLE",[EMAIL])
        if(userFind.length !==0) {
            return {status:false,reason:"ID_duplicated"}
        }
        if(emailFind.length !==0) {
            return {status:false,reason:"EMAIL_duplicated"}
        }
        let hash = bcrypt.hashSync(PASSWORD, Number(config.SALT_ROUND))
        await mariaDB("INSERT INTO user value (?,?,?)", "MULTI",[ID,hash,EMAIL])
        return {status:true}
    }
    catch(e){
        console.log(e)
        return {status:false}
    }
}

exports.updateUser = async function (ID,PASSWORD,EMAIL) {
    try{
        let emailFind = await mariaDB("SELECT EMAIL FROM user WHERE user.EMAIL=? and user.ID!=?","MULTI",[EMAIL,ID])
        if(emailFind.length !==0) {
            return {status:false,reason:"EMAIL_duplicated"}
        }
        if(PASSWORD!=="" && EMAIL!=="") {
            let hash = bcrypt.hashSync(PASSWORD, Number(config.SALT_ROUND))
            await mariaDB("UPDATE user SET PASSWORD=?,EMAIL=? WHERE ID=?","MULTI", [hash,EMAIL,ID])
        }
        else if(PASSWORD!=="") {
            let hash = bcrypt.hashSync(PASSWORD, Number(config.SALT_ROUND))
            await mariaDB("UPDATE user SET PASSWORD=? WHERE ID=?","MULTI", [hash,ID])
        }
        else if(EMAIL!==""){
            await mariaDB("UPDATE user SET EMAIL=? WHERE ID=?","MULTI", [EMAIL,ID])
        }
        return {status:true}
    }
    catch(e){
        console.log(e)
        return {status:false}
    }
}

exports.deleteUser = async function(ID) {
    try{
        await mariaDB("DELETE FROM user WHERE user.ID=?","SINGLE",[ID])
        return {status:true}
    }
    catch(e){
        console.log(e)
        return {status:false}
    }
}


exports.verifyUser = async function (ID,PASSWORD) {
    try{
        let userFind = await mariaDB("SELECT ID,PASSWORD FROM user WHERE user.ID=?","SINGLE",[ID])
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
    catch(e){
        console.log(e)
        return {status:false,reason:"Undefined error"}
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