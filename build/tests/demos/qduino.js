"use strict";
var Avrgirl = require('../../avrgirl-arduino-node');
var avrgirl = new Avrgirl({
    board: 'qduino',
    debug: true
});
var hex = __dirname + '/../../junk/hex/qduino/rainbow.cpp.hex';
avrgirl.flash(hex, function (error) {
    if (error) {
        console.error(error);
    }
    else {
        console.info('done.');
    }
});
//# sourceMappingURL=qduino.js.map