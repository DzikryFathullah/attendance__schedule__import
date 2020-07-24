/** @format */

const express = require('express');
const compression = require('compression');
const cors = require('cors');
const app = express();
app.use(compression());

// rest api
const http = require('http');
const server = http.createServer(app);

const config = require('./app/config.js');
const port = config.port;
const ip = config.ip;
const package = require('./package');
const service = package.name;
const version = package.version;

// mysql connection
const mysql = require('./app/connection/mysql');


//restAPI
var logger = require('morgan');
var bodyParser = require('body-parser');
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '200mb' }));
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, DELETE'
    );

    // Request headers you wish to allow
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type,Authorization'
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const restapi = require('./app/routes/restapi');
restapi(app);

server.listen(port, ip, () => {
    console.log(`${service} version ${version} listening on ${ip}:${port}`);
});

//export for testing

module.exports = app;
