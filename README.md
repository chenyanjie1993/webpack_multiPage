# webpack_multiPage
<!-- 多页面的webpack打包 -->
<!-- 本项目采用sass/art-template -->
1.项目环境配置，安装node环境，通过node -v查看版本；
2.npm init项目初始化；
3.安装前端项目所需要的模块sass、art-template;
3.安装相关模块：
   a.npm i webpack webpack-cli -D；
   b.进行项目结构目录搭建，主目录下创建：config(webpack.common.js、webpack.dev.js、webpack.prod.js)、src(下有:imgs、css、sass、js、components)、views(一个页面一个文件夹，每个文件夹下都有index.js和index.html文件)；
   c.安装plugin:
        npm i -D glob html-webpack-plugin clean-webpack-plugin mini-css-extract-plugin copy-webpack-plugin webpack-merge webpack-dev-server;
   d.安装loader:
        npm i -D style-loader css-loader postcss-loader node-sass sass-loader autoprefixer art-template-loader
