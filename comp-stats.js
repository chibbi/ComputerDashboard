//
// written by: chibbi

const {
    S_IWUSR
} = require("constants");

//
module.exports = function() {
    const fs = require("fs");
    const log = require("./logging")();
    const {
        exec
    } = require("child_process");


    let allstats = [];
    /*
    Monitor sleep mode :: xset dpms force off
    sleep mode :: systemctl suspend
    hibernate mode :: systemctl hibernate // not working on my PC
    shutdown mode :: shutdown 
    */
    // Should get called every second
    module.getStats = function() {
        return allstats;
    }

    module.initializeStats = function() {
        setInterval(getNewStats, 10000);
    }

    module.goInMode = function(mode) {
        switch (mode) {
            case "monitorSleep":
                execCommand("xset dpms force off");
                break;
            case "pcSleep":
                execCommand("systemctl suspend");
                break;
            case "pcHibernate":
                execCommand("systemctl hibernate");
                break;
            case "pcShutdown":
                execCommand("shutdown");
                break;
        }
    }

    function getNewStats() {
        var stats = [];
        var cpuInfo = getSpecificStat("cpu_info");
        console.log(cpuInfo);
        allstats = stats;
        fs.writeFileSync(__dirname + "/userDB/users.json", Buffer.from(JSON.stringify(stats)), "utf8");
        return true;
    }

    function execCommand(cmd) {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                log.printlog(`error: ${error.message}`, 0);
                return;
            }
            if (stderr) {
                log.printlog(`stderr: ${stderr}`, 0);
                return;
            }
            log.log(`stdout: ${stdout}`, 3);
        });
    }

    function getSpecificStat(funcName) {
        var stats = [];

        exec("./linux_json_api.sh " + funcName, (error, stdout, stderr) => {
            if (error) {
                log.printlog(`error: ${error.message}`, 0);
                return;
            }
            if (stderr) {
                log.printlog(`stderr: ${stderr}`, 0);
                return;
            }
            stats = stdout;
        });

        return stats;
    }
    return module;
}