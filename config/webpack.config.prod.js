const path = require("path");

module.exports = {
    mode: "production",
    entry: ["@babel/polyfill","./src/javascripts/j_publicFunction.js","./src/javascripts/j_login.js"],
    output: {
        path: path.resolve(__dirname,"..","public","javascripts"),
        filename : 'j_login.js'
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
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ],
    },
    plugins: [],
};
