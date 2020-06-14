"use strict";
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./AuthorizationRequired"), exports);
__exportStar(require("./DriverNotSupported"), exports);
__exportStar(require("./FileNotFound"), exports);
__exportStar(require("./InvalidConfig"), exports);
__exportStar(require("./MethodNotSupported"), exports);
__exportStar(require("./NoSuchBucket"), exports);
__exportStar(require("./PermissionMissing"), exports);
__exportStar(require("./UnknownException"), exports);
__exportStar(require("./WrongKeyPath"), exports);
//# sourceMappingURL=index.js.map