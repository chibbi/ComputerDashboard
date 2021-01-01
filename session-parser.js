module.exports = function() {

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
                } // 1800000 == 30Minutes
                if (sessions[i].millsec >= 1800000) {
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
    return module;
};
