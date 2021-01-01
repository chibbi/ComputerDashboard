module.exports = function(app) {
    const fs = require("fs");
    const log = require("./logging")();
    const sessionParser = require("./session-parser")();
    const lclen = require("./locales/en.json");
    const lclde = require("./locales/de.json");

    app.get("/favicon.ico", (req, res) => {
        res.sendFile(__dirname + "/static/pictures/logo.png");
    });
    app.get("/js/default.js", (req, res) => {
        res.sendFile(__dirname + "/static/js/default.js");
    });
    app.get("/js/getData.js", (req, res) => {
        res.sendFile(__dirname + "/static/js/getData.js");
    });
    app.get("/css/default.css", (req, res) => {
        res.sendFile(__dirname + "/static/css/default.css");
    });
    app.get("/pictures/logo.png", (req, res) => {
        res.sendFile(__dirname + "/static/pictures/logo.png");
    });

    // pug CAN use normal HTML
    app.get('/', function (req, res) {
        res.redirect("/login");
    })

    app.get('/login', function (req, res) {
        if (req.cookies.session == undefined) {
            res.sendFile(__dirname + "/static/login.html");
        }
        var [loggedin, user] = cloud.isLoggedIn(req.cookies.session);
        if (loggedin) {
            res.redirect("/home");
        } else {
            res.sendFile(__dirname + "/static/login.html");
        }
    })

    app.post('/login', upload.none(), function (req, res) {
        var loggedin = false;
        var user = req.body.title;
        var userpw = req.body.text;
        if (user == undefined || userpw == undefined) {
            res.sendFile(__dirname + "/static/login.html");
        } else {
            // TODO: hash those password :: https://www.toptal.com/nodejs/secure-rest-api-in-nodejs
            var usersJsonFile = JSON.parse(fs.readFileSync(__dirname + "/userDB/users.json", "utf8"));
            for (var i = 0; i < Object.keys(usersJsonFile).length; i++) {
                var element = usersJsonFile[i];
                if (user == element.name && userpw == element.password) {
                    loggedin = true;
                    log.log(user, 4);
                }
            }
            if (loggedin) {
                res.cookie('session', cloud.createSession(user), {});
                setTimeout(() => { }, 100);
                res.redirect("/home");
            } else {
                res.sendFile(__dirname + "/static/login.html");
            }
        }
    })

    app.get('/home', function (req, res) {
        if (req.cookies.session == undefined) {
            res.redirect("/login");
        }
        var [loggedin, user] = cloud.isLoggedIn(req.cookies.session);
        if (loggedin) {
            if (req.cookies.lcl == "de") {
                res.render(__dirname + "/static/index.pug", lclde);
            } else {
                res.render(__dirname + "/static/index.pug", lclen);
            }
        } else {
            res.redirect("/login");
        }
    })

    app.get('/api', function (req, res) {
        if (req.cookies.session == undefined) {
            res.redirect("/login");
        }
        var [loggedin, user] = cloud.isLoggedIn(req.cookies.session);
        if (loggedin) {
            // TODO send stast
        } else {
            res.redirect("/login");
        }
    })
    return module;
}