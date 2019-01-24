"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uniqueBaseId = "id-" + Date.now();
var uuidCount = 0;
function _TESTING_ONLY_normalize_keys() {
    uniqueBaseId = 'id';
    uuidCount = 0;
}
exports._TESTING_ONLY_normalize_keys = _TESTING_ONLY_normalize_keys;
function generateKey() {
    return uniqueBaseId + "-" + uuidCount++;
}
exports.generateKey = generateKey;
