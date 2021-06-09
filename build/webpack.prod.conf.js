const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require("path");

module.exports = {
    mode: "production",
    plugins: [
        new miniCssExtractPlugin({
            // 类似 webpackOptions.output里面的配置 可以忽略
            filename: 'css/[name].css?[hash:7]',
            chunkFilename: 'css/[id].css?[hash:7]',
        }),
        /**[压缩css] */
        new OptimizeCSSAssetsPlugin(),
        new ExtractTextPlugin({
            filename: "[name].min.css",
            allChunks: false // 只包括初始化css, 不包括异步加载的CSS
        }),
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve(__dirname, "../"),
            verbose: true
        })
    ]
};
