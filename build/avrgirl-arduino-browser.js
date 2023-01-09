"use strict";
const boards = require('./boards');
const Connection = require('./lib/connection-browser');
const protocols = require('./lib/protocols');
const AvrgirlArduino = require('./avrgirl-arduino');
module.exports = AvrgirlArduino(boards, Connection, protocols);
//# sourceMappingURL=avrgirl-arduino-browser.js.map