"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const Port = process.env.PORT || 3000;
mongoose_1.default.set("strictQuery", true);
const server = app_1.default.listen(Port, () => {
    console.log(`Server is running at http://localhost:${Port}`);
});
