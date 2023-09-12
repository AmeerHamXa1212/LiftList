"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const lift_1 = __importDefault(require("./routes/lift"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.set("trust proxy", false);
// Use the routes
app.use("/lifts", lift_1.default);
const DBConnectionString = process.env.DB_URL;
const Port = process.env.PORT;
if (!DBConnectionString) {
    throw new Error("DB_URL environment variable is not defined.");
}
if (!Port) {
    throw new Error("port environment variable is not defined.");
}
mongoose_1.default
    .connect(DBConnectionString)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(`Error in DB connection : ${err}`))
    .finally(() => console.log("This is finally block of code"));
exports.default = app;
