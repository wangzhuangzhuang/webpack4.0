const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack');
const webpack = require('webpack')
const entry_files = require('./webpack_config/entry_webpack.js');
const base_plugin = require('./webpack_config/base.plugin');

if (process.env.type == 'build') {
    var website = {
        publicPath: 'http://www.yunduoai.net/'
    };
} else {
    var website = {
        publicPath: '/'
    };
}
module.exports = {
    entry: entry_files,
    output: {
        //打包的路径文职
        path: path.resolve(__dirname, 'dist'),
        //输出的文件名称
        filename: 'js/[name].js?[hash:7]',
        publicPath: website.publicPath,
        chunkFilename: 'js/[name].js?[hash:7]'
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.ejs/,
                use: ['ejs-loader'],
            },
            {
                test: /\.css|less$/,
                use: [
                    {
                        loader: "style-loader",   //开发环境使用
                        // loader: miniCssExtractPlugin.loader,  //生产环境使用
                        options: {},
                    },
                    {
                        loader: 'css-loader',//CSS加载器
                        options: { importLoaders: 2 }//指定css-loader处理前最多可以经过的loader个数     
                    }, {
                        loader: 'postcss-loader',//承载autoprefixer功能
                    }, {
                        loader: 'less-loader'//SCSS加载器，webpack默认使用node-sass进行编译
                    }
                ],
            },

            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name]-[hash:5].min.[ext]",
                            limit: 20000, // size <= 20KB
                            // publicPath: "static/",
                            outputPath: "static/"
                        }
                    }
                ]
            },
            {
                test: /\.js$/, //js文件加载器
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        interpolate: true,
                        minimize: false
                    }
                }]
            },

        ]
    },
    plugins: [
        ...base_plugin,
        new miniCssExtractPlugin({
            // 类似 webpackOptions.output里面的配置 可以忽略
            filename: 'css/[name].css?[hash:7]',
            chunkFilename: 'css/[id].css?[hash:7]',
        }),
        /**[压缩css] */
        new OptimizeCSSAssetsPlugin(),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.ejs')),
        }),
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        // 热更新插件
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "all",  //入口处开始提取代码
                    minSize: 0,      //代码最小多大，进行抽离
                    minChunks: 2,    //代码复 2 次以上的抽离
                },
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                    // enforce: true
                }
            }
        }
    },
    devServer: {
        contentBase: false,
        publicPath: '/',
        hot: true, // 启用 webpack 的 HMR 功能。需要注意的是，要完全启用 HMR，需要 webpack.HotModuleReplacementPlugin
        open: true,
        host: '0.0.0.0',
        // inline: true, // 默认值 true，选择 iframe 模式的话，设置为 false。
        useLocalIp: true,
        compress: true, // 启用 gzip 压缩
        proxy: {
            'http://192.168.1.100:8080/': {
                // target: 'https://test-emsc.cx580.com',
                target: 'http://192.168.1.100:3001',
                // pathRewrite: { '^/api': '' },
                // secure: false,
                changeOrigin: true
            }
        }
    },
    mode: "none"
}