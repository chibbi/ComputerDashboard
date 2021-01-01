const express = require('express');
const app = express();
const http = require("http").createServer(app);

const httpport = 3000;

const log = require("./logging")();
log.log("Loaded logging: " + "5", 5);

const myArgs = process.argv.slice(2);
if (myArgs.includes("production")) {
    log.printlog("Started as Production", 2);
    process.env['NODE_ENV'] = "production";
} else {
    log.printlog("Started as DEVELOPMENT", 2);
    process.env['NODE_ENV'] = "development";
}

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require("morgan");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('X-Powered-By', 'Rainbows')
    next()
});

/* REQUEST LOGGING */
let useramount;
let userip = [];

app.use(morgan(function (tokens, req, res) {
    var curip = req.ip.slice(0, -3);
    var exists = false;
    if (userip.length != 0) {
        for (var i = 0; i < userip.length; i++) {
            if (curip == userip[i]) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            userip.push(curip);
        }
    } else { userip.push(curip); }
    useramount++;
}, {
    skip: function (req, res) {
        if (req.url.includes(".css") || req.url.includes(".png") ||
            req.url.includes(".js") || req.url.includes("api") ||
            req.url == "/favicon.ico") { return false; }
    }
}));

app.use(morgan(function (tokens, req, res) {
    log.printlog([tokens['remote-addr'](req, res),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res), '-',
    tokens['total-time'](req, res), 'ms'
    ].join(' '), 4);
}, {
    skip: function (req, res) {
        if (false) { return true; }
    }
}));

if (process.env.NODE_ENV == "production") {
    // log only 4xx and 5xx responses to console
    app.use(morgan('combined', {
        skip: function (req, res) { return res.statusCode < 400 }
    }))
} else {
    app.use(morgan(function (tokens, req, res) {
        log.printlog([tokens['remote-addr'](req, res),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res), '-',
        tokens['total-time'](req, res), 'ms'
        ].join(' '), 4);
    }))
}

app.set('view engine', 'pug');

/* ROUTER */
require("./router")(app);

/* SERVERSTART */
http.listen(httpport, () => {
    log.log("Listening on Port: " + httpport, 4);
});
