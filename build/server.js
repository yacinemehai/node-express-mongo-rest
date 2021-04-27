"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cors_1 = __importDefault(require("cors"));
const wilder_1 = __importDefault(require("./controllers/wilder"));
const app = express_1.default();
//Database
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/wilderdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
})
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));
//Middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors_1.default());
//Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.post("/api/wilders", express_async_handler_1.default(wilder_1.default.create));
app.get("/api/wilders", express_async_handler_1.default(wilder_1.default.read));
app.put("/api/wilders", express_async_handler_1.default(wilder_1.default.update));
app.delete("/api/wilders/:id", express_async_handler_1.default(wilder_1.default.delete));
app.get("*", (req, res) => {
    res.status(404);
    res.send({ success: false, message: "Wrong adress" });
});
app.use((error, req, res, next) => {
    if (error.name === "MongoError" && error.code === 11000) {
        res.status(400);
        res.json({ success: false, message: "The name is already used" });
    }
});
//Start Server
app.listen(5000, () => console.log("Server started on 5000"));
//# sourceMappingURL=server.js.map