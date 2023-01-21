module.exports = {
    LOGIN_DATABASE:{
        URL:process.env.LOGIN_DATABASE_URL,
        DATABASE:process.env.LOGIN_DATABASE_DATABASE,
        ID:process.env.LOGIN_DATABASE_ID,
        PASSWORD:process.env.LOGIN_DATABASE_PASSWORD
    },
    DATA_DATABASE:{
        URL:process.env.DATA_DATABASE_URL,
        DATABASE:process.env.DATA_DATABASE_DATABASE,
        ID:process.env.DATA_DATABASE_ID,
        PASSWORD:process.env.DATA_DATABASE_PASSWORD
    },
    AWS_KEY : {
        ACCESS_KEY:process.env.AWS_KEY_ACCESS_KEY,
        SECRET_KEY:process.env.AWS_KEY_SECRET_KEY,
    }
}