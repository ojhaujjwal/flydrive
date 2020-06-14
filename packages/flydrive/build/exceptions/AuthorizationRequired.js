"use strict";
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationRequired = void 0;
const node_exceptions_1 = require("node-exceptions");
class AuthorizationRequired extends node_exceptions_1.RuntimeException {
    constructor(err, path) {
        super(`Unauthorized to access file ${path}\n${err.message}`, 500, 'E_AUTHORIZATION_REQUIRED');
        this.raw = err;
    }
}
exports.AuthorizationRequired = AuthorizationRequired;
//# sourceMappingURL=AuthorizationRequired.js.map