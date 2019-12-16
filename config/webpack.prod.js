//开发环境webpack.dev.js
var merge = require('webpack-merge');
var path = require('path');
var webpack = require('webpack');
var common = require('./webpack.common.js');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = merge(common, {
    module: {
        rules: [{
            test: /\.(c|sa|sc)ss$/,
            use: [MiniCssExtractPlugin.loader, //若为pro环境，替换成MiniCssExtractPlugin.loader（变量非字符串）
                {
                    loader: "css-loader",
                    options: {
                        importLoaders: 2, //也要走两个loader，防止scss文件再引入scss文件，而无法解析
                        modules: true
                    }
                },
                "sass-loader",
                "postcss-loader"
            ]


        }]
    },
    devtool: 'inline-source-map',
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{
            from: 'src/assets/',
            to: 'assets/'
        }, ]),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        })
    ]
})