"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
var express_1 = require("express");
var DevRouter = /** @class */ (function () {
    function DevRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    ;
    // Documentation
    DevRouter.prototype.dev = function (req, res) {
        res.sendFile(__dirname + './index.html');
    };
    ;
    // Routes
    DevRouter.prototype.routes = function () {
        this.router.get('/', this.dev);
    };
    ;
    return DevRouter;
}());
exports.DevRouter = DevRouter;
;
var devRoutes = new DevRouter();
devRoutes.routes();
// Export
exports.default = devRoutes.router;
