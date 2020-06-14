"use strict";
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidConfig = void 0;
const node_exceptions_1 = require("node-exceptions");
class InvalidConfig extends node_exceptions_1.RuntimeException {
    static missingDiskName() {
        return new this('Make sure to define a default disk name inside config file', 500, 'E_INVALID_CONFIG');
    }
    static missingDiskConfig(name) {
        return new this(`Make sure to define config for ${name} disk`, 500, 'E_INVALID_CONFIG');
    }
    static missingDiskDriver(name) {
        return new this(`Make sure to define driver for ${name} disk`, 500, 'E_INVALID_CONFIG');
    }
    static duplicateDiskName(name) {
        return new this(`A disk named ${name} is already defined`, 500, 'E_INVALID_CONFIG');
    }
}
exports.InvalidConfig = InvalidConfig;
//# sourceMappingURL=InvalidConfig.js.map