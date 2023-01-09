var AVR109 = require('chip.avr.avr109');
var colors = require('colors');
var fs = require('graceful-fs');
var Serialport = require('serialport');
var async = require('async');
const Protocol = require('./protocol');
var util = require('util');

var Avr109 = function(options: { protocol: () => any; }) {
  options.protocol = function() { return AVR109; };

  Protocol.call(this, options);
};

util.inherits(Avr109, Protocol);

/**
 * Uploads the provided hex file to the board, via the AVR109 protocol
 *
 * @param {string, Buffer} hex - path of hex file for uploading, or Buffer of the hex data
 * @param {function} callback - function to run upon completion/error
 */
Avr109.prototype._upload = function(file: any, callback: (arg0: unknown) => any) {
  var _this = this;
  var data: any;

  try {
    if (typeof file === 'string') {
      data = fs.readFileSync(file, {
        encoding: 'utf8'
      });
    } else {
      data = file;
    }
  } catch (error) {
    return callback(error);
  }

  _this._reset(function(error: any) {
    if (error) { return callback(error); }

    _this.debug('reset complete.');

    _this.connection._pollForOpen(function(error: any) {
      if (error) { return callback(error); }

      _this.debug('connected');

      _this._write(data, function(error: any) {
        var color = (error ? colors.red : colors.green);
        _this.debug(color('flash complete.'));
        // this is a workaround, please see https://github.com/noopkat/avrgirl-arduino/issues/193 
        //      _this.connection.serialPort.close();

        return callback(error);
      });
    });
  });
};

/**
 * Performs the writing part of uploading to an AVR109 bootloaded chip
 *
 * @param {buffer} data - hex buffer to write to the chip
 * @param {function} callback - function to run upon completion/error
 */
Avr109.prototype._write = function(data: { toString: () => any; }, callback: (arg0: any) => any) {
  var _this = this;
  
  var options = {
    signature: _this.board.signature.toString(),
    debug: this.megaDebug
  };

  _this.chip.init(_this.connection.serialPort, options, function(error: any, flasher: { erase: { bind: (arg0: any) => any; }; program: { bind: (arg0: any, arg1: any) => any; }; verify: (arg0: any) => void; fuseCheck: { bind: (arg0: any) => any; }; }) {
    if (error) { return callback(error); }

    _this.debug('flashing, please wait...');

    async.series([
      flasher.erase.bind(flasher),
      flasher.program.bind(flasher, data.toString()),
      function verify(done: () => void) {
        if (_this.board.disableVerify === true) {
          done();
        } else {
          flasher.verify(done);
        }
      },

      flasher.fuseCheck.bind(flasher)
    ],
    function(error: any) {
      return callback(error);
    });
  });
};

/**
 * Software resets an Arduino AVR109 bootloaded chip into bootloader mode
 *
 * @param {function} callback - function to run upon completion/error
 */
Avr109.prototype._reset = function(callback: (arg0: null) => any) {
  var _this = this;
  var conn: { _setDTR: { bind: (arg0: any, arg1: boolean, arg2: number) => any; }; _pollForPort: { bind: (arg0: any) => any; }; };

  if (_this.board.manualReset) {
    return callback(null);
  }

  // creating a temporary connection for resetting only
  var tempSerialPort = new Serialport(_this.connection.options.port, {
    baudRate: 1200,
    autoOpen: false
  });

  _this.connection.serialPort = tempSerialPort;
  conn = _this.connection;

  _this.debug('resetting board...');

  async.series([
    tempSerialPort.open.bind(tempSerialPort),
    conn._setDTR.bind(conn, false, 250)
  ],
  function(error: any) {
    if (error) {
      return callback(error);
    }
    async.series([
      conn._pollForPort.bind(conn)
    ],
    function(error: any) {
      return callback(error);
    });
  });
};

export default Avr109