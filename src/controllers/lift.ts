import express, { Request, Response, NextFunction } from "express";
import lift, { ILift } from "../models/lift";
import { EStatus } from "../constants/enums";
import LiftModel from "../models/lift";
import mongoose from "mongoose";
import Joi from "joi";

const LiftValidation = Joi.object({
  name: Joi.string().required(),
  elevation_gain: Joi.number().min(1).max(100).required(),
  status: Joi.string().valid("HOLD", "OPEN", "CLOSED").required(),
});

export const CreateLift = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    const createdLift = await LiftModel.create(newLift);
    res.status(201).json(`New Lift Created `);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
export const GetAllLift = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Lifts = await LiftModel.find();
    if (Lifts.length === 0 || !Lifts) {
      return res.status(404).json("Lifts not found");
    }
    res.status(200).json(Lifts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
export const EditLiftStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;
    const liftId = req.params.liftid;
    const Lift = await LiftModel.findById(liftId);
    if (!Lift) {
      return res.status(404).json(`Lift with id : ${liftId} not found`);
    }
    Lift.status = status;
    await Lift.save();
    res
      .status(201)
      .json(
        `Status of Lift with id : ${Lift._id} has been updated successfully.`
      );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
export const GetLiftByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;
    const LiftByStatus = await LiftModel.find({ status });
    if (LiftByStatus.length === 0 || !LiftByStatus) {
      return res
        .status(404)
        .json(`Lifts with status : ${status} Not-Found/Not-Exists`);
    }
    return res.status(200).json(LiftByStatus);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
