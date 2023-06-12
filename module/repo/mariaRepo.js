const conn = require("../../connectors/mariadb")

const QUERY = async function (QUERY,TYPE,ATTRIBUTE) {
    let con;
    try{
        con = await conn.getConnection()
        if(TYPE === "SINGLE") {
            let result = await con.query(QUERY,...ATTRIBUTE)
            await con.end()
            return result
        }
        else {
            let result = await con.query(QUERY,ATTRIBUTE)
            await con.end()
            return result
        }
    }
    catch(e) {
        console.error(e)
        await con.end()
        throw e
    }
}

module.exports = QUERY