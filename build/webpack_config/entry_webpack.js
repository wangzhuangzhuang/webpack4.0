//entry.config.js
var path = require('path');
var fs = require('fs');
let entry_files = {};

function each_file(dir) {
    try {
        fs.readdirSync(dir).forEach(function (file) {
            if (file.indexOf('.js') > 0) {
                var file_path = dir + '/' + file;
                var fname = path.basename(file, '.js');
                entry_files[fname] = file_path;
            }

        })
    } catch (e) {

    }
}
each_file('./src/js');
//entry_files是一个object对象，也就是遍历js文件夹下的js文件，然后写成entry所需配置的格式。
module.exports = entry_files;