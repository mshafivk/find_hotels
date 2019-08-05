
var _datafile = "data.json";
var fs = require("fs");

function readJsonFileSync(filepath, encoding) {

    if (typeof (encoding) == 'undefined') {
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getData() {
    var filepath = __dirname + "/../data/" + _datafile;
    return readJsonFileSync(filepath);
}

module.exports = {
    getData: getData,
    readJsonFileSync: readJsonFileSync
}