"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndReturnIfEmpty = void 0;
// Function to check if an object is null or has a length of 0
function checkAndReturnIfEmpty(object, response, customMessage) {
    if (!object) {
        return response.status(404).json({ message: customMessage });
    }
    return false; // Indicates that the object is not empty
}
exports.checkAndReturnIfEmpty = checkAndReturnIfEmpty;
