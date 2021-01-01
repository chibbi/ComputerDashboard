//
// written by: chibbi
//
module.exports = function() {
    const fs = require("fs");
    const spawn = require('child_process').spawn

    // Should get called every second
    module.getStats = function() {
        var cmd = spawn(nixJsonAPIScript, [pluginName, '']);
        var stats = [];

        command.stdout.on('data', function(chunk) {
            output.push(chunk.toString())
        })
    }
    fs.writeFileSync(__dirname + "/userDB/users.json", Buffer.from(JSON.stringify(stats)), "utf8");
    return true;
}
return module;
}