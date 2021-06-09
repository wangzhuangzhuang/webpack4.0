const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");

const miniCssExtractPlugin = require('mini-css-extract-plugin');
const entry_files = require('./webpack_config/entry_webpack.js');
const base_plugin = require('./webpack_config/base.plugin');

const productionConfig = require("./webpack.prod.conf.js"); // 引入生产环境配置文件
const developmentConfig = require("./webpack.dev.conf.js"); // 引入开发环境配置文件

/**
 * 根据不同的环境，生成不同的配置
 * @param {String} env "development" or "production"
 */
const generateConfig = env => {
    // 将需要的Loader和Plugin单独声明

    let scriptLoader = [
        {
            loader: "babel-loader"
        }
    ];

    let cssLoader = [
        {
            loader: "css-loader",
            options: {
                minimize: true,
                sourceMap: env === "development" ? true : false // 开发环境：开启source-map
            }
        },
        {
            loader: 'postcss-loader',//承载autoprefixer功能
        }, {
            loader: 'less-loader'//SCSS加载器，webpack默认使用node-sass进行编译
        }
    ];

    let styleLoader =
        [
            {

                loader: env === "production" ? miniCssExtractPlugin.loader : "style-loader",  //生产环境使用
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
        ]


    return {
        entry: entry_files,
        output: {
            // publicPath: env === "development" ? "/" : __dirname + "/../dist/",
            // path: path.resolve(__dirname, "..", "dist"),
            // filename: "[name]-[hash:5].bundle.js",
            // chunkFilename: "[name]-[hash:5].chunk.js"
            //打包的路径文职
            path: path.resolve(__dirname, '..', 'dist'),
            //输出的文件名称
            filename: 'js/[name].js?[hash:7]',
            publicPath: env === "development" ? "/" : __dirname + "/",
            chunkFilename: 'js/[name].js?[hash:7]'
        },
        module: {
            rules: [
                {
                    test: /\.ejs/,
                    use: ['ejs-loader'],
                },
                { test: /\.js$/, exclude: /(node_modules)/, use: scriptLoader },
                { test: /\.css|less$/, use: styleLoader },
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
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: {
                        loader: 'url-loader'
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
                }
            ]
        },
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
        plugins: [
            // 开发环境和生产环境二者均需要的插件
            ...base_plugin,
            new webpack.ProvidePlugin({
                $: "jquery"
            }),
        ],
        mode: "none"
    };
};

module.exports = env => {
    let config = env === "production" ? productionConfig : developmentConfig;
    return merge(generateConfig(env), config);
};


