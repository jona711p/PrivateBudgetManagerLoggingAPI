"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
var bodyParser = require("body-parser");
var compression = require("compression");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var express = require("express");
var logger = require("morgan");
var helmet = require("helmet");
var mongoose = require("mongoose");
// Import our Routers/Controllers
var LogRouter_1 = require("./router/LogRouter");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    // Application Config
    Server.prototype.config = function () {
        // Init MongoDB
        var MONGO_URI = 'mongodb://localhost/privatebudgetmanagerloggingapi';
        mongoose.connect(process.env.MONGODB_URI || MONGO_URI);
        // Express Middleware
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(compression());
        this.app.use(cookieParser());
        this.app.use(cors());
        this.app.use(logger('dev'));
        this.app.use(helmet());
        // Cors
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
        this.app.get('/', function (req, res) {
            res.sendFile(__dirname + '/shared/index.html');
        });
    };
    // Application Routes
    Server.prototype.routes = function () {
        var router = express.Router();
        //this.app.use('/', router);
        this.app.use('/logs', LogRouter_1.default);
    };
    return Server;
}());
// Export
exports.default = new Server().app;
