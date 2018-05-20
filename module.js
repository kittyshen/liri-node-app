var fs = require("fs"); 
module.exports = function() {
    var log = [];
    console.log = function() {
        log.push([].slice.call(arguments)+"\n");
        fs.appendFile("log.txt",log,function(err){
            if(err) console.log(err);
        })
    };
}