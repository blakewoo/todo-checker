const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        j_login:["@babel/polyfill","./src/javascripts/j_publicFunction.js","./src/javascripts/j_login.js"],
        j_chatting:["@babel/polyfill","./src/javascripts/j_headline.js","./src/javascripts/j_publicFunction.js","./src/javascripts/j_chatting.js"],
        j_myInfo:["@babel/polyfill","./src/javascripts/j_headline.js","./src/javascripts/j_publicFunction.js","./src/javascripts/j_myInfo.js"],
        j_mySchedule:["@babel/polyfill","./src/javascripts/j_datepicker.js","./src/javascripts/j_todo.js","./src/javascripts/j_headline.js","./src/javascripts/j_calendar.js","./src/javascripts/j_publicFunction.js","./src/javascripts/j_mySchedule.js"],
        j_signUp:["@babel/polyfill","./src/javascripts/j_publicFunction.js","./src/javascripts/j_signUp.js"],
        j_targetSchedule:["@babel/polyfill","./src/javascripts/j_headline.js","./src/javascripts/j_publicFunction.js","./src/javascripts/j_calendar.js","./src/javascripts/j_targetSchedule.js"],
        j_underConstruction:["@babel/polyfill","./src/javascripts/j_headline.js","./src/javascripts/j_underConstruction.js"],
        j_scheduleSetting:["@babel/polyfill","./src/javascripts/j_headline.js","./src/javascripts/j_publicFunction.js","./src/javascripts/j_scheduleSetting.js"],
    },
    output: {
        path: path.resolve(__dirname,"..","public","javascripts"),
        filename : '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: "/src/javascripts",
                exclude: /node_modules/,
                use: {
                    loader:"babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: {node:"current"} }]
                        ]
                    }
                }
            }
        ],
    },
    plugins: [],
};
