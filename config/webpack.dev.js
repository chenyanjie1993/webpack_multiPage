//开发环境webpack.dev.js
var merge = require('webpack-merge');
var path=require('path');
var webpack=require('webpack');
var common = require('./webpack.common.js');
 
module.exports = merge(common, {
  module:{
     rules:[
        {
            test: /\.(c|sa|sc)ss$/,
            // exclude: [/node_modules/],
            use: ["style-loader", //若为pro环境，替换成MiniCssExtractPlugin.loader（变量非字符串）
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


        }
   ]      
 },
  devtool: 'inline-source-map',
  devServer:{
    contentBase: path.join(__dirname,'..', "dist"),//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    host:'127.0.0.1',
    port:9090,
    hot:true,
    inline: true,//实时刷新
    hot:true,//Enable webpack's Hot Module Replacement feature
    compress:true,//Enable gzip compression for everything served
    // overlay: true, //Shows a full-screen overlay in the browser
    // stats: "errors-only" ,//To show only errors in your bundle
    open:true, //When open is enabled, the dev server will open the browser.
    // proxy: {
    //     "/api": {
    //         target: "http://localhost:3000",
    //         pathRewrite: {"^/api" : ""}
    //     }
    // },//重定向
    // publicPath:''
    },

    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
})