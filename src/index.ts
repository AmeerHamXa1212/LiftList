import app from "./app";
import mongoose from "mongoose";

const Port = process.env.PORT || 3000;
mongoose.set("strictQuery", true);
const server = app.listen(Port, () => {
  console.log(`Server is running at http://localhost:${Port}`);
});
