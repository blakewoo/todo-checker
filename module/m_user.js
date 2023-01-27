const conn = require("../connectors/mariadb")
const bcrypt = require("bcrypt");
const config = require("../config/config")

exports.addUser = async function (ID,PASSWORD,EMAIL) {
    let con;
    try{
        con = await conn.getConnection()
        con.query('USE LOGIN');
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
        con.end()
    }
}