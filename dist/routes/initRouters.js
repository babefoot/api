"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRouters = void 0;
const playersRouter_1 = __importDefault(require("./Player/playersRouter"));
const gamesRouter_1 = __importDefault(require("./Game/gamesRouter"));
const initRouters = (app) => {
    //Authentified routes
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.use("/players", playersRouter_1.default);
    app.use("/games", gamesRouter_1.default);
    //Unauthentified routes
};
exports.initRouters = initRouters;
//# sourceMappingURL=initRouters.js.map