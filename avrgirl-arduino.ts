type ConnectionType = { new(arg0: any): any; prototype: { _listPorts: (arg0: any) => any; }; };
type ProtocolsType = { [x: string]: () => void; };
import { BoardsType, ByBoardType } from './boards';

const injectDependencies = (boards: BoardsType, Connection: ConnectionType, protocols: ProtocolsType) => {
  const EventEmitter = require('events');
  const util = require('util');
  const tools = require('./lib/tools');

  type OptionsType = {
    debug?: unknown;
    megaDebug?: boolean;
    board?: ByBoardType | string;
    port?: string;
    manualReset?: any;
    disableVerify?: any;
  }

  /**
   * Constructor
   *
   * @param {OptionsType} opts - options for consumer to pass in
   */
  const AvrgirlArduino = (opts: OptionsType) => {
    opts = opts || {};

    const options: OptionsType = {
      debug: opts.debug || false,
      megaDebug: opts.megaDebug || false,
      board: opts.board || 'uno',
      port: opts.port || '',
      manualReset: opts.manualReset || false,
      disableVerify: opts.disableVerify || false
    };

    // this here checks for 3 conditions:
    // if debug option is simply true, we want to fall back to default debug function
    // if a custom debug function is passed in, we want to assign debug to be that
    // if debug option is false, then run debug as a no-op
    let debug;
    if (options.debug === true) {
      debug = options.debug = console.log.bind(console);
    } else if (typeof options.debug === 'function') {
      debug = options.debug = options.debug;
    } else {
      debug = options.debug = function debugNoop() {};
    }

    // handle 'sparse' boards, ie. boards with only the 'name' property defined
    if (typeof options.board === 'object') {
      const properties = Object.getOwnPropertyNames(options.board);
      if ((properties.length === 1) && (properties[0] === 'name')) {
        options.board = options.board.name;
      }
    }

    if (typeof options.board === 'string') {
      options.board = boards[options.board];
    }

    if (options.board && !options.board.manualReset) {
      options.board.manualReset = options.manualReset;
    }

    if (options.board && !options.board.disableVerify) {
      options.board.disableVerify = options.disableVerify;
    }

    connection = new Connection(options);

    if (options.board) {
      const Protocol = protocols[options.board.protocol] || function() {};

      protocol = new Protocol({
        board: options.board,
        connection: connection,
        debug: debug,
        megaDebug: options.megaDebug
      });
    }

    EventEmitter.call(this);
  };

  util.inherits(AvrgirlArduino, EventEmitter);

  /**
   * Validates the board properties
   *
   * @param {function} callback - function to run upon completion/error
   */
  AvrgirlArduino.prototype._validateBoard = function(callback: (arg0: Error | null) => any) {
    if (typeof this.options.board !== 'object') {
      // cannot find a matching board in supported list
      return callback(new Error('"' + this.options.board + '" is not a supported board type.'));

    } else if (!this.protocol.chip) {
      // something went wrong trying to set up the protocol
      const errorMsg = 'not a supported programming protocol: ' + this.options.board.protocol;
      return callback(new Error(errorMsg));

    } else if (!this.options.port && this.options.board.name === 'pro-mini') {
      // when using a pro mini, a port is required in the options
      return callback(new Error('using a pro-mini, please specify the port in your options.'));

    } else {
      // all good
      return callback(null);
    }
  };

  /**
   * Public method for flashing a hex file to the main program allocation of the Arduino
   *
   * @param {string} file - path to hex file for uploading
   * @param {function} callback - function to run upon completion/error
   */
  AvrgirlArduino.prototype.flash = function(file: any, callback: (arg0: any) => any) {
    const _this = this;

    // validate board properties first
    _this._validateBoard(function(error: any) {
      if (error) { return callback(error); }

      // set up serialport connection
      _this.connection._init(function(error: any) {
        if (error) { return callback(error); }

        // upload file to board
        _this.protocol._upload(file, callback);
      });
    });
  };

  /**
   * Return a list of devices on serial ports. In addition to the output provided
   * by SerialPort.list, it adds a platform independent PID in _pid
   *
   * @param {function} callback - function to run upon completion/error
   */
  AvrgirlArduino.prototype.listPorts = AvrgirlArduino.listPorts =
  AvrgirlArduino.prototype.list = AvrgirlArduino.list = function(callback: any) {
    return Connection.prototype._listPorts(callback);
  };

  /**
   * Static method to return the names of all known boards.
   */
  AvrgirlArduino.listKnownBoards = function() {
    // filter the boards to find all non-aliases
    return Object.keys(boards).filter(function(name) {
      // fetch the current board aliases
      const aliases = boards[name].aliases;
      // only allow the name if it's not an alias
      return !aliases || !~aliases.indexOf(name);
    });
  };

  // shift public static exposure for demo purposes
  AvrgirlArduino.prototype.tools = tools;

  return AvrgirlArduino;
};

module.exports = injectDependencies;

