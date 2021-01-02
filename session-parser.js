module.exports = function() {
    const fs = require("fs");

    let sessions = [];

    module.createSession = function(user) {
        var exists = true;
        var millsec = Date.now();
        var num;
        while (exists) {
            num = Math.floor(Math.random() * 1E18);
            for (var i = 0; i < sessions.length; i++) {
                if (num == sessions[i].num) {
                    exists = true;
                }
                // 1800000 == 30 Minutes
                // 2.592E9 == 30 Days
                if (sessions[i].millsec >= 1, 2.592E9) {
                    sessions.splice(i, 1);
                }
            }
            sessions.push({
                num,
                user,
                millsec
            });
            break;
        }
        saveSessions();
        return num;
    }

    module.isLoggedIn = function(session) {
        return isLoggedIn(session);
    }

    function isLoggedIn(session) {
        for (var i = 0; i < sessions.length; i++) {
            if (session == sessions[i].num) {
                user = sessions[i].user;
                return [true, sessions[i].user];
            }
        }
        return [false, ""];
    }

    module.loadSessions = function() {
        sessions = JSON.parse(fs.readFileSync(__dirname + "/userDB/sessions.json", "utf8"));
    }

    function saveSessions() {
        fs.writeFileSync(__dirname + "/userDB/sessions.json", Buffer.from(JSON.stringify(sessions), "utf8"));
    }
    return module;
};