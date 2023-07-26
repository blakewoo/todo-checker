const bcrypt = require("bcrypt");
const config = require("../config/config")

module.exports=function(maria,mongo) {
    let module = {};
    module.getUser = async function (ID) {
        try{
            let userFind = await maria.user.getUserFromId(ID)
            return userFind[0]
        }
        catch(e){
            console.log(e)
            return undefined
        }
    }

    module.addUser = async function (ID,PASSWORD,EMAIL) {
        try{
            let userFind = await maria.user.getUserFromId(ID)
            let emailFind = await maria.user.getUserFromEmail(EMAIL)
            if(userFind.length !==0) {
                return {status:false,reason:"ID_duplicated"}
            }
            if(emailFind.length !==0) {
                return {status:false,reason:"EMAIL_duplicated"}
            }
            let hash = bcrypt.hashSync(PASSWORD, Number(config.SALT_ROUND))
            await maria.user.createUser(ID,hash,EMAIL)
            return {status:true}
        }
        catch(e){
            console.log(e)
            return {status:false}
        }
    }

    module.updateUser = async function (ID,PASSWORD,EMAIL) {
        try{
            let emailFind = maria.user.getUserFromEmailAndID(ID,EMAIL)
            if(emailFind.length !==0) {
                return {status:false,reason:"EMAIL_duplicated"}
            }
            if(PASSWORD!=="" && EMAIL!=="") {
                let hash = bcrypt.hashSync(PASSWORD, Number(config.SALT_ROUND))
                await maria.user.updateUserEmailAndPasswordFromId(ID,hash,EMAIL)
            }
            else if(PASSWORD!=="") {
                let hash = bcrypt.hashSync(PASSWORD, Number(config.SALT_ROUND))
                await maria.user.updateUserPasswordFromId(ID,hash)
            }
            else if(EMAIL!==""){
                await maria.user.updateUserEmailFromId(ID,EMAIL)
            }
            return {status:true}
        }
        catch(e){
            console.log(e)
            return {status:false}
        }
    }

    module.deleteUser = async function(ID) {
        try{
            await maria.user.deleteUserFromId(ID)
            return {status:true}
        }
        catch(e){
            console.log(e)
            return {status:false}
        }
    }


    module.verifyUser = async function (ID,PASSWORD) {
        try{
            let userFind = await maria.user.getUserFromId(ID)
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
        return !emailReg.test(EMAIL);
    }

    return module;
}


