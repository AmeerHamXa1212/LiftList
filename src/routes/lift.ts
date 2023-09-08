import { Router } from "express";
import {
  GetAllLift,
  CreateLift,
  GetLiftByStatus,
  EditLiftStatus,
} from "../controllers/lift";
import { validateStatus } from "../middlewares/validateStatus";

const LiftRouter = Router();

LiftRouter.post("/createlift", CreateLift);
LiftRouter.get("/alllift", GetAllLift);
LiftRouter.get("/allliftstatus", validateStatus, GetLiftByStatus);
LiftRouter.patch("/editlift/:liftid", validateStatus, EditLiftStatus);

export default LiftRouter;
