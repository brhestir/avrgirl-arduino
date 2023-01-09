"use strict";
var Avrgirl = require('../../avrgirl-arduino-node');
var avrgirl = new Avrgirl({
    board: 'duemilanove168',
    debug: true
});
var hex = __dirname + '/../../junk/hex/duemilanove168/Blink.cpp.hex';
avrgirl.flash(hex, function (error) {
    if (error) {
        console.error(error);
    }
    else {
        console.info('done.');
    }
});
//# sourceMappingURL=due168.js.map