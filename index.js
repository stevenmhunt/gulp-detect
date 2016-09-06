
var es = require('event-stream'),
    fnTemplate = require('./template');

module.exports = function(globalObj) {

    var template = fnTemplate(globalObj || 'globalObject');

    return es.map(function(file, cb){
        file.contents = Buffer.concat([
            new Buffer(template.header),
            file.contents,
            new Buffer(template.footer)
        ]);
        cb(null, file);
    });
};