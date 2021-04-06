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
        setInterval(getNewStats, 1000);
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
            case "appShutdown":
                process.exit(137);
                break;
        }
    }

    function getNewStats() {
        fs.writeFileSync(__dirname + "/public/stats.json", Buffer.from("{}"), "utf8"); //  clearing File
        getSpecificStat("cpu_info"); // not changing
        getSpecificStat("cpu_temp");
        getSpecificStat("cpu_intensive_processes");
        getSpecificStat("current_ram");
        getSpecificStat("general_info");
        getSpecificStat("io_stats");
        getSpecificStat("ram_intensive_processes");
        getSpecificStat("ip_addresses"); // not changing often 
        // TODO: implement soemthing, that stops those not often changing variables to be recalled every second
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
        exec("./linux_json_api.sh " + funcName, (error, stdout, stderr) => {
            if (error) {
                log.printlog(`error: ${error.message}`, 0);
                return;
            }
            if (stderr) {
                log.printlog(`stderr: ${stderr}`, 0);
                return;
            }
            stats = JSON.parse(fs.readFileSync(__dirname + "/public/stats.json", "utf8"));
            stats[funcName] = JSON.parse(stdout);
            allstats = stats;
            fs.writeFileSync(__dirname + "/public/stats.json", Buffer.from(JSON.stringify(stats)), "utf8");
        });
    }
    return module;
}
