import boards from './boards'
const Connection = require('./lib/connection');
const protocols = require('./lib/protocols');
const AvrgirlArduino = require('./avrgirl-arduino');

module.exports = AvrgirlArduino(boards, Connection, protocols);

