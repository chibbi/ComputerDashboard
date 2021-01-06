const express = require('express');
    const fs = require("fs");
const app = express();
const http = require("http").createServer(app);

const httpport = 3000;

const log = require("./logging")();

    if (!fs.existsSync(__dirname + "/userDB/users.json")) {
        log.printlog("Please create your own users.json file", 2)
        fs.copyFileSync(__dirname + "/userDB/users.json.template", __dirname + "/userDB/users.json");
    }
    if (!fs.existsSync(__dirname + "/userDB/sessions.json")) {
        log.printlog("Created sessions.json file", 5)
        fs.appendFileSync(__dirname + "/userDB/sessions.json", 'data to append', 'utf8');
    }

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require("morgan");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(function(req, res, next) {
    res.setHeader('X-Powered-By', 'Rainbows')
    next()
});

app.use(morgan(function(tokens, req, res) {
    log.printlog([tokens['remote-addr'](req, res),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res), '-',
        tokens['total-time'](req, res), 'ms'
    ].join(' '), 4);
}));
app.use(morgan(function(tokens, req, res) {
    log.printlog([tokens['remote-addr'](req, res),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res), '-',
        tokens['total-time'](req, res), 'ms'
    ].join(' '), 3);
}, {
    skip: function(req, res) {
        return res.statusCode < 400
    }
}));

app.set('view engine', 'pug');

/* ROUTER */
require("./router")(app);

/* SERVERSTART */
http.listen(httpport, () => {
    log.log("Listening on Port: " + httpport, 4);
});
