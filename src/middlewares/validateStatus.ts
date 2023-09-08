import { Request, Response, NextFunction } from "express";
import { EStatus } from "../constants/enums";

export function validateStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { status } = req.body;
  if (!status) {
    return res
      .status(400)
      .json({ error: "Status field is required in the request body" });
  }
  if (!(status in EStatus)) {
    return res.status(400).json({ error: "Invalid status value" });
  }
  // If the status is valid, continue to the next middleware or route handler
  next();
}
