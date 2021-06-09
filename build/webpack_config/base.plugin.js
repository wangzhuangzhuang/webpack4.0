const pagesArray = require('./pagesArray.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); ///html

let base_plugin = [];
pagesArray.forEach((page) => {
    let jName = page.filename;
    let i = jName.indexOf('.');
    let newName = jName.slice(0, i);
    console.log(JSON.stringify(page))
    const htmlPlugin = new HtmlWebpackPlugin({
        // template: page.template,
        template: page.template,
        filename: newName + '.html',
        // chunks: ['zepto', 'vue', page.chuckName],
        chunks: ['vendor', 'commons', page.chuckName],
        hash: true,
        minify: {
            removeAttributeQuotes: true,
            removeComments: true,
            collapseWhitespace: false //删除空白符与换行符
        }
    });

    base_plugin.push(htmlPlugin);
});




module.exports = base_plugin;
