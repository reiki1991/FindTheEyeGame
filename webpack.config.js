var fs = require('fs');
var path = require('path')
var webpack = require('webpack')
var cssnano = require('cssnano')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var production = (process.env.NODE_ENV === 'production')

var webpackConfigs = {
  entry: { app: 'js/app.js' }, //打包后整合出来的js文件
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'http://cdn.201607moco.gz.e2capp.com/', //生成后图片&js的前缀路径
    filename: 'js/[name].[hash].js', //整合后的js命名规则
    chunkFilename: 'js/[chunkhash].js'
  },
  resolve: {
    root: [
      path.resolve('origin') //require文件查找过程中继node_modules查找后的下一个查找目录
    ],
    extensions: ['', '.js'],  //require文件查找过程中可以忽略的后缀名
    alias: {
      'zepto': 'js/zepto.min.js' // 直接指定模块别名，减少webpack搜索时间
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "zepto", // 这个可以使$(Zepto)变成全局变量，不需要require('Zepto')
      Zepto: "zepto", // 有些插件不用 $而用 Zepto
      'window.Zepto': "zepto"
    }),
    new webpack.optimize.OccurenceOrderPlugin(), // 通过一些计算方式减少chunk的大小的插件
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk放入dist文件夹中
    //   chunks: chunks, // 所有入口文件 数组
    //   minChunks: chunks.length // 提取所有entry共同依赖的模块
    // }),
    // css 提取插件
    new ExtractTextPlugin('app.[contenthash].css', {
      allChunks: true // 所有css打包到一个文件
    }),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      // favicon: './src/images/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      filename: './index.html', //生成的html存放路径，相对于path
      template: 'html-withimg-loader?min=false!./origin/index.html', //html模板路径
      inject: 'body', //js插入的位置，true/'head'/'body'/false
      hash: false, //为静态资源生成hash值
      chunks: ['app'],//需要引入的chunk，不配置就会引入所有页面的资源
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false, //删除空白符与换行符
        ignoreCustomFragments:[
          /\{\{[\s\S]*?\}\}/g  //不处理 {{}} 里面的 内容
        ]
      }
    })
  ],
  module: {
    loaders: [//加载器，对css,less,js等文件进行加前缀，转换成es5语法等优化处理
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style-loader", 'css-loader!postcss')
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss!less')
      }, { // 加载字体，svg文件
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }, { // 转换 8k 以下的图片为 base64,减少请求
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8192&name=imgs/[name].[ext]!img?minimize'
        // loader: 'url-loader?limit=8192&name=./images/[name]-[hash].[ext]!img?minimize'
      },{
        test: /\.js$/, // 匹配所有js文件，转换成es5语法
        exclude: /node_modules/,
        loader: "babel-loader",
      }
    ]
  },
  babel: { //"babel-loader"的详细参数设置，转换es5语法
    presets: ['es2015', 'stage-0'],
    plugins: ["transform-runtime"]
  },
  postcss: [
    cssnano({
      autoprefixer: { // 添加css浏览器前缀
        add: true,
        remove: true,
        browsers: ['> 1%']
      },
      discardComments: { // 删除所有css注释
        removeAll: true
      },
      safe: true,
      sourcemap: true
    })
  ],
  imagemin: { // 图片压缩相关配置
    gifsicle: { interlaced: false },
    jpegtran: {
      progressive: true,
      arithmetic: false,
      quality: '85'
    },
    optipng: { optimizationLevel: 5 },
    pngquant: {
      floyd: 0.5,
      speed: 2,
      quality: '85'
    },
    svgo: {
      plugins: [
        { removeTitle: true },
        { convertPathData: false }
      ]
    }
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    inline: true,
    port: '8888'
  }
}

if (production) { // 生产环境
  webpackConfigs.plugins.push(new webpack.optimize.UglifyJsPlugin({ // 压缩js插件
    compressor: {
      warnings: false,
    },
  }));
} else { // 开发环境
         // 添加 source-map
  webpackConfigs.devtool = 'source-map';
  // 添加热加载
  webpackConfigs.plugins.push(new webpack.HotModuleReplacementPlugin()); // 代码热替换
  webpackConfigs.plugins.push(new webpack.NoErrorsPlugin()); // 报错但不退出webpack进程
}
module.exports = webpackConfigs