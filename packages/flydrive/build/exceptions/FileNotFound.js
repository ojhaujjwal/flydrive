"use strict";
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileNotFound = void 0;
const node_exceptions_1 = require("node-exceptions");
class FileNotFound extends node_exceptions_1.RuntimeException {
    constructor(err, path) {
        super(`The file ${path} doesn't exist\n${err.message}`, 500, 'E_FILE_NOT_FOUND');
        this.raw = err;
    }
}
exports.FileNotFound = FileNotFound;
//# sourceMappingURL=FileNotFound.js.map