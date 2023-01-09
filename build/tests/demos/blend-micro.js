"use strict";
var Avrgirl = require('../../avrgirl-arduino-node');
var avrgirl = new Avrgirl({
    board: 'blend-micro',
    debug: true
});
var hex = __dirname + '/../../junk/hex/blend-micro/Blink.cpp.hex';
avrgirl.flash(hex, function (error) {
    if (error) {
        console.error(error);
    }
    else {
        console.info('done.');
    }
});
//# sourceMappingURL=blend-micro.js.map