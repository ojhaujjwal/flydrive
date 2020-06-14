"use strict";
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownException = void 0;
const node_exceptions_1 = require("node-exceptions");
class UnknownException extends node_exceptions_1.RuntimeException {
    constructor(err, errorCode, path) {
        super(`An unknown error happened with the file ${path}.
Please open an issue at https://github.com/Slynova-Org/flydrive/issues

Error code: ${errorCode}
Original stack:
${err.stack}`, 500, 'E_UNKNOWN');
        this.raw = err;
    }
}
exports.UnknownException = UnknownException;
//# sourceMappingURL=UnknownException.js.map