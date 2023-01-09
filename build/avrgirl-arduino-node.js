"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boards_1 = __importDefault(require("./boards"));
const Connection = require('./lib/connection');
const protocols = require('./lib/protocols');
const AvrgirlArduino = require('./avrgirl-arduino');
module.exports = AvrgirlArduino(boards_1.default, Connection, protocols);
//# sourceMappingURL=avrgirl-arduino-node.js.map