import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import cors from "cors";

import wilderController from "./controllers/wilder";

const app = express();

//Database
mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
    autoIndex: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err:Error) => console.log(err));

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Routes
app.get("/", (req:Request, res:Response) => {
  res.send("Hello World");
});

app.post("/api/wilders", asyncHandler(wilderController.create));
app.get("/api/wilders", asyncHandler(wilderController.read));
app.put("/api/wilders", asyncHandler(wilderController.update));
app.delete("/api/wilders/:id", asyncHandler(wilderController.delete));

app.get("*", (req:Request, res:Response) => {
  res.status(404);
  res.send({ success: false, message: "Wrong adress" });
});

app.use((error:any, req:Request, res:Response, next:NextFunction) => {
  if (error.name === "MongoError" && error.code === 11000) {
    res.status(400);
    res.json({ success: false, message: "The name is already used" });
  }
});

//Start Server
app.listen(5000, () => console.log("Server started on 5000"));
