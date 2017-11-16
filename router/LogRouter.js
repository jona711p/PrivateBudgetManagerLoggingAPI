"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
var express_1 = require("express");
var Log_1 = require("../models/Log");
// LogRouter
var LogRouter = /** @class */ (function () {
    function LogRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    ;
    // Get all of the Logs in the Database
    LogRouter.prototype.all = function (req, res) {
        Log_1.default.find()
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.json({ error: error });
        });
    };
    ;
    // Get a single Log by 'Id'
    LogRouter.prototype.one = function (req, res) {
        var id = req.params.Id;
        Log_1.default.findOne({ id: id })
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    ;
    // Create a new Log
    LogRouter.prototype.create = function (req, res) {
        var user = req.body.user;
        var statusCode = req.body.statusCode;
        var logEntry = req.body.logEntry;
        if (!user || !logEntry) {
            res.status(422).json({ message: 'All Fields Required.' });
        }
        var log = new Log_1.default({
            user: user,
            statusCode: statusCode,
            logEntry: logEntry
        });
        log.save()
            .then(function (data) {
            res.status(201).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    ;
    // Update log by 'Id'
    LogRouter.prototype.update = function (req, res) {
        var id = req.body.id;
        Log_1.default.findOneAndUpdate({ id: id }, req.body)
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    ;
    // Delete log by 'Id'
    LogRouter.prototype.delete = function (req, res) {
        var id = req.body.id;
        Log_1.default.findOneAndRemove({ id: id })
            .then(function () {
            res.status(204).end();
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    ;
    // Get all of the Logs in the Database for one Day
    LogRouter.prototype.day = function (req, res) {
        Log_1.default.find({ timestamp: { $lte: new Date(), $gte: new Date(new Date().setDate(new Date().getDate() - 1)) } })
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.json({ error: error });
        });
    };
    ;
    // Get all of the Logs in the Database for one Week
    LogRouter.prototype.week = function (req, res) {
        Log_1.default.find({ timestamp: { $lte: new Date(), $gte: new Date(new Date().setDate(new Date().getDate() - 7)) } })
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.json({ error: error });
        });
    };
    ;
    // Get all of the Logs in the Database for one Month
    LogRouter.prototype.month = function (req, res) {
        Log_1.default.find({ timestamp: { $lte: new Date(), $gte: new Date(new Date().setDate(new Date().getDate() - 31)) } })
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.json({ error: error });
        });
    };
    ;
    // Routes
    LogRouter.prototype.routes = function () {
        this.router.get('/', this.all);
        this.router.get('/:id', this.one);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
        this.router.get('/day', this.day);
        this.router.get('/week', this.week);
        this.router.get('/month', this.month);
    };
    ;
    return LogRouter;
}());
exports.LogRouter = LogRouter;
;
var logRoutes = new LogRouter();
logRoutes.routes();
// Export
exports.default = logRoutes.router;
