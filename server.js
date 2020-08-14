const express = require("express");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const WilderModel = require("./models/Wilder");
const wilderController = require("./controllers/wilder");

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
  .catch((err) => console.log(err));

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/wilder/create", asyncHandler(wilderController.create));
app.get("/api/wilder/read", asyncHandler(wilderController.read));
app.put("/api/wilder/update", asyncHandler(wilderController.update));
app.delete("/api/wilder/delete", asyncHandler(wilderController.delete));

app.use((error, req, res, next) => {
  if (error.name === "MongoError" && error.code === 11000) {
    res.status(400);
    res.json({ success: false, message: "The name is already used" });
  }
});

//Start Server
app.listen(3000, () => console.log("Server started on 3000"));
