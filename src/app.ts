import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import LiftRouter from "./routes/lift";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", false);

// Use the routes
app.use("/lifts", LiftRouter);

const DBConnectionString = process.env.DB_URL;
const Port = process.env.PORT;

if (!DBConnectionString) {
  throw new Error("DB_URL environment variable is not defined.");
}
if (!Port) {
  throw new Error("port environment variable is not defined.");
}
mongoose
  .connect(DBConnectionString)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(`Error in DB connection : ${err}`))
  .finally(() => console.log("This is finally block of code"));

export default app;
