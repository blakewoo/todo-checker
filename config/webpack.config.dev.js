const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        j_calendar:"./public/javascripts/j_calendar.js",
        j_chatting:"./public/javascripts/j_chatting.js",
        j_datepicker:"./public/javascripts/j_datepicker.js",
        j_headline:"./public/javascripts/j_headline.js",
        j_login:"./public/javascripts/j_login.js",
        j_myInfo:"./public/javascripts/j_myInfo.js",
        j_mySchedule:"./public/javascripts/j_mySchedule.js",
        j_publicFunction:"./public/javascripts/j_publicFunction.js",
        j_signUp:"./public/javascripts/j_signUp.js",
        j_targetSchedule:"./public/javascripts/j_targetSchedule.js",
        j_todo:"./public/javascripts/j_todo.js",
        j_underConstruction:"./public/javascripts/j_underConstruction.js"
    },
    output: {
        path: path.resolve("/public/dist"),
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
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
                options: {
                    variable: 'data',
                    interpolate : '\\{\\{(.+?)\\}\\}',
                    evaluate : '\\[\\[(.+?)\\]\\]'
                }
            }
        ],
    },
    plugins: [],
};
