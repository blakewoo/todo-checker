const bcrypt = require("bcrypt");
const config = require("../config/config")

export default function(maria,mongo) {
    let module = {};
    module.getUser = async function (ID) {
        try{
            let con = await maria.getConnection()
            let userFind = await con.query("SELECT ID,EMAIL FROM user WHERE user.ID=?",[ID])
            await con.end()
            return userFind[0]
        }
        catch(e){
            console.log(e)
            return undefined
        }
    }

    module.addUser = async function (ID,PASSWORD,EMAIL) {
        try{
            let con = await maria.getConnection()
            let userFind =await con.query("SELECT ID FROM user WHERE user.ID=?",[ID])
            let emailFind = await con.query("SELECT EMAIL FROM user WHERE user.EMAIL=?",[EMAIL])
            if(userFind.length !==0) {
                return {status:false,reason:"ID_duplicated"}
            }
            if(emailFind.length !==0) {
                return {status:false,reason:"EMAIL_duplicated"}
            }
            let hash = bcrypt.hashSync(PASSWORD, Number(config.SALT_ROUND))
            await con.query("INSERT INTO user value (?,?,?)",[ID,hash,EMAIL])
            await con.end()
            return {status:true}
        }
        catch(e){
            console.log(e)
            return {status:false}
        }
    }

    module.updateUser = async function (ID,PASSWORD,EMAIL) {
        try{
            let con = await maria.getConnection()
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
            await con.end()
            return {status:true}
        }
        catch(e){
            console.log(e)
            return {status:false}
        }
    }

    module.deleteUser = async function(ID) {
        try{
            let con = await maria.getConnection()
            await con.query("DELETE FROM user WHERE user.ID=?",[ID])
            await con.end()
            return {status:true}
        }
        catch(e){
            console.log(e)
            return {status:false}
        }
    }


    module.verifyUser = async function (ID,PASSWORD) {
        try{
            let userFind = await con.query("SELECT ID,PASSWORD FROM user WHERE user.ID=?",[ID])
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

    module.verifyEmail = function (EMAIL) {
        let emailReg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if(emailReg.test(EMAIL)) {
            return false
        }
        else {
            return true
        }
    }

    return module;
}


