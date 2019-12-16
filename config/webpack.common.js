 var path = require('path'); // 导入处理路径的模块
 var glob = require('glob'); // 处理文件路径用到，很有用
 var fs = require('fs');
 var HtmlWebpackPlugin = require('html-webpack-plugin'); // 将打包后js自动引入html文件插件
 // 多页面配置函数
 var pagesSetting = () => {
     const entries = {};
     const htmlWebpackPlugins = [];
     const files = glob.sync(path.join(__dirname, '..', 'views/**/*.js'));
     files.forEach((file) => {
         const match = file.match(/\/views\/(.*)\/(.*).js$/);
         const entry = match && match[1]; // 文件夹
         // 保存入口文件
         entries[entry] = file;
         const pageFiles = fs.readdirSync(path.resolve(file, '..'));
         const htmlFile = pageFiles.filter((file) => /\.html$/.test(file));
         console.log(entry)
         if (htmlFile.length > 0) {
             htmlWebpackPlugins.push(new HtmlWebpackPlugin({
                 template: path.join(__dirname, '..', `views/${entry}/${htmlFile[0]}`),
                 filename: `${entry}.html`,
                 chunks: [entry],
                 inject: true, // 将js放在body底部
                 minify: {
                     collapseWhitespace: true, // 折叠标签空白
                     minifyCSS: true,
                     minifyJS: true
                 }
             }));
         } else {
             console.log(chalk.red(`${path.resolve(file, '..')}目录下无模板文件`))
         }
     });
     return {
         entries,
         htmlWebpackPlugins
     }
 };
 const {
     entries,
     htmlWebpackPlugins
 } = pagesSetting();
 module.exports = {
     entry: entries,
     output: {
         path: path.join(__dirname, '..', "dist"), //打包后的文件存放的地方
         filename: "js/[name].js" //打包后输出文件的文件名
     },
     module: {
         rules: [{
                 test: /\.js$/,
                 exclude: /(node_modules)/,
                 use: {
                     loader: 'babel-loader',
                     options: {
                         presets: ['@babel/preset-env']
                     }
                 }
             },
             {
 
                test: /\.art$/,
                loader: 'art-template-loader'
 
            }
         ]
     },
     plugins: [...htmlWebpackPlugins]
 }