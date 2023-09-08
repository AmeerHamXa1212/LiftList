import mongoose, { Schema, Document, Model } from "mongoose";
import { EStatus } from "../constants/enums";

export interface ILift extends Document {
  name: string;
  elevation_gain: number;
  status: EStatus;
}

const LiftSchema = new Schema<ILift>({
  name: {
    type: String,
    minlength: 6,
    maxlength: 20,
    required: true,
    unique: true,
  },
  elevation_gain: {
    type: Number,
    min: 1,
    max: 100,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(EStatus),
    required: true,
  },
});

export default mongoose.model("LiftCollection", LiftSchema);
