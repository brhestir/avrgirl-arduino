"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// TODO: switch out this browser shim for mitt: https://github.com/developit/mitt
const { EventEmitter } = require('events');
class SerialPort extends EventEmitter {
    constructor(port, options) {
        super(options);
        this.options = options || {};
        this.browser = true;
        this.path = this.options.path;
        this.isOpen = false;
        this.port = null;
        this.writer = null;
        this.reader = null;
        this.baudRate = this.options.baudRate;
        this.requestOptions = this.options.requestOptions || {};
        if (this.options.autoOpen)
            this.open();
    }
    list(callback) {
        return navigator.serial.getPorts()
            .then((list) => { if (callback) {
            return callback(null, list);
        } })
            .catch((error) => { if (callback) {
            return callback(error);
        } });
    }
    open(callback) {
        window.navigator.serial.requestPort(this.requestOptions)
            .then(serialPort => {
            this.port = serialPort;
            if (this.isOpen)
                return;
            return this.port.open({ baudRate: this.baudRate || 57600 });
        })
            .then(() => this.writer = this.port.writable.getWriter())
            .then(() => this.reader = this.port.readable.getReader())
            .then(() => __awaiter(this, void 0, void 0, function* () {
            this.emit('open');
            this.isOpen = true;
            callback(null);
            while (this.port.readable.locked) {
                try {
                    const { value, done } = yield this.reader.read();
                    if (done) {
                        break;
                    }
                    this.emit('data', Buffer.from(value));
                }
                catch (e) {
                    console.error(e);
                }
            }
        }))
            .catch(error => { callback(error); });
    }
    close(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reader.releaseLock();
                yield this.writer.releaseLock();
                yield this.port.close();
                this.isOpen = false;
            }
            catch (error) {
                if (callback)
                    return callback(error);
                throw error;
            }
            callback && callback(null);
        });
    }
    set(props = {}, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signals = {};
                if (Object.prototype.hasOwnProperty.call(props, 'dtr')) {
                    signals.dataTerminalReady = props.dtr;
                }
                if (Object.prototype.hasOwnProperty.call(props, 'rts')) {
                    signals.requestToSend = props.rts;
                }
                if (Object.prototype.hasOwnProperty.call(props, 'brk')) {
                    signals.break = props.brk;
                }
                if (Object.keys(signals).length > 0) {
                    yield this.port.setSignals(signals);
                }
            }
            catch (error) {
                if (callback)
                    return callback(error);
                throw error;
            }
            if (callback)
                return callback(null);
        });
    }
    write(buffer, callback) {
        this.writer.write(buffer);
        if (callback)
            return callback(null);
    }
    read(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let buffer;
            try {
                buffer = yield this.reader.read();
            }
            catch (error) {
                if (callback)
                    return callback(error);
                throw error;
            }
            if (callback)
                callback(null, buffer);
        });
    }
    // TODO: is this correct?
    flush(callback) {
        //this.port.flush(); // is this sync or a promise?
        console.warn('flush method is a NOP right now');
        if (callback)
            return callback(null);
    }
    // TODO: is this correct?
    drain(callback) {
        // this.port.drain(); // is this sync or a promise?
        console.warn('drain method is a NOP right now');
        if (callback)
            return callback(null);
    }
}
module.exports = SerialPort;
//# sourceMappingURL=browser-serialport.js.map