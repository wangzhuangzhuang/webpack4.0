//pagesArray.js
var path = require('path');
var fs = require('fs');
let pagesArray = [];

function each_file(dir) {
    try {
        fs.readdirSync(dir).forEach(function (file) {
            if (file.indexOf('ejs') > 0) {
                var file_obj = {};
                var file_path = dir + '/' + file;
                var chunk_name = path.basename(file, '.ejs');
                file_obj['filename'] = file;
                file_obj['template'] = file_path;
                file_obj['chuckName'] = chunk_name;
                pagesArray.push(file_obj);
            }
            /*
             * {
             *   index:'./src/index.html',
             *   chunkname:'index'
             * }
             * */
        });
    } catch (e) { }
}
each_file('./src');
//导出我们需要的html模板信息
module.exports = pagesArray;
