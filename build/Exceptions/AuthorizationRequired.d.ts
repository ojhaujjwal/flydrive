/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
import { RuntimeException } from 'node-exceptions';
export declare class AuthorizationRequired extends RuntimeException {
    raw: Error;
    constructor(err: Error, path: string);
}
