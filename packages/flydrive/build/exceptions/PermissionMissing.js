"use strict";
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionMissing = void 0;
const node_exceptions_1 = require("node-exceptions");
class PermissionMissing extends node_exceptions_1.RuntimeException {
    constructor(err, path) {
        super(`Missing permission for file ${path}\n${err.message}`, 500, 'E_PERMISSION_MISSING');
        this.raw = err;
    }
}
exports.PermissionMissing = PermissionMissing;
//# sourceMappingURL=PermissionMissing.js.map