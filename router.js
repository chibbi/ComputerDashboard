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
    app.get("/css/default.css", (req, res) => {
        res.sendFile(__dirname + "/static/css/default.css");
    });
    app.get("/pictures/logo.png", (req, res) => {
        res.sendFile(__dirname + "/static/pictures/logo.png");
    });

    // pug CAN use normal HTML
    app.get('/', function(req, res) {
        if (req.cookies.lcl == "de") {
            res.render(__dirname + "/static/index.pug", lclde);
        } else {
            res.render(__dirname + "/static/index.pug", lclen);
        }
    })
    return module;
}