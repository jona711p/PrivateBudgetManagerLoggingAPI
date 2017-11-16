"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
var mongoose_1 = require("mongoose");
// Log Schema 
var LogSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
        default: '',
        required: true
    },
    statusCode: {
        type: String,
        default: '',
        required: true
    },
    logEntry: {
        type: String,
        default: '',
        required: true
    }
});
// Export
exports.default = mongoose_1.model('Log', LogSchema);
