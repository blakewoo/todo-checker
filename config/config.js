const dotenv = require("dotenv")
dotenv.config()

module.exports = {
    AUTH:false,
    LOGIN_DATABASE:{
        URL:process.env.LOGIN_DATABASE_URL,
        PORT:process.env.LOGIN_DATABASE_PORT,
        DATABASE:process.env.LOGIN_DATABASE_DATABASE,
        ID:process.env.LOGIN_DATABASE_ID,
        PASSWORD:process.env.LOGIN_DATABASE_PASSWORD
    },
    DATA_DATABASE:{
        URL:process.env.DATA_DATABASE_URL,
        PORT:process.env.DATA_DATABASE_PORT,
        DATABASE:process.env.DATA_DATABASE_DATABASE,
        ID:process.env.DATA_DATABASE_ID,
        PASSWORD:process.env.DATA_DATABASE_PASSWORD
    },
    COOKIE_SECRET_KEY:process.env.COOKIE_SECRET_KEY,
    SESSION_KEY:process.env.SESSION_SECRET_KEY,
    SALT_ROUND:process.env.SALT_ROUND,
    AWS_KEY : {
        ACCESS_KEY:process.env.AWS_KEY_ACCESS_KEY,
        SECRET_KEY:process.env.AWS_KEY_SECRET_KEY,
    },
    COUNTRY_CODE : process.env.COUNTRY_SET
}