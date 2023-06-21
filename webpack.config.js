const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        all:"./public/javascripts/*.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename : '[name]_bundle.js'
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
