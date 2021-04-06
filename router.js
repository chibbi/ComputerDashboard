module.exports = function (app) {
    const fs = require("fs");
    const log = require("./logging")();
    const compStats = require("./comp-stats")();
    const sessionParser = require("./session-parser")();

    sessionParser.loadSessions();
    compStats.initializeStats();


    if (!fs.existsSync(__dirname + "/userDB/users.json")) {
        log.printlog("Please create your own users.json file", 2)
        fs.copyFileSync(__dirname + "/userDB/users.json.template", __dirname + "/userDB/users.json");
    }

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
            res.sendFile(__dirname + "/static/index.html");
        }
        var [loggedin, user] = sessionParser.isLoggedIn(req.cookies.session);
        if (loggedin) {
            res.redirect("/home");
        } else {
            res.sendFile(__dirname + "/static/index.html");
        }
    })

    app.post('/login', function (req, res) {
        var loggedin = false;
        console.log(req);
        var user = req.body.title;
        var userpw = req.body.text;
        if (user == undefined || userpw == undefined) {
            res.sendFile(__dirname + "/static/index.html");
        } else {
            // TODO: hash those password :: https://www.toptal.com/nodejs/secure-rest-api-in-nodejs
            var usersJsonFile = JSON.parse(fs.readFileSync(__dirname + "/userDB/users.json", "utf8"));
            for (const things in usersJsonFile) {
                var element = usersJsonFile[things];
                console.log(element);
                if (user == element.name && userpw == element.password) {
                    loggedin = true;
                    log.log(user, 4);
                }
            }
            if (loggedin) {
                res.cookie('session', sessionParser.createSession(user), {});
                setTimeout(() => { }, 100);
                res.redirect("/home");
            } else {
                res.sendFile(__dirname + "/static/index.html");
            }
        }
    })

    app.get('/home', function (req, res) {
        if (req.cookies.session == undefined) {
            res.redirect("/login");
        }
        var [loggedin, user] = sessionParser.isLoggedIn(req.cookies.session);
        if (loggedin) {
            res.sendFile(__dirname + "/static/home.html");
        } else {
            res.redirect("/login");
        }
    })

    app.get('/api', function (req, res) {
        if (req.cookies.session == undefined) {
            res.redirect("/login");
        }
        var [loggedin, user] = sessionParser.isLoggedIn(req.cookies.session);
        if (loggedin) {
            res.json(compStats.getStats());
        } else {
            res.redirect("/login");
        }
    })
    app.post('/api', function (req, res) {
        if (req.cookies.session == undefined) {
            res.redirect("/login");
        }
        var [loggedin, user] = sessionParser.isLoggedIn(req.cookies.session);
        if (loggedin) {
            compStats.goInMode(req.body.cmd);
            res.json("Succesful");
        } else {
            res.redirect("/login");
        }
    })
    return module;
}