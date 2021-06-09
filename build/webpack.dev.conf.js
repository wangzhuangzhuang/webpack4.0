const webpack = require("webpack");

const path = require("path");

module.exports = {
    mode: "development",
    devtool: "source-map",
    devServer: {
        contentBase: false,
        publicPath: '/',
        hot: true, // 启用 webpack 的 HMR 功能。需要注意的是，要完全启用 HMR，需要 webpack.HotModuleReplacementPlugin
        open: true,
        host: '0.0.0.0',
        // inline: true, // 默认值 true，选择 iframe 模式的话，设置为 false。
        useLocalIp: true,
        compress: true, // 启用 gzip 压缩

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};
