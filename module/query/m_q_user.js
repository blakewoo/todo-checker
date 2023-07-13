const maria = require("../../connectors/mariadb")

export async function getUserFromId(ID) {
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

export async function getUserFromEmail(EMAIL) {
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

export async function createUser(ID,PASSWORD_HASH,EMAIL) {
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

export async function updateUserPasswordFromId(ID,PASSWORD_HASH) {
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

export async function updateUserEmailFromId(ID,EMAIL) {
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

export async function updateUserEmailAndPasswordFromId(ID,PASSWORD_HASH,EMAIL) {
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

export async function deleteUserFromId(ID) {
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