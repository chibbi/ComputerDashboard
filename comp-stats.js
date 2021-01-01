//
// written by: chibbi
//
module.exports = function () {
    const fs = require("fs");
    const spawn = require('child_process').spawn

    /*
    Monitor sleep mode :: xset dpms force off
    sleep mode :: systemctl suspend
    hibernate mode :: systemctl hibernate // not working on my PC
    shutdown mode :: shutdown 
    */
    // Should get called every second
    module.getStats = function () {
        var stats = [];
        var cpuInfo = getSpecificStat("cpu_info");
        console.log(cpuInfo);
        fs.writeFileSync(__dirname + "/userDB/users.json", Buffer.from(JSON.stringify(stats)), "utf8");
        return true;
    }

    function getSpecificStat(funcName) {
        var cmd = spawn("./linux_json_api.sh", [funcName, '']);
        var stats = [];

        cmd.stdout.on('data', function (chunk) {
            stats.push(chunk.toString())
        })
        return stats;
    }
return module;
}