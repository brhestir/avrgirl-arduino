"use strict";
var Avrgirl = require('../../avrgirl-arduino-node');
var avrgirl = new Avrgirl({
    board: 'circuit-playground-classic',
    debug: true
});
var hex = __dirname + '/../../junk/hex/circuit-playground-classic/Blink.cpp.hex';
avrgirl.flash(hex, function (error) {
    if (error) {
        console.error(error);
    }
    else {
        console.log('done.');
    }
});
//# sourceMappingURL=circuit-playground-classic.js.map