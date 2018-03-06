var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }],
        rules: [{
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true,
                    removeComments: false,
                    collapseWhitespace: false
                }
            }],
        },
            {
                test: /\.css$/,
                use: [{
                    loader: 'css-loader'
                }]
            }
        ],
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true,
            test: /\.js$/,
            uglifyOptions: {
                compress: {
                    unused: false,
                }
            }
        })
    ]
};
