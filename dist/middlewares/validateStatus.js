"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStatus = void 0;
const enums_1 = require("../constants/enums");
function validateStatus(req, res, next) {
    const { status } = req.body;
    if (!status) {
        return res
            .status(400)
            .json({ error: "Status field is required in the request body" });
    }
    if (!(status in enums_1.EStatus)) {
        return res.status(400).json({ error: "Invalid status value" });
    }
    // If the status is valid, continue to the next middleware or route handler
    next();
}
exports.validateStatus = validateStatus;
