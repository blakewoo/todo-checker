const mariadb = require('mariadb');
const config = require('../config/config.js');

const pool = mariadb.createPool({
    host: config.LOGIN_DATABASE.URL, port:config.LOGIN_DATABASE.PORT,
    user: config.LOGIN_DATABASE.ID, password: config.LOGIN_DATABASE.PASSWORD,
    database:config.LOGIN_DATABASE.DATABASE,connectionLimit: 5
});

module.exports = pool