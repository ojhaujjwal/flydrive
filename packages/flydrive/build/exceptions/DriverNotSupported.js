"use strict";
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverNotSupported = void 0;
const node_exceptions_1 = require("node-exceptions");
class DriverNotSupported extends node_exceptions_1.RuntimeException {
    static driver(name) {
        const exception = new this(`Driver ${name} is not supported`, 400);
        exception.driver = name;
        return exception;
    }
}
exports.DriverNotSupported = DriverNotSupported;
//# sourceMappingURL=DriverNotSupported.js.map