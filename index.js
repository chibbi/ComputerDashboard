const express = require('express');
const app = express();
const http = require("http").createServer(app);

const httpport = 8080;

const log = require("./logging")();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require("morgan");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(function (req, res, next) {
    res.setHeader('X-Powered-By', 'Rainbows')
    next()
});

app.use(morgan(function (tokens, req, res) {
    log.printlog([tokens['remote-addr'](req, res),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res), '-',
    tokens['total-time'](req, res), 'ms'
    ].join(' '), 4);
}));
app.use(morgan(function (tokens, req, res) {
    log.printlog([tokens['remote-addr'](req, res),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res), '-',
    tokens['total-time'](req, res), 'ms'
    ].join(' '), 3);
}, {
    skip: function (req, res) {
        return res.statusCode < 400
    }
}));

/* ROUTER */
require("./router")(app);

/* SERVERSTART */
http.listen(httpport, () => {
    log.log("Listening on Port: " + httpport, 4);
});
