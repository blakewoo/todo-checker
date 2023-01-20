let dotenv = require("dotenv")
dotenv.config()

export const config = {
    LOGIN_DATABASE:{
        URL:"",
        DATABASE:"",
        ID:"",
        PASSWORD:""
    },
    DATA_DATABASE:{
        URL:"",
        DATABASE:"",
        ID:"",
        PASSWORD:""
    },
    AWS_KEY : {
        ACCESS_KEY:"",
        SECRET_KEY:"",
    }

}