const mariadb = require('mariadb');
const config = require('../config/config.js');

const pool = mariadb.createPool({
    host: config.LOGIN_DATABASE.URL, port:config.LOGIN_DATABASE.PORT,
    user: config.LOGIN_DATABASE.ID, password: config.LOGIN_DATABASE.PASSWORD,
    connectionLimit: 5
});

async function main () {
    await pool.getConnection(function (err,connection) {
        if(err) {
            console.log("[SYSTEM] MariaDB not connected")
        }
        else {
            console.log("[SYSTEM] MariaDB connected!")
        }
    })
}

module.exports = main