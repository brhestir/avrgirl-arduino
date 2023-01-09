"use strict";
var boards = require('./boards');
var Connection = require('./lib/connection');
var protocols = require('./lib/protocols');
var AvrgirlArduino = require('./avrgirl-arduino');
module.exports = AvrgirlArduino(boards, Connection, protocols);
//# sourceMappingURL=avrgirl-arduino-node.js.map