"use strict";
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodNotSupported = void 0;
const node_exceptions_1 = require("node-exceptions");
class MethodNotSupported extends node_exceptions_1.RuntimeException {
    constructor(name, driver) {
        super(`Method ${name} is not supported for the driver ${driver}`, 500, 'E_METHOD_NOT_SUPPORTED');
    }
}
exports.MethodNotSupported = MethodNotSupported;
//# sourceMappingURL=MethodNotSupported.js.map