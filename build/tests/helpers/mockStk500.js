"use strict";
function mockStk500() {
}
mockStk500.prototype.bootload = function (serialPort, hex, board, callback) {
    callback();
};
module.exports = mockStk500;
//# sourceMappingURL=mockStk500.js.map