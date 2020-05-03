"use strict";
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const node_exceptions_1 = require("node-exceptions");
class WrongKeyPath extends node_exceptions_1.RuntimeException {
    constructor(err, path) {
        super(`The key path does not exist: ${path}\n${err.message}`, 500, 'E_WRONG_KEY_PATH');
        this.raw = err;
    }
}
exports.WrongKeyPath = WrongKeyPath;
