"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLiftByStatus = exports.EditLiftStatus = exports.GetAllLift = exports.CreateLift = void 0;
const lift_1 = __importDefault(require("../models/lift"));
const joi_1 = __importDefault(require("joi"));
const LiftValidation = joi_1.default.object({
    name: joi_1.default.string().required(),
    elevation_gain: joi_1.default.number().min(1).max(100).required(),
    status: joi_1.default.string().valid("HOLD", "OPEN", "CLOSED").required(),
});
const CreateLift = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = LiftValidation.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json(` Lift cannot be created due to error : ${error}`);
        }
        //console.log('content of value : ', value )
        const { name, elevation_gain, status } = value;
        const newLift = {
            name: name,
            elevation_gain: elevation_gain,
            status: status,
        };
        const createdLift = yield lift_1.default.create(newLift);
        res.status(201).json(`New Lift Created `);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});
exports.CreateLift = CreateLift;
const GetAllLift = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Lifts = yield lift_1.default.find();
        if (Lifts.length === 0 || !Lifts) {
            return res.status(404).json("Lifts not found");
        }
        res.status(200).json(Lifts);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});
exports.GetAllLift = GetAllLift;
const EditLiftStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const liftId = req.params.liftid;
        const Lift = yield lift_1.default.findById(liftId);
        if (!Lift) {
            return res.status(404).json(`Lift with id : ${liftId} not found`);
        }
        Lift.status = status;
        yield Lift.save();
        res
            .status(201)
            .json(`Status of Lift with id : ${Lift._id} has been updated successfully.`);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});
exports.EditLiftStatus = EditLiftStatus;
const GetLiftByStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const LiftByStatus = yield lift_1.default.find({ status });
        if (LiftByStatus.length === 0 || !LiftByStatus) {
            return res
                .status(404)
                .json(`Lifts with status : ${status} Not-Found/Not-Exists`);
        }
        return res.status(200).json(LiftByStatus);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});
exports.GetLiftByStatus = GetLiftByStatus;
