var fs = require("fs"); 
module.exports = function() {
    var log = ["test"];
    console.log = function() {
        log.push([].slice.call(arguments)+"\n");
        // return log;
        fs.appendFile("log.txt",log,function(err){
            if(err) console.log(err);
        });
    };
}