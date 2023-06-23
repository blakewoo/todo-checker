const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        j_calendar:"./src/javascripts/j_calendar.js",
        j_chatting:"./src/javascripts/j_chatting.js",
        j_datepicker:"./src/javascripts/j_datepicker.js",
        j_headline:"./src/javascripts/j_headline.js",
        j_login:"./src/javascripts/j_login.js",
        j_myInfo:"./src/javascripts/j_myInfo.js",
        j_mySchedule:"./src/javascripts/j_mySchedule.js",
        j_publicFunction:"./src/javascripts/j_publicFunction.js",
        j_signUp:"./src/javascripts/j_signUp.js",
        j_targetSchedule:"./src/javascripts/j_targetSchedule.js",
        j_todo:"./src/javascripts/j_todo.js",
        j_underConstruction:"./src/javascripts/j_underConstruction.js"
    },
    output: {
        path: path.resolve(__dirname,"..","public","javascripts"),
        filename : '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:"babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ],
    },
    plugins: [],
};
