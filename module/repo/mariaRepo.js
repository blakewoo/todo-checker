const conn = require("../../connectors/mariadb")

const QUERY = async function (QUERY,TYPE,ATTRIBUTE) {
    try{
        let con = await conn.getConnection()
        if(TYPE === "SINGLE") {
            return await con.query(QUERY,...ATTRIBUTE)
        }
        else {
            return await con.query(QUERY,ATTRIBUTE)
        }
    }
    catch(e) {
        console.error(e)
        throw e
    }
}

module.exports = QUERY