/*
    Monitor sleep mode :: xset dpms force off
    sleep mode :: systemctl suspend
    hibernate mode :: systemctl hibernate // not working on my PC
*/
module.exports = function() {
    module.getStats = function() {
        return JSON.parse(fs.readFileSync(__dirname + "/public/stats.json", "utf8"));
    }
    return module;
}